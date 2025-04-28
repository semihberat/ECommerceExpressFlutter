import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// .env dosyasını yükle
dotenv.config();

// Çevre değişkenlerini al ve türlerin doğru olduğunu kontrol et
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;

// Eğer herhangi bir değişken eksikse hata ver
if (!dbHost || !dbUser || !dbPassword || !dbName || !dbDialect) {
  throw new Error(
    "All required environment variables for the database connection are missing."
  );
}

// Sequelize bağlantısı
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect as any,
});
