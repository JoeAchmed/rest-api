// Import sequelize
import Sequelize from "sequelize";
// Import config dotenv
import "dotenv/config";

// Destructing object env
const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

/**
 * Membuat koneksi database.
 * Menerima parameter object: database, username, password, dan dialect
 */
const sequelize = new Sequelize({
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "mysql",
});

// Test connect ke database
try {
  await sequelize.authenticate();
  console.log("Database connected");
} catch (error) {
  console.log("Cannot connect to database: ", error);
}

export default sequelize;