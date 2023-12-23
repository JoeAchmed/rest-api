// Import sequelize yang sudah dibuat di config
import sequelize from "../config/database.js";

// Import Datatypes untuk define tipe data
import { DataTypes } from "sequelize";

// Buat Model Student
const Student = sequelize.define("Student", {
  // Buat Kolom: nama, nim, email, jurusan
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jurusan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  // Singkronkan Model Student dengan table
  await Student.sync();
  console.log("The table student was created");
} catch (error) {
  console.log("Cannot create table: ", error);
}

export default Student;