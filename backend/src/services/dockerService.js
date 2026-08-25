const { execFile } = require("child_process");

// Run code inside Docker container supporting multiple languages
// language: "javascript" | "python" | "cpp" | "java"
const runCode = (input, code, language = "javascript") => {
  return new Promise((resolve, reject) => {
    const args = [
      "run",
      "--rm",
      "--network=none",
      "--memory=128m",
      "--cpus=0.5",
      "--pids-limit=64",
      "code-runner",
      language,
      input,
      code,
    ];

    const child = execFile(
      "docker",
      args,
      { timeout: 5000 },
      (error, stdout, stderr) => {
        if (error) {
          if (error.killed) {
            return reject("Execution timed out");
          }
          return reject(stderr || "Execution error");
        }

        resolve(stdout.trim());
      },
    );
  });
};

module.exports = runCode;
