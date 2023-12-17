import data from "../data/students.js";

class StudentController {
  index(req, res) {
    res.json({
      message: "Menampilkan semua students",
      data,
    });
  }

  store(req, res) {
    const { name } = req.body;

    data.push(name);

    res.json({
      message: `Menambahkan data student: ${name}`,
      data,
    });
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
}

const students = new StudentController();

export default students;