import "reflect-metadata";
import RouteManager from "./routes";
import { AbstractApp } from "../lib/src/app";
import PostgreSqlConnector from "./database/connectors/PostgreSqlConnector";
import { IDatabaseConnector } from "../lib/src/interfaces";

/**
 * @class App
 */
class App extends AbstractApp {

  dbConnector?: IDatabaseConnector;

  /**
   * @method installRoutes
   * @returns {void}
   */
  protected installRoutes(): void {
      RouteManager.installRoutes(this.engine);
  }

  /**
   * @method setupDependencies
   * @async
   * @returns {Promise<void>}
   */
  protected async setupDependencies(): Promise<void> {
    this.dbConnector = new PostgreSqlConnector();
    await this.dbConnector.connect();
  }

  /**
   * @method checkDependencies
   * @returns {void}
   */
  checkDependencies(): void {
    if(!PostgreSqlConnector.getClient()) { throw new Error("Initialize DB!!!"); }
  }

  /**
   * @method close
   */
  close() { 
    this.dbConnector?.disconnect();
    super.close(); 
  }

}

export default App;