import { Sequelize } from "sequelize";
import Student from "../models/Student.js";

const REQUIRED_DATA = ["nama", "nim", "email", "jurusan"];

class StudentController {
  async index(req, res) {
    /**
     * Memanggil method findAll (Student).
     * Handle Asynchronous process dengan async await.
     * Handle query param name dan major
     */
    try {
      const { name, major, sort, order } = req.query;

      let query = {};
      const sortBy = sort?.toLowerCase();

      // Add conditions for name and major if they are provided
      if (name) {
        query.nama = { [Sequelize.Op.like]: `%${name}%` };
      }

      if (major) {
        query.jurusan = { [Sequelize.Op.like]: `%${major}%` };
      }

      // Validate and apply sorting
      let orderBy = [];
      if (sort && ["name", "major"].includes(sortBy)) {
        orderBy.push([
          sortBy === "name" ? "nama" : sortBy === "major" ? "jurusan" : "",
          order && order.toLowerCase() === "desc" ? "DESC" : "ASC",
        ]);
      }

      // Perform the query
      const students = await Student.findAll({
        where: query,
        order: orderBy,
      });

      const data = {
        message: "Menampilkan students",
        data: students,
      };

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async store(req, res) {
    /**
     * Memanggil method create.
     * Mengembalikan data yang baru diinsert.
     * Kembalikan data dalam bentuk json
     */
    let statusCode = 200;
    try {
      const { nama, nim, email, jurusan } = req.body;
      const missingFields = [];

      REQUIRED_DATA.forEach((el) => {
        if (!req.body[el]) {
          missingFields.push(el);
        }
      });

      // handle error ketika required field tidak diisi
      if (missingFields.length) {
        statusCode = 422;
        throw new Error(`Field ${missingFields.join(",")} harus diisi`);
      }

      // Menyimpan data ke database
      const newStudent = await Student.create({
        nama,
        nim,
        email,
        jurusan,
      });

      if (!newStudent) {
        statusCode = 500;
        throw new Error("Server error");
      }

      res.status(statusCode).json({
        message: "Menambahkan data student",
        data: newStudent,
      });
    } catch (error) {
      res
        .status(statusCode)
        .json({ message: error?.errors?.[0]?.message ?? error.message });
    }
  }

  async update(req, res) {
    let statusCode = 200;
    try {
      const { id } = req.params;
      let isValidPayload = true;
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

      // handle error ketika required field tidak diisi
      if (!Object.keys(req.body).length) {
        statusCode = 400;
        throw new Error("Field harus diisi");
      }

      for (const key in req.body) {
        isValidPayload = REQUIRED_DATA.includes(key);
      }

      if (!isValidPayload) {
        statusCode = 422;
        throw new Error("Payload tidak sesuai");
      }

      // Update student berdasarkan id (update).
      const newData = await Student.update(req.body, condition);

      const data = await Student.findByPk(newData[0]);

      res.status(statusCode).json({
        message: "Mengedit data student",
        data,
      });
    } catch (error) {
      res
        .status(statusCode)
        .json({ message: error?.errors?.[0]?.message ?? error.message });
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
      res
        .status(statusCode)
        .json({ message: error?.errors?.[0]?.message ?? error.message });
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
      res
        .status(statusCode)
        .json({ message: error?.errors?.[0]?.message ?? error.message });
    }
  }
}

const students = new StudentController();

export default students;
