import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const REQUIRED_DATA = ["username", "nim", "email", "jurusan"];

class AuthController {
  async register(req, res) {
    let statusCode = 201;
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        statusCode = 422;
        throw new Error("Field username, email, and password must be filled !");
      }

      // Hash password user
      const hash = await bcrypt.hash(password, 10);

      // Simpan data user
      const newUser = await User.create({
        username,
        email,
        password: hash,
      });

      if (!newUser) {
        statusCode = 500;
        throw new Error("Failed to create user !");
      }

      const response = {
        message: "User created successfully",
        data: newUser,
      };

      res.status(statusCode).json(response);
    } catch (error) {
      res
        .status(statusCode)
        .json({ message: error?.errors?.[0]?.message ?? error.message });
    }
  }

  async login(req, res) {
    let statusCode = 200;

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!username || !password) {
        statusCode = 422;
        throw new Error("Field username and password must be filled !");
      }

      if (!user) {
        statusCode = 400;
        throw new Error("Username doesn't exist !");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!user || !match) {
        statusCode = 401;
        throw new Error("Authentication Failed !");
      }

      // Jika sesuai, generate token dan kembalikan ke user
      const payload = {
        id: user.id,
        username: user.username,
      };

      const secret = process.env.SECRET;
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      const response = {
        message: "Login success",
        data: {
          token,
        },
      };
      res.status(statusCode).json(response);
    } catch (error) {
      res
        .status(statusCode)
        .json({ message: error?.errors?.[0]?.message ?? error.message });
    }
  }
}

const authController = new AuthController();

export default authController;
