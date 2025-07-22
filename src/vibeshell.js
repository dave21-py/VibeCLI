import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as fs from 'fs';
import chalk from 'chalk';

// --- CONFIGURATION & STYLES ---
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const magenta = chalk.magenta;
const cyan = chalk.cyan;
const yellow = chalk.yellow;
const green = chalk.green;
const gray = chalk.gray;
const bold = chalk.bold;
const modelName = "gemini-1.5-flash-latest";

// --- STATE MANAGEMENT ---
let currentMode = 'shell'; // Can be 'shell' or 'chat'
let shellChat, chatChat; // To hold the two separate chat sessions

// --- UI DRAWING FUNCTIONS (no changes here) ---
const uiWidth = 60;
function createBorderedLine(text = '') {
    const plainText = text.replace(/\u001b\[[0-9;]*m/g, ''); // Remove color codes for length calculation
    const padding = ' '.repeat(Math.max(0, uiWidth - 2 - plainText.length));
    return magenta('│ ') + text + padding + magenta(' │');
}
function drawHeader() {
    console.log(magenta('┌' + '─'.repeat(uiWidth - 2) + '┐'));
    console.log(createBorderedLine());
    // This is the corrected ASCII art for VIBECLI
    console.log(magenta('│ ') + cyan.bold('██╗   ██╗██╗██████╗ ███████╗ ██████╗██╗     ██╗    ') + magenta(' │'));
    console.log(magenta('│ ') + cyan.bold('╚██╗ ██╔╝██║██╔══██╗██╔════╝██╔════╝██║     ██║    ') + magenta(' │'));
    console.log(magenta('│ ') + cyan.bold(' ╚████╔╝ ██║██████╔╝█████╗  ██║     ██║     ██║ ') + magenta(' │'));
    console.log(magenta('│ ') + cyan.bold('  ╚██╔╝  ██║██╔══██╗██╔══╝  ██║     ██║     ██╝ ') + magenta(' │'));
    console.log(magenta('│ ') + cyan.bold('   ██║   ██║██████╔╝███████╗╚██████╗███████╗██╗ ') + magenta(' │'));
    console.log(magenta('│ ') + cyan.bold('   ╚═╝   ╚═╝╚═════╝ ╚══════╝ ╚═════╝╚══════╝╚═╝ ') + magenta(' │'));
    console.log(createBorderedLine());
    console.log(magenta('├' + '─'.repeat(uiWidth - 2) + '┤'));
    const assistantText = 'Creative AI Development Assistant';
    const assistantPadding = ' '.repeat(Math.floor((uiWidth - 2 - assistantText.length) / 2));
    console.log(magenta('│') + assistantPadding + cyan(assistantText) + assistantPadding + ' ' + magenta('│'));
    console.log(magenta('├' + '─'.repeat(uiWidth - 2) + '┤'));
}
function drawGettingStarted() {
    console.log(magenta('├' + '─'.repeat(uiWidth - 2) + '┤'));
    console.log(createBorderedLine(yellow('Type `chat` to talk to the assistant, or shell commands.')));
    console.log(magenta('└' + '─'.repeat(uiWidth - 2) + '┘'));
}

// --- MAIN LOGIC ---
async function run() {
    if (!GEMINI_API_KEY) {
        console.error(chalk.red("No vibe check: GEMINI_API_KEY is missing."));
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // --- DUAL CHAT SESSIONS ---
    const shellModel = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: fs.readFileSync('prompts/system.txt', 'utf-8'),
    });
    shellChat = shellModel.startChat({ history: [] }); // shellChat now correctly persists

    const chatModel = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: fs.readFileSync('prompts/chat_system.txt', 'utf-8'),
    });
    chatChat = chatModel.startChat({ history: [] }); // chatChat now correctly persists

    // --- UI & LOOP ---
    console.clear();
    drawHeader();
    console.log(magenta('├' + '─'.repeat(uiWidth - 2) + '┤'));
    console.log(createBorderedLine('  ' + green('✓ API configured') + '   ' + '🤖 ' + gray(modelName)));
    drawGettingStarted();

    const rl = readline.createInterface({ input, output });

    function updatePrompt() {
        const prompt = currentMode === 'shell'
            ? magenta.bold('~ vibecli> ')
            : cyan.bold('~ chat> ');
        rl.setPrompt(prompt);
    }

    updatePrompt();
    rl.prompt();

    rl.on('line', async (line) => {
        line = line.trim();

        // --- MODE SWITCHING LOGIC ---
        if (currentMode === 'shell' && line.toLowerCase() === 'chat') {
            currentMode = 'chat';
            console.log(yellow.bold('\nSwitched to Chat Mode. Ask me anything! Type `exit` to return to the shell.'));
            updatePrompt();
            rl.prompt();
            return;
        }

        if (currentMode === 'chat' && line.toLowerCase() === 'exit') {
            currentMode = 'shell';
            console.log(yellow.bold('\nSwitched back to Shell Mode.'));
            updatePrompt();
            rl.prompt();
            return;
        }

        // --- AI RESPONSE LOGIC ---
        const activeChat = currentMode === 'shell' ? shellChat : chatChat;
        const responseColor = currentMode === 'shell' ? cyan : cyan; // Keep responses cyan

        try {
            // Now this uses the persistent chat object correctly
            const result = await activeChat.sendMessageStream(line);
            process.stdout.write('\n');
            for await (const chunk of result.stream) {
                process.stdout.write(responseColor(chunk.text()));
            }
            process.stdout.write('\n\n');
        } catch (error) {
            console.error(chalk.red("\nError:"), error.message);
        } finally {
            rl.prompt();
        }
    });

    rl.on('close', () => {
        console.log(cyan("\nk, bye."));
        process.exit(0);
    });
}

run();