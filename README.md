<pre>
██╗   ██╗██╗██████╗ ███████╗ ██████╗██╗     ██╗
██║   ██║██║██╔══██╗██╔════╝██╔════╝██║     ██║
██║   ██║██║██████╔╝█████╗  ██║     ██║     ██║
╚██╗ ██╔╝██║██╔══██╗██╔══╝  ██║     ██║     ╚═╝
 ╚████╔╝ ██║██████╔╝███████╗╚██████╗███████╗██╗
  ╚═══╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝╚══════╝╚═╝
</pre>

### VibeCLI

An AI-powered, dual-mode command line interface with a chill vibe. Powered by Google Gemini.

This project provides a UNIX-style shell simulator and a conversational AI assistant in one beautiful, terminal-based package.

---

### Core Features

*   **Shell Mode:** Simulate file system commands (`ls`, `cat`), network tools (`ping`), version control (`git`), and more.
*   **Chat Mode:** Switch to a conversational assistant to ask coding questions, brainstorm ideas, or get explanations.
*   **Styled UI:** A custom, colorful interface inspired by retro terminal aesthetics.
*   **Built-in Help:** A comprehensive `help` command to guide you.

### Commands

| Command | Mode | Description |
| :--- | :--- | :--- |
| `help` | Shell | Displays the full help screen with all commands. |
| `chat` | Shell | Switches from Shell Mode to conversational Chat Mode. |
| `exit` | Shell | **Quits the entire VibeCLI application.** |
| `exit` | Chat | **Returns from Chat Mode back to Shell Mode.** |

---

### Getting Started

1.  Clone the repository and run `npm install`.
2.  Create a `.env` file and add your `GEMINI_API_KEY`.
3.  Run the application with `npm start`.
4.  Type `help` to see all available commands and instructions.