import express from "express";
// Import controller students
import StudentController from "../controllers/StudentController.js";

const router = express.Router();

// Routing students
router.get("/", (req, res) => {
  res.send("Main Page");
});

// Routing students
router.get("/students", StudentController.index);

router.post("/students", StudentController.store);

router.put("/students/:id", StudentController.update);

router.delete("/students/:id", StudentController.destroy);

router.get("/students/:id", StudentController.show);

export default router;