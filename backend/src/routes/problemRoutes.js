const express = require("express");
const router = express.Router();

const {
  createProblem,
  getProblems,
  getProblemById,
} = require("../controllers/ProblemController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createProblem);

router.get("/", getProblems);

router.get("/:id", getProblemById);

module.exports = router;
