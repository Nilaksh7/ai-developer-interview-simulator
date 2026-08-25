const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
    trim: true,
  },
  output: {
    type: String,
    required: true,
    trim: true,
  },
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    starterCode: {
      type: String,
      default: "",
    },

    testCases: {
      type: [testCaseSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "A problem must have at least one test case",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Problem", problemSchema);
