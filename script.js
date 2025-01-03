const introDiv = document.getElementById("intro");
const nameElement = document.getElementById("name");
const designationElement = document.getElementById("designation");
const taglineElement = document.getElementById("tagline");
const enterNoteElement = document.getElementById("enter-note");
const consoleDiv = document.getElementById("console");
const outputDiv = document.getElementById("output");
const inputField = document.getElementById("command-input");

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
      updatedBox +
      "\n";

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
  let output = `\n╔═══════════════════════════════════════════════════════════╗
║                      MY PROJECTS                          ║
╠═══════════════════════════════════════════════════════════╣\n`;

  projectsData.forEach((project, index) => {
    output += `║  ${index + 1}. ${project.title.padEnd(45)} ║\n`;
    output += `║     ${project.description.padEnd(43)} ║\n`;
    output += `║     Tech: ${project.tech.padEnd(40)} ║\n`;
    if (index < projectsData.length - 1) {
      output += `╟───────────────────────────────────────────────────────╢\n`;
    }
  });

  output += `╚═══════════════════════════════════════════════════════════╝\n\n`;
  appendOutputWithTyping(output, suggestCommands);
}

function typeText(element, text, callback = null, speed = 50) {
  let index = 0;
  element.textContent = "";

  const interval = setInterval(() => {
    if (index === text.length) {
      clearInterval(interval);
      if (callback) callback();
      return;
    }
    element.textContent += text[index];
    index++;
  }, speed);
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
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const mainContainer = document.getElementById("main-container");

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      intro.style.opacity = "0"; // Fade out intro
      setTimeout(() => {
        intro.style.display = "none"; // Hide intro
        mainContainer.style.display = "flex"; // Show main container
        mainContainer.style.opacity = "1"; // Fade in main container
      }, 500); // Match the transition duration
    }
  });
});

function handleCommand(command) {
  const cmd = command.toLowerCase().trim();
  outputDiv.innerHTML += `\n> ${command}\n`;

  if (cmd === "resume") {
    simulateDownload();
  } else if (cmd === "clear") {
    outputDiv.innerHTML = "";
  } else if (cmd === "projects") {
    renderProjects();
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
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && introDiv.style.display !== "none") {
    introDiv.style.opacity = "0";
    introDiv.style.transition = "opacity 0.5s";

    setTimeout(() => {
      introDiv.style.display = "none";
      consoleDiv.style.display = "flex";
      inputField.style.display = "inline";
      inputField.focus();
      appendOutputWithTyping(
        '\nWelcome to my portfolio! Type "help" to see available commands.\n'
      );
    }, 500);
  }
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = inputField.value;
    inputField.value = "";
    handleCommand(command);
  }
});

// Commands
const commands = {
  help: formatBox(
    "Help Menu",
    `Available Commands:
  about    - View my professional summary
  skills   - List technical skills
  projects - Browse my portfolio
  clear    - Clear console
  resume   - Download my resume
  exit     - Close console`
  ),
  about: formatBox(
    "About Me",
    `Backend Developer specializing in Node.js
• 3+ years building scalable applications
• Expertise in API development
• Focus on performance optimization
• Passionate about clean code`
  ),
  skills: formatBox(
    "Skills",
    `Backend:    Node.js, Express, MongoDB
Frontend:   HTML, CSS, JavaScript
DevOps:     Docker, AWS, CI/CD
Tools:      Git, VS Code, Postman
Database:   MongoDB, PostgreSQL, Redis`
  ),
};

commands.contact = formatBox(
  "Contact",
  `Email: tushar@example.com
GitHub: github.com/username
LinkedIn: linkedin.com/in/username`
);

commands.socials = formatBox(
  "Social Media",
  `GitHub: github.com/username
Twitter: twitter.com/username
LinkedIn: linkedin.com/in/username`
);

window.addEventListener("load", () => {
  setTimeout(() => {
    displayGreeting();
    handleCommand("help");
  }, 1000);
});

function displayGreeting() {
  appendOutputWithTyping(`Welcome back! ${getGreeting()}\n`);
}

function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning!";
  if (hours < 18) return "Good Afternoon!";
  return "Good Evening!";
}

function suggestCommands() {
  appendOutputWithTyping(
    `\nDid you know? You can type 'projects' to see my portfolio or 'resume' to download my resume.\n`
  );
}

setTimeout(suggestCommands, 3000);
