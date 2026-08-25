const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeCode = async (problemDescription, code) => {
  try {
    const prompt = `
You are a senior technical interviewer evaluating a candidate's coding solution.

Analyze the solution and return your evaluation STRICTLY in JSON format.
Do NOT include explanations outside JSON.

Return JSON with this exact structure:
{
  "score": number between 1 and 10,
  "timeComplexity": "Big-O notation",
  "spaceComplexity": "Big-O notation",
  "feedback": "Short overall evaluation of the solution",
  "issues": ["list of bugs or edge cases"],
  "improvements": ["list of improvements or optimizations"]
}

Problem Description:
${problemDescription}

Candidate Code:
${code}

Remember: respond ONLY with valid JSON.
`;

    console.log("Running AI analysis with Gemini...");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        maxOutputTokens: 512,
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = response.text();

    // Basic safeguard to ensure JSON-like output
    if (!text || !text.trim().startsWith("{")) {
      return JSON.stringify({
        score: 5,
        timeComplexity: "Unknown",
        spaceComplexity: "Unknown",
        feedback: "AI response was not properly formatted.",
        issues: [],
        improvements: [],
      });
    }

    return text;
  } catch (error) {
    console.error("Gemini analysis error:", error?.message || error);
    return "AI analysis failed.";
  }
};

module.exports = analyzeCode;
