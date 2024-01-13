import express from "express";
// Import controller students
import StudentController from "../controllers/StudentController.js";
// Import controller auth
import AuthController from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

// Routing students
router.get("/", (req, res) => {
  res.send("Main Page");
});

// Routing students
// Memasang middleware di level user
router.get("/students", auth, StudentController.index);

router.post("/students", auth, StudentController.store);

router.put("/students/:id", auth, StudentController.update);

router.delete("/students/:id", auth, StudentController.destroy);

router.get("/students/:id", auth, StudentController.show);

// Routing auth
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

export default router;