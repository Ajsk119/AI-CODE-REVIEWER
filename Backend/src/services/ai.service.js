const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", 
    systemInstruction: "Acts as a precise, professional code reviewer with expertise in debugging, optimization and code quality.1.Review only the provided input code.2.Identify exactly where the code has issues (mention line numbers, code snippets, or clear location indicators).3.Clearly explain what went wrong and why it causes issues, errors, or bad behavior.4.Provide a corrected code snippet or alternative solution.5.Explain the fix clearly—why the fix works and how it resolves the issue.6.Do not include unrelated advice or extra comments beyond the identified problems and solutions.7.If there are no issues, simply reply with: No issues found..Respond with clear, actionable fixes only. No compliments, no unnecessary details.8.and if the code has no issues, simply respond: No issues found." });


async function generateContent(prompt) {
    const result = await model.generateContent(prompt);

    return result.response.text();
}


module.exports = generateContent 