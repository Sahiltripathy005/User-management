import express from "express";

import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  signupUser,
  loginUser,
  logoutUser,
  getProfile,
} from "../controllers/user.controller.js";

import {  verifyToken,} from "../middleware/auth.middleware.js";

const router = express.Router();

/* CRUD */
router.get("/", getUsers);

router.post("/", addUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

/* AUTH */
router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

/* PROFILE */
router.get(
  "/profile",
  verifyToken,
  getProfile
);

export default router;