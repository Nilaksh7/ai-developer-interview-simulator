const rateLimit = require("express-rate-limit");

const submissionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many submissions. Try again later.",
});

module.exports = submissionLimiter;
