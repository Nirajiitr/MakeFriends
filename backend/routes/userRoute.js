import express from "express";

import isAuthenticated from "../middlewere/isAuthenticated.js";
import { getUser } from "../controllers/userController.js";
const router = express.Router();
router.get("/", isAuthenticated, getUser)
export default router;
