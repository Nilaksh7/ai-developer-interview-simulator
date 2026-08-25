const { execSync } = require("child_process");
const fs = require("fs");

const language = process.argv[2];
const input = process.argv[3];
const code = process.argv[4];

try {
  const parsedInput = JSON.parse(input);

  if (language === "javascript") {
    const vm = require("vm");

    const sandbox = {};
    const context = vm.createContext(sandbox);

    const script = new vm.Script(`(${code})`);

    const solution = script.runInContext(context, { timeout: 1000 });

    const result = solution(...parsedInput);

    console.log(JSON.stringify(result));
  } else if (language === "python") {
    fs.writeFileSync("solution.py", code);

    const result = execSync(`python3 solution.py '${input}'`, {
      timeout: 2000,
    });

    console.log(result.toString().trim());
  } else if (language === "cpp") {
    fs.writeFileSync("solution.cpp", code);

    execSync("g++ solution.cpp -o solution", { timeout: 5000 });

    const result = execSync(`./solution '${input}'`, { timeout: 2000 });

    console.log(result.toString().trim());
  } else if (language === "java") {
    fs.writeFileSync("Solution.java", code);

    execSync("javac Solution.java", { timeout: 5000 });

    const result = execSync(`java Solution '${input}'`, { timeout: 2000 });

    console.log(result.toString().trim());
  } else {
    console.error("Unsupported language");
  }
} catch (error) {
  console.error(error.message);
}
