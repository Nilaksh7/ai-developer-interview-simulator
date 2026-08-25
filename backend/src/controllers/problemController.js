const Problem = require("../models/Problem");

/*
CREATE PROBLEM
*/
exports.createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({
      message: "Error creating problem",
    });
  }
};

/*
GET ALL PROBLEMS
*/
exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select("title difficulty");

    res.json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problems",
    });
  }
};

/*
GET SINGLE PROBLEM
*/
exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problem",
    });
  }
};
