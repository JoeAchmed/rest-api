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
        message: 'Menambahkan data student',
        data: newStudent,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    data[id] = name;

    res.json({
      message: `Mengedit student id ${id} nama student: ${name}`,
      data,
    });
  }

  destroy(req, res) {
    const { id } = req.params;

    data.splice(id, 1);

    res.json({
      message: `Menghapus student id ${id}`,
      data,
    });
  }

  show(req, res) {
    const { id } = req.params;

    res.json({
      message: `Menampilkan student id ${id}`,
      data: data[id],
    });
  }
}

const students = new StudentController();

export default students;
