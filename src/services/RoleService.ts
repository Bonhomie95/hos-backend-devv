import { UserRole } from "../constants";

/**
 * @class RoleService
 */
class RoleService {

    /**
     * @method getUserRoles
     * @static
     * @returns {string[]}
     */
    static getUserRoles(): string[] {
        return Object.values(UserRole);
    }

}

export default RoleService;