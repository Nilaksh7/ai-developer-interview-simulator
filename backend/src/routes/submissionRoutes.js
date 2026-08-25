const express = require("express");
const router = express.Router();
const submissionLimiter = require("../middleware/rateLimiter");

const {
  submitCode,
  runCode,
  getUserSubmissions,
  getProblemSubmissions,
} = require("../controllers/submissionController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/run", submissionLimiter, runCode);

router.post("/", authMiddleware, submissionLimiter, submitCode);

/* Get all user submissions */
router.get("/user", authMiddleware, getUserSubmissions);

/* Backward compatibility: GET /submissions */
router.get("/", authMiddleware, getUserSubmissions);

/* Get submissions for specific problem */
router.get("/problem/:problemId", authMiddleware, getProblemSubmissions);

module.exports = router;
