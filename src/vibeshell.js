import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'fs';

// --- CONFIGURATION ---
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("No vibe check: GEMINI_API_KEY is missing from .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: fs.readFileSync('prompts/system.txt', 'utf-8'),
});

const rl = readline.createInterface({ input, output, terminal: false });
const PROMPT = "vibecli> ";

// --- MAIN SHELL LOGIC ---
async function runShell() {
    const chat = model.startChat({
        history: [], // We'll let the user manage history via commands
        generationConfig: {
            maxOutputTokens: 200, // Keep responses short and snappy
        },
    });

    console.log("VibeCLI is online. rn just chill and type a command.");
    process.stdout.write(PROMPT);

    for await (const line of rl) {
        if (line.trim().toLowerCase() === 'exit') {
            break; // Exit loop if user types 'exit'
        }

        try {
            const result = await chat.sendMessageStream(line);

            // Stream the output
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                process.stdout.write(chunkText);
            }

        } catch (error) {
            console.error("\nError:", error.message);
            process.stdout.write(PROMPT); // Show prompt again after error
        }
    }
}

runShell().then(() => {
    console.log("\nk, bye.");
    rl.close();
});