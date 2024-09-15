import express from "express";
import { login, register } from "../controllers/authController.js";
import isAuthenticated from "../middlewere/isAuthenticated.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", isAuthenticated, (req, res) => {
    res.status(200).json({ message: "Authenticated", userId: req.id });
  });
export default router;
