const express = require("express");
const router = express.Router();

const {
  register,
  login,
  googleLogin,
  getCurrentUser,
  logout,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", logout);

module.exports = router;
