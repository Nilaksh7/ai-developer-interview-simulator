const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "javascript",
    },

    status: {
      type: String,
      enum: ["accepted", "wrong_answer"],
    },

    aiFeedback: {
      type: String,
    },

    aiScore: {
      type: Number,
    },

    timeComplexity: {
      type: String,
    },

    spaceComplexity: {
      type: String,
    },

    codeQuality: {
      type: Number,
    },

    issues: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },

    runtime: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Submission", submissionSchema);
