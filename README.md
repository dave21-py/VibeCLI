
  <!-- VibeCLI ASCII Art Logo -->
  <h2 align="center">VibeCLI</h2>
  <p align="center">
  <pre>
                               ██╗    ██╗ ██╗██████╗ ███████╗ ██████╗██╗      ██╗
                               ██║    ██║ ██║██╔══██╗██╔════╝██╔════╝██║      ██║
                               ██║    ██║ ██║██████╔╝█████╗  ██║     ██║      ██║
                                ╚██╗ ██╔╝ ██║██╔══██╗██╔══╝  ██║     ██║      ██║ 
                                 ╚████╔╝  ██║██████╔╝███████╗╚██████╗███████╗ ██╗
                                  ╚═══╝   ╚═╝╚═════╝ ╚══════╝ ╚═════╝╚══════╝ ╚═╝
</pre>
  <p align="center">An AI-powered shell and assistant with a chill vibe, powered by Google's Gemini.</p>
</p>

<p align="center">
  <!-- Shields.io badges -->
  <img alt="Node.js" src="https://img.shields.io/badge/Runtime-Node.js-blue?logo=nodedotjs" />
  <img alt="Gemini API" src="https://img.shields.io/badge/LLM-Google Gemini‑Flash-green?logo=google" />
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/YOUR-USERNAME/VibeCLI?style=social" />
</p>

<p align="center">
  <!-- NOTE: Add a screenshot named `vibecli-demo.png` to your repo for this link to work! -->
  <a href="vibecli-demo.png">View Demo</a> ·
  <a href="https://github.com/dave21-py/VibeCLI/issues/new?labels=bug&template=bug_report.md">Report Bug</a> ·
  <a href="https://github.com/dave21-py/VibeCLI/issues/new?labels=enhancement&template=feature_request.md">Request Feature</a>
</p>

---

### Core Features

*   **Shell Mode:** Simulate file system commands (`ls`, `cat`), network tools (`ping`), version control (`git`), and more.
*   **Chat Mode:** Switch to a conversational assistant to ask coding questions, brainstorm ideas, or get explanations.
*   **Styled UI:** A custom, colorful interface inspired by retro terminal aesthetics.
*   **Built-in Help:** A comprehensive `help` command to guide you.

### Quick Commands

| Command | Mode | Description |
| :--- | :--- | :--- |
| `help` | Shell | Displays the full help screen with all commands. |
| `chat` | Shell | Switches from Shell Mode to conversational Chat Mode. |
| `exit` | Chat | **Returns from Chat Mode back to Shell Mode.** |
|`Ctrl+C`| Shell | **Quits entire Shell Mode.** |


### Setup and installation

```bash
# 1) Clone the repository
git clone https://github.com/dave21-py/VibeCLI
cd VibeCLI

# 2) Install dependencies
npm install

# 3) Set up your API key
# This copies the example .env file to a new .env file
cp .env.example .env

# Now, open the new .env file and add your Gemini API key:
# GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxx

# 4) Run the application
npm start

```
