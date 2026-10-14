// Run any Gem as an app with the Gemini API (Node 18+).
// Usage:
//   export GEMINI_API_KEY="your-key"
//   npm install @google/genai
//   node examples/gem_app.mjs gems/02-meeting-recap-desk.md "Recap these notes: ..."
import { readFileSync } from "node:fs";
import { GoogleGenAI } from "@google/genai";

const [file, prompt] = process.argv.slice(2);
if (!file || !prompt) throw new Error("Usage: node gem_app.mjs <gem.md> \"<prompt>\"");
if (!process.env.GEMINI_API_KEY) throw new Error("Set the GEMINI_API_KEY environment variable first.");

const match = readFileSync(file, "utf8").match(/```text\n([\s\S]*?)```/);
if (!match) throw new Error(`No instructions block found in ${file}`);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const reply = await ai.models.generateContent({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  contents: prompt,
  config: { systemInstruction: match[1].trim() },
});
console.log(reply.text);
