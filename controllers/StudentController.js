import data from "../data/students.js";
import Student from "../models/Student.js";

const REQUIRED_DATA = ["nama", "nim", "email", "jurusan"];

class StudentController {
  async index(req, res) {
    /**
     * Memanggil method findAll (Student).
     * Handle Asynchronous process dengan async await.
     */
    try {
      const students = await Student.findAll();
      const data = {
        message: "Menampilkan semua students",
        data: students,
      };
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async store(req, res) {
    /**
     * Memanggil method create.
     * Mengembalikan data yang baru diinsert.
     * Kembalikan data dalam bentuk json
     */
    try {
      const { nama, nim, email, jurusan } = req.body;
      const missingFields = [];

      REQUIRED_DATA.forEach((el) => {
        if (!req.body[el]) {
          missingFields.push(el);
        }
      });

      // handle error ketika required field tidak diisi
      if (!nama || !nim || !email || !jurusan) {
        throw new Error(`Field ${missingFields.join(",")} harus diisi`);
      }

      // Menyimpan data ke database
      const newStudent = await Student.create({
        nama,
        nim,
        email,
        jurusan,
      });

      res.json({
        message: "Menambahkan data student",
        data: newStudent,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    let statusCode = 200;
    try {
      const { id } = req.params;
      // Cari student yang akan dihapus (findByPk)
      const student = await Student.findByPk(id);

      if (!student) {
        statusCode = 404;
        throw new Error("Student not found !");
      }

      const condition = {
        where: {
          id,
        },
      };

      // Update student berdasarkan id (update).
      const newData = await Student.update(req.body, condition);
      if (Boolean(!newData[0])) {
        statusCode = 400;
        throw new Error("Failed to update student !");
      }
      const data = await Student.findByPk(newData[0]);

      res.status(statusCode).json({
        message: "Mengedit data student",
        data,
      });
    } catch (error) {
      res.status(statusCode).json({ message: error.message });
    }
  }

  async destroy(req, res) {
    let statusCode = 200;
    try {
      const { id } = req.params;
      // Cari student yang akan dihapus (findByPk)
      const student = await Student.findByPk(id);

      if (!student) {
        statusCode = 404;
        throw new Error("Student not found !");
      }

      const condition = {
        where: {
          id,
        },
      };

      // Hapus student berdasarkan id (destroy)
      await Student.destroy(condition);

      res.status(statusCode).json({
        message: "Menghapus data student",
        data,
      });
    } catch (error) {
      res.status(statusCode).json({ message: error.message });
    }
  }

  async show(req, res) {
    let statusCode = 200;
    try {
      const { id } = req.params;
      // Cari student yang akan dihapus (findByPk)
      const data = await Student.findByPk(id);

      if (!data) {
        statusCode = 404;
        throw new Error("Student not found !");
      }

      res.status(statusCode).json({
        message: `Menampilkan data student id: ${id}`,
        data,
      });
    } catch (error) {
      res.status(statusCode).json({ message: error.message });
    }
  }
}

const students = new StudentController();

export default students;
