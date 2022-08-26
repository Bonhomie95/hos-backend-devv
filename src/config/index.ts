import dotenv from "dotenv";

dotenv.config();

const { env } = process;

export default {
    APP_PORT: env.PORT || 7000,
    DB_HOST: env.DB_HOST || "127.0.0.1",
    DB_PORT: Number(env.DB_PORT) || 5432,
    DB_NAME: env.DB_NAME,
    DB_USERNAME: env.DB_USERNAME,
    DB_PASSWORD: env.DB_PASSWORD,
    MONGO_DB_HOST: env.MONGO_DB_HOST,
    MONGO_DB_NAME: env.MONGO_DB_NAME,
    HOS_EMAIL_NAME: env.HOS_EMAIL_NAME || "sounds@those.app",
    HOS_EMAIL_PASSWORD: env.HOS_EMAIL_PASSWORD || "",
    ACCOUNT_VERIFY_TOKEN_TTL_IN_HOURS: 24,
    PASSWORD_RESET_TOKEN_TTL_IN_HOURS: 1,
    FRONT_END_URL: env.FRONT_END_URL,
    JWT_TOKEN_SECRET: <string>env.JWT_TOKEN_SECRET
};