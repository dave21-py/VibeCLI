import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'fs';
import chalk from 'chalk';

// --- CONFIGURATION ---
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// --- STYLING & UI ---
const magenta = chalk.magenta;
const cyan = chalk.cyan;
const yellow = chalk.yellow;
const green = chalk.green;
const gray = chalk.gray;

const modelName = "gemini-1.5-flash-latest";

function drawHeader() {
    console.log(magenta('┌────────────────────────────────────────────────────────┐'));
    console.log(magenta('│                                                        │'));
    console.log(magenta('│ ') + cyan.bold('  ██████╗ ██╗     ██╗  ██████╗  ') + magenta('                    │'));
    console.log(magenta('│ ') + cyan.bold(' ██╔════╝ ██║     ██║ ██╔═══██╗ ') + magenta('                    │'));
    console.log(magenta('│ ') + cyan.bold(' ██║      ██║     ██║ ██║   ██║ ') + magenta('                    │'));
    console.log(magenta('│ ') + cyan.bold(' ██║      ██║     ██║ ██║   ██║ ') + magenta('                    │'));
    console.log(magenta('│ ') + cyan.bold(' ╚██████╗ ███████╗██║ ╚██████╔╝ ') + magenta('                    │'));
    console.log(magenta('│ ') + cyan.bold('  ╚═════╝ ╚══════╝╚═╝  ╚═════╝  ') + magenta('                    │'));
    console.log(magenta('│                                                        │'));
    console.log(magenta('├────────────────────────────────────────────────────────┤'));
    console.log(magenta('│    ') + '       ' + cyan('Creative AI Development Assistant') + '        ' + magenta('│'));
    console.log(magenta('├────────────────────────────────────────────────────────┤'));
}

function drawGettingStarted() {
    console.log(magenta('│ ') + yellow('Tips for getting started:') + ' '.repeat(32) + magenta('│'));
    console.log(magenta('│ ') + '  1. Ask questions, edit files, or run commands.' + ' '.repeat(6) + magenta('│'));
    console.log(magenta('│ ') + '  2. Be specific for the best results.' + ' '.repeat(16) + magenta('│'));
    console.log(magenta('│ ') + '  3. Create @filename files to customize your interactions.' + magenta('│'));
    console.log(magenta('│ ') + '  4. Type /help for more information.' + ' '.repeat(17) + magenta('│'));
    console.log(magenta('├────────────────────────────────────────────────────────┤'));
}

function drawStatus() {
    console.log(magenta('│ ') + gray('~/cli-try') + '    ' + green('✓ API configured') + '   ' + '🤖 ' + gray(modelName) + '    ' + magenta('│'));
    console.log(magenta('└────────────────────────────────────────────────────────┘'));
}

// --- MAIN SHELL LOGIC ---
async function runShell() {
    if (!GEMINI_API_KEY) {
        console.error(chalk.red("No vibe check: GEMINI_API_KEY is missing from .env file."));
        process.exit(1);
    }
    
    // Draw the initial UI
    drawHeader();
    drawGettingStarted();
    drawStatus();

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: fs.readFileSync('prompts/system.txt', 'utf-8'),
    });

    const rl = readline.createInterface({ input, output });
    const prompt = magenta.bold('~ vibecli> ');

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 200,
        },
    });

    // Manually display the first prompt
    process.stdout.write(prompt);

    rl.on('line', async (line) => {
        if (line.trim().toLowerCase() === 'exit') {
            console.log(cyan("\nk, bye."));
            rl.close();
            return;
        }

        try {
            const result = await chat.sendMessageStream(line);
            let fullResponse = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                process.stdout.write(cyan(chunkText));
                fullResponse += chunkText;
            }

            // Ensure the next prompt appears correctly after the streaming response
            if (!fullResponse.trim().endsWith('vibecli>')) {
                 process.stdout.write('\n');
            }
             process.stdout.write(prompt);

        } catch (error) {
            console.error(chalk.red("\nError:"), error.message);
            process.stdout.write(prompt);
        }
    });

    rl.on('close', () => {
        process.exit(0);
    });
}

runShell();