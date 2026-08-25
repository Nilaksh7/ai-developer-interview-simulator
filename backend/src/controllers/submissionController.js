const Problem = require("../models/Problem");
const Submission = require("../models/Submission");
const compareOutput = require("../utils/compareOutput");
const analyzeCode = require("../services/aiService");
const dockerRunCode = require("../services/dockerService");

exports.submitCode = async (req, res) => {
  try {
    const { problemId, code, language = "javascript" } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    let passed = true;
    let runtime = 0;

    for (let testCase of problem.testCases) {
      const start = Date.now();

      const output = await dockerRunCode(testCase.input, code, language);

      const normalizedOutput = String(output).trim();
      const normalizedExpected = String(testCase.output).trim();

      const executionTime = Date.now() - start;

      runtime = Math.max(runtime, executionTime);

      if (!compareOutput(normalizedExpected, normalizedOutput)) {
        passed = false;
        break;
      }
    }

    let aiFeedback = "";
    let aiScore = 0;
    let timeComplexity = null;
    let spaceComplexity = null;
    let codeQuality = null;
    let issues = [];
    let improvements = [];

    try {
      const aiRaw = await analyzeCode(problem.description, code);

      // Try parsing structured JSON from Gemini if returned
      try {
        let parsed;

        if (typeof aiRaw === "string") {
          // Clean Gemini responses that sometimes include ```json blocks
          let cleaned = aiRaw.trim();

          if (cleaned.startsWith("```")) {
            cleaned = cleaned
              .replace(/```json/g, "")
              .replace(/```/g, "")
              .trim();
          }

          // Extract JSON object if extra text exists
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          cleaned = jsonMatch ? jsonMatch[0] : cleaned;

          parsed = JSON.parse(cleaned);
        } else {
          parsed = aiRaw;
        }

        aiFeedback = parsed.feedback || "No feedback provided";
        aiScore = parsed.score ?? (passed ? 10 : 4);

        // Prevent high AI score if the solution failed test cases
        if (!passed && aiScore > 5) {
          aiScore = 5;
        }

        timeComplexity = parsed.timeComplexity || null;
        spaceComplexity = parsed.spaceComplexity || null;
        codeQuality = parsed.codeQuality ?? null;
        issues = parsed.issues || [];
        improvements = parsed.improvements || [];
      } catch {
        // If Gemini returned plain text, clean and structure it
        if (typeof aiRaw === "string") {
          const lines = aiRaw
            .trim()
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);

          aiFeedback = lines.map((l) => `• ${l}`).join("\n");
        } else {
          aiFeedback = "AI feedback received but could not be structured.";
        }

        aiScore = passed ? 10 : 4;
      }
    } catch (e) {
      aiFeedback = "AI analysis unavailable";
      aiScore = passed ? 10 : 4;
    }

    const submission = await Submission.create({
      userId: req.userId,
      problemId,
      code,
      status: passed ? "accepted" : "wrong_answer",
      aiFeedback,
      aiScore,
      runtime,
      timeComplexity,
      spaceComplexity,
      codeQuality,
      issues,
      improvements,
    });

    res.json({
      status: submission.status,
      aiFeedback: submission.aiFeedback,
      aiScore: submission.aiScore,
      runtime: submission.runtime,
      timeComplexity: submission.timeComplexity,
      spaceComplexity: submission.spaceComplexity,
      codeQuality: submission.codeQuality,
      issues: submission.issues,
      improvements: submission.improvements,
    });
  } catch (error) {
    console.error("Execution Error:", error);

    res.status(500).json({
      message: "Error executing code",
    });
  }
};

/*
RUN CODE WITHOUT SAVING SUBMISSION
*/
exports.runCode = async (req, res) => {
  try {
    const { problemId, code, language = "javascript" } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    const testCase = problem.testCases[0];

    const output = await dockerRunCode(testCase.input, code, language);

    res.json({
      output,
    });
  } catch (error) {
    console.error("Run Error:", error);

    res.status(500).json({
      message: "Error running code",
    });
  }
};

/*
GET ALL SUBMISSIONS FOR CURRENT USER
*/
exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.userId,
    })
      .populate("problemId", "title difficulty")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching submissions",
    });
  }
};

/*
GET SUBMISSIONS FOR A SPECIFIC PROBLEM
*/
exports.getProblemSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.userId,
      problemId: req.params.problemId,
    }).sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problem submissions",
    });
  }
};
