const compareOutput = (expected, actual) => {
  try {
    const e = JSON.stringify(JSON.parse(expected));
    const a = JSON.stringify(JSON.parse(actual));
    return e === a;
  } catch {
    return expected.trim() === actual.trim();
  }
};

module.exports = compareOutput;
