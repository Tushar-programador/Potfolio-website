// DOM Elements
const introDiv = document.getElementById("intro");
const nameElement = document.getElementById("name");
const designationElement = document.getElementById("designation");
const taglineElement = document.getElementById("tagline");
const enterNoteElement = document.getElementById("enter-note");
const mainContainer = document.getElementById("main-container");
const consoleDiv = document.getElementById("console");
const outputDiv = document.getElementById("output");
const inputField = document.getElementById("command-input");

// ASCII Art Constants
const ASCII_LOGO = `
     _____           _                _  __     _           
    |_   _|   _ ___| |__   __ _ _ __| |/ /__ _| |_ __ __ _ 
      | || | | / __| '_ \\ / _\` | '__| ' // _\` | | '__/ _\` |
      | || |_| \\__ \\ | | | (_| | |  | . \\ (_| | | | | (_| |
      |_| \\__,_|___/_| |_|\\__,_|_|  |_|\\_\\__,_|_|_|  \\__,_|
`;

const ASCII_COMPUTER = `
       ,----------------,              ,---------,
       |----|     |----|              |===========|
       |    |     |    |              | Learn     |
       |    |     |    |              | Develop   |
       |    |     |    |              | Build     |
       '----|     |----'              |           |
            |     |      HACK THE     '---------'
            '-----'      PLANET!                
`;

const PROJECT_ASCII = `
    /\\____/\\    
   /  o  o  \\    PROJECT
  ( ==  ^  == )   SHOWCASE
   )         (    
  (           )   
 ( |  |  |  | )  
(__|__|__|__|__)  
`;

const projectsData = [
  {
    title: "Chat Realm",
    description: "Real-time chat application",
    tech: "Node.js, Socket.io, MongoDB",
    url: "https://github.com/username/chat-realm",
  },
  {
    title: "DNS Server",
    description: "Custom DNS implementation",
    tech: "Node.js, UDP, DNS Protocol",
    url: "https://github.com/username/dns-server",
  },
  {
    title: "Payment Gateway",
    description: "Crypto payment processor",
    tech: "Node.js, Web3, Express",
    url: "https://github.com/username/payment-gateway",
  },
];

function formatBox(title, content) {
  const titleLength = 55;
  return `
╔${"═".repeat(titleLength)}╗
║ ${title.toUpperCase().padEnd(titleLength - 2)} ║
╠${"═".repeat(titleLength)}╣
${content
  .split("\n")
  .map((line) => `║  ${line.padEnd(titleLength - 4)} ║`)
  .join("\n")}
╚${"═".repeat(titleLength)}╝`;
}

function appendOutputWithTyping(text, callback = null) {
  const lines = text.split("\n");
  let lineIndex = 0;

  const interval = setInterval(() => {
    if (lineIndex === lines.length) {
      clearInterval(interval);
      outputDiv.scrollTop = outputDiv.scrollHeight;
      if (callback) callback();
      return;
    }

    outputDiv.innerHTML += lines[lineIndex] + "\n";
    lineIndex++;
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }, 30);
}

function simulateDownload() {
  let progress = 0;
  const initialBox = formatBox(
    "Resume",
    `Downloading resume.pdf...\nProgress: [                    ] 0%`
  );

  outputDiv.innerHTML += initialBox + "\n";

  const interval = setInterval(() => {
    progress += 5;
    const filled = "=".repeat(progress / 5);
    const empty = " ".repeat(20 - progress / 5);
    const progressText = `Downloading resume.pdf...\nProgress: [${filled}${empty}] ${progress}%`;

    const updatedBox = formatBox("Resume", progressText);
    outputDiv.innerHTML =
      outputDiv.innerHTML.split("\n").slice(0, -7).join("\n") +
      "\n" +
      updatedBox;

    if (progress === 100) {
      clearInterval(interval);
      const link = document.createElement("a");
      link.href = "path/to/resume.pdf"; // Update with actual path
      link.download = "tushar_kalra_resume.pdf";
      link.click();
    }
  }, 100);
}

function renderProjects() {
  let output = `\n${PROJECT_ASCII}\n`;
  output += formatBox(
    "My Projects",
    projectsData
      .map(
        (project, index) =>
          `${index + 1}. ${project.title}\n   ${
            project.description
          }\n   Tech: ${project.tech}`
      )
      .join("\n\n")
  );
  appendOutputWithTyping(output, suggestCommands);
}

// Command Definitions
const commands = {
  help: formatBox(
    "Help Menu",
    `Available Commands:
about    - View my professional summary
skills   - List technical skills
projects - Browse my portfolio
ascii    - Show some cool ASCII art
clear    - Clear console
resume   - Download my resume
exit     - Close console`
  ),
  about: formatBox(
    "About Me",
    `${ASCII_COMPUTER}\n
Backend Developer specializing in Node.js
• 3+ years building scalable applications
• Expertise in API development
• Focus on performance optimization
• Passionate about clean code`
  ),
  skills: formatBox(
    "Skills",
    `╭────────── Backend ──────────╮
│ Node.js  Express  MongoDB │
╰──────────────────────────╯
╭────────── Frontend ─────────╮
│ HTML  CSS  JavaScript React │
╰───────────────────────────╯
╭────────── DevOps ──────────╮
│ Docker  AWS  CI/CD  Git    │
╰──────────────────────────╯`
  ),
  ascii: `${ASCII_LOGO}\n${ASCII_COMPUTER}\n${PROJECT_ASCII}`,
};

function handleCommand(command) {
  const cmd = command.toLowerCase().trim();
  outputDiv.innerHTML += `\n> ${command}\n`;

  if (cmd === "resume") {
    simulateDownload();
  } else if (cmd === "clear") {
    outputDiv.innerHTML = "";
  } else if (cmd === "projects") {
    renderProjects();
  } else if (cmd === "ascii") {
    appendOutputWithTyping(commands.ascii);
  } else if (cmd === "exit" || cmd === "quit") {
    appendOutputWithTyping("\nGoodbye! Press F5 to restart.\n\n");
  } else if (commands[cmd]) {
    appendOutputWithTyping(commands[cmd]);
  } else {
    appendOutputWithTyping(
      '\nCommand not found. Type "help" for available commands.\n\n'
    );
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("main-container");

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && introDiv.style.display !== "none") {
      introDiv.style.opacity = "0";
      introDiv.style.transition = "opacity 0.5s";

      setTimeout(() => {
        introDiv.style.display = "none";
        mainContainer.style.display = "flex";
        consoleDiv.style.display = "flex";
        inputField.style.display = "inline";
        inputField.focus();
        appendOutputWithTyping(
          `${ASCII_LOGO}\n\nWelcome to my portfolio! Type "help" to see available commands.\n`
        );
      }, 500);
    }
  });
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = inputField.value;
    inputField.value = "";
    handleCommand(command);
  }
});

function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning!";
  if (hours < 18) return "Good Afternoon!";
  return "Good Evening!";
}

function suggestCommands() {
  appendOutputWithTyping(
    `\nTip: Try the 'ascii' command to see some cool ASCII art!\n`
  );
}

window.addEventListener("load", () => {
  setTimeout(() => {
    appendOutputWithTyping(`Welcome! ${getGreeting()}\n`);
    handleCommand("help");
  }, 1000);
});
