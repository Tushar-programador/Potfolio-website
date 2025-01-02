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
// commands.resume = formatBox(
//   "Resume",
//   `
// Downloading resume.pdf...
// Progress: [                    ] 0%`
// );

// Add new functions for resume download simulation
// function simulateDownload() {
//   console.log("Simulating download");
//   let progress = 0;
//   const interval = setInterval(() => {
//     progress += 5;
//     const filled = "=".repeat(progress / 5);
//     const empty = " ".repeat(20 - progress / 5);
//     const progressBar = `Progress: [${filled}${empty}] ${progress}%`;

//     // Update just the progress line in the box
//     const lines = outputDiv.innerHTML.split("\n");
//     lines[lines.length - 2] = `║  ${progressBar.padEnd(46)} ║`;
//     outputDiv.innerHTML = lines.join("\n");

//     if (progress === 100) {
//       clearInterval(interval);
//       setTimeout(() => {
//         // Trigger actual download
//         console.log("Downloading resume...");
//         const link = document.createElement("a");
//         link.href = "/path/to/your/resume.pdf"; // Add your resume path here
//         link.download = "tushar_kalra_resume.pdf";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       }, 500);
//     }
//   }, 100);
// }
function simulateDownload() {
  let progress = 0;
  // First clear any existing progress
  const initialBox = formatBox(
    "Resume",
    `
Downloading resume.pdf...
Progress: [                    ] 0%`
  );
  outputDiv.innerHTML =
    outputDiv.innerHTML.split("\n").slice(0, -1).join("\n") +
    "\n" +
    initialBox +
    "\n";

  const interval = setInterval(() => {
    progress += 5;
    const filled = "=".repeat(progress / 5);
    const empty = " ".repeat(20 - progress / 5);
    const progressText = `Downloading resume.pdf...\nProgress: [${filled}${empty}] ${progress}%`;

    const updatedBox = formatBox("Resume", progressText);
    // Replace the last box in output
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
function formatBox(title, content) {
  return `
╔═══════════════════════════════════════════════════════════╗
║ ${title.toUpperCase().padEnd(47)} ║
╠═══════════════════════════════════════════════════════════╣
${content
  .split("\n")
  .map((line) => `║  ${line.padEnd(46)} ║`)
  .join("\n")}
╚═══════════════════════════════════════════════════════════╝`;
}

const commands = {
  help: formatBox(
    "Help Menu",
    `
Available Commands:
  about    - View my professional summary
  skills   - List technical skills
  projects - Browse my portfolio
  clear    - Clear console
  resume   - Download my resume
  exit     - Close console`
  ),

  about: formatBox(
    "About Me",
    `
Backend Developer specializing in Node.js
• 3+ years building scalable applications
• Expertise in API development
• Focus on performance optimization
• Passionate about clean code`
  ),

  skills: formatBox(
    "Skills",
    `
Backend:    Node.js, Express, MongoDB
Frontend:   HTML, CSS, JavaScript
DevOps:     Docker, AWS, CI/CD
Tools:      Git, VS Code, Postman
Database:   MongoDB, PostgreSQL, Redis`
  ),
  resume: formatBox(
    "Resume",
    `
Downloading resume.pdf...
Progress: [                    ] 0%`
  ),
};

function renderProjects() {
  let output = `
╔═══════════════════════════════════════════════════════════╗
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

  output += `╚═══════════════════════════════════════════════════════════╝\n`;
  appendOutputWithTyping(output);
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
      console.log(text);
      console.log({ callback: callback });
      if (callback) callback();
      return;
    }

    outputDiv.innerHTML += lines[lineIndex] + "\n";
    lineIndex++;
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }, 30);
}

function handleCommand(command) {
  const cmd = command.toLowerCase().trim();
  outputDiv.innerHTML += `\n> ${command}\n\n`;

  if (cmd === "resume") {
    simulateDownload();
  } else if (cmd === "clear") {
    outputDiv.innerHTML = "";
  } else if (cmd === "projects") {
    renderProjects();
  } else if (cmd === "exit" || cmd === "quit") {
    appendOutputWithTyping("\nGoodbye! Press F5 to restart.\n");
  } else if (commands[cmd]) {
    appendOutputWithTyping(commands[cmd]);
  } else {
    appendOutputWithTyping(
      '\nCommand not found. Type "help" for available commands.\n'
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

// Start intro sequence
typeText(nameElement, "Tushar Kalra");
setTimeout(
  () => typeText(designationElement, "Backend Developer | Node.js Expert"),
  1000
);
setTimeout(
  () => typeText(taglineElement, "Building scalable backend solutions"),
  2000
);
setTimeout(() => typeText(enterNoteElement, "Press Enter to start"), 3000);
// Automatically display the help menu after the intro
window.addEventListener("load", () => {
  setTimeout(() => {
    displayGreeting()
    handleCommand("help"); // Automatically shows the help menu
  }, 1000); // Wait a second before showing the help
});
function displayGreeting() {
  appendOutputWithTyping(`Welcome back! ${getGreeting()}\n`);
}

// setTimeout(displayGreeting, 2000); // Show greeting after intro

// Greeting based on the time of day
function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning!";
  if (hours < 18) return "Good Afternoon!";
  return "Good Evening!";
}


// Suggesting commands after showing help
function suggestCommands() {
  appendOutputWithTyping(
    `\nDid you know? You can type 'projects' to see my portfolio or 'resume' to download my resume.\n`
  );
}

setTimeout(suggestCommands, 3000); // Suggest commands after help menu

// Simulate system logs (terminal activity)
function simulateSystemCheck() {
  // Initializing system check
  appendOutputWithTyping("\n[System] Initializing system check...\n");

  let progress = 0;
  const interval = setInterval(() => {
    progress += 30; // Increase by 10% per step

    // Generate progress bar
    const filled = "=".repeat(progress / 5); // 20 chars max for a 100% bar
    const empty = " ".repeat(20 - progress / 5); // Remaining empty space
    const progressText = `Progress: [${filled}${empty}] ${progress}%`;

    appendOutputWithTyping(`\n[System] ${progressText}`, () => {
      // After 100% progress, show completion message
      if (progress === 100) {
        clearInterval(interval);
        appendOutputWithTyping("\n[System] System check complete.\n");
      }
    });
  }, 500); // 500ms interval for progress updates (you can adjust the speed)
}

// simulateSystemCheck(); // Start simulating logs

// New commands for contact and social media
commands.contact = formatBox(
  "Contact",
  `
Email: tushar@example.com
GitHub: github.com/username
LinkedIn: linkedin.com/in/username`
);

commands.socials = formatBox(
  "Social Media",
  `
GitHub: github.com/username
Twitter: twitter.com/username
LinkedIn: linkedin.com/in/username`
);

// Ask user to engage with the project after viewing it
function askForProjectInterest() {
  appendOutputWithTyping(
    `\nWould you like to know more about any of my projects? Type the project number (1, 2, 3) or type 'exit' to leave.\n`
  );
}

setTimeout(askForProjectInterest, 4000);
