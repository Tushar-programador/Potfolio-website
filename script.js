// DOM Elements
const introDiv = document.getElementById("intro");
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

const MATRIX_ASCII = `
 01001101 01000001 01010100 01010010 
 01001001 01011000 00100000 01010010 
 01000001 01001001 01001110 00100000 
`;

// Colors for styling
const COLORS = {
  green: "#0f0",
  blue: "#0af",
  yellow: "#ff0",
  pink: "#f0f",
  cyan: "#0ff",
  orange: "#fa0",
};

// Project data
const projectsData = [
  {
    title: "Chat Realm",
    description: "Real-time chat application with end-to-end encryption",
    tech: "Node.js, Socket.io, MongoDB",
    url: "https://github.com/username/chat-realm",
    features: [
      "End-to-end encryption",
      "Real-time messaging",
      "File sharing",
      "User presence",
    ],
    status: "Live",
  },
  {
    title: "DNS Server",
    description: "Custom DNS implementation with caching",
    tech: "Node.js, UDP, DNS Protocol",
    url: "https://github.com/username/dns-server",
    features: [
      "DNS caching",
      "Custom record types",
      "Load balancing",
      "Security features",
    ],
    status: "In Development",
  },
  {
    title: "Payment Gateway",
    description: "Crypto payment processor with multiple chain support",
    tech: "Node.js, Web3, Express",
    url: "https://github.com/username/payment-gateway",
    features: [
      "Multi-chain support",
      "Auto conversion",
      "Transaction tracking",
      "Security audit passed",
    ],
    status: "Beta",
  },
];

// State management
let matrixAnimation = null;
let isMatrixRunning = false;
let currentProjectIndex = 0;
let currentView = "overview";

// Utility function to create formatted boxes
function formatBox(title, content) {
  const titleLength = 55;
  const lines = content.split("\n");
  return `
╔${"═".repeat(titleLength)}╗
║ ${title.toUpperCase().padEnd(titleLength - 2)} ║
╠${"═".repeat(titleLength)}╣
${lines.map((line) => `║  ${line.padEnd(titleLength - 4)} ║`).join("\n")}
╚${"═".repeat(titleLength)}╝`;
}

// Matrix rain animation setup
function setupMatrixRain() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.opacity = "0.5";
  canvas.id = "matrix-canvas";

  document.body.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const chars = "01";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let animationId;
  function animate() {
    draw();
    animationId = requestAnimationFrame(animate);
  }

  return {
    start: () => {
      canvas.style.display = "block";
      animate();
    },
    stop: () => {
      canvas.style.display = "none";
      cancelAnimationFrame(animationId);
    },
  };
}

// Project display functions
function createProjectMenu() {
  return `
╭${"─".repeat(50)}╮
│ [←/→] Navigate Projects  [↑/↓] Change View  [Enter] Select │
│ [B]ack to Overview      [Q]uit Project View               │
╰${"─".repeat(50)}╯`;
}

function showProjectOverview() {
  const total = projectsData.length;
  let output = `\n${PROJECT_ASCII}\n`;
  output += `\nShowing Project ${currentProjectIndex + 1} of ${total}\n\n`;

  projectsData.forEach((project, index) => {
    const isSelected = index === currentProjectIndex;
    output += `${isSelected ? ">" : " "} ${project.title} [${
      project.status
    }]\n`;
  });

  return output;
}

function showProjectDetails(project) {
  return formatBox(
    project.title,
    `Status: ${project.status}
Description: ${project.description}
Tech Stack: ${project.tech}
URL: ${project.url}

Features:
${project.features.map((f) => `• ${f}`).join("\n")}`
  );
}

// Typing animation function
function appendOutputWithTyping(text, speed = 30) {
  return new Promise((resolve) => {
    const lines = text.split("\n");
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex === lines.length) {
        clearInterval(interval);
        outputDiv.scrollTop = outputDiv.scrollHeight;
        resolve();
        return;
      }

      outputDiv.innerHTML += lines[lineIndex] + "\n";
      lineIndex++;
      outputDiv.scrollTop = outputDiv.scrollHeight;
    }, speed);
  });
}

// Command definitions
const commands = {
  help: formatBox(
    "Help Menu",
    `Available Commands:
about    - View my professional summary
skills   - List technical skills
projects - Browse my portfolio
ascii    - Show some cool ASCII art
matrix   - Toggle matrix rain effect
clear    - Clear console
contact  - Show contact information
resume   - Download my resume
experience - View my work history
exit     - Close console`
  ),
  about: formatBox(
    "About Me",
    `${ASCII_COMPUTER}

Backend Developer specializing in Node.js
• 3+ years building scalable applications
• Expertise in API development
• Focus on performance optimization
• Passionate about clean code`
  ),
  skills: formatBox(
    "Skills",
    `Backend:  Node.js, Express, MongoDB
Frontend: HTML, CSS, JavaScript, React
DevOps:   Docker, AWS, CI/CD, Git`
  ),
  contact: formatBox(
    "Contact",
    `Email:    tushar@example.com
GitHub:   github.com/username
LinkedIn: linkedin.com/in/username`
  ),
  experience: async () => {
    await showExperience();
  },
};

// Project navigation handler
function handleProjectNavigation(e) {
  let needsUpdate = true;

  switch (e.key.toLowerCase()) {
    case "arrowleft":
      if (currentProjectIndex > 0) currentProjectIndex--;
      break;
    case "arrowright":
      if (currentProjectIndex < projectsData.length - 1) currentProjectIndex++;
      break;
    case "arrowup":
    case "arrowdown":
      currentView = currentView === "overview" ? "details" : "overview";
      break;
    case "b":
      currentView = "overview";
      break;
    case "q":
      document.removeEventListener("keydown", handleProjectNavigation);
      appendOutputWithTyping(
        '\nExited project view. Type "help" for commands.\n'
      );
      return false;
    default:
      needsUpdate = false;
  }

  if (needsUpdate) {
    updateProjectDisplay();
  }
  return true;
}

// Project display update
async function updateProjectDisplay() {
  let output = "";

  if (currentView === "overview") {
    output = showProjectOverview();
  } else {
    output = showProjectDetails(projectsData[currentProjectIndex]);
  }

  output += "\n" + createProjectMenu();

  outputDiv.innerHTML = "";
  await appendOutputWithTyping(output);
}

// Command handler
async function handleCommand(command) {
  const cmd = command.toLowerCase().trim();
  outputDiv.innerHTML += `\n> ${command}\n`;

  switch (cmd) {
    case "clear":
      outputDiv.innerHTML = "";
      break;
    case "experince":
      await showExperience();
      break;
   case "projects":
      currentProjectIndex = 0;
      currentView = "overview";
      await appendOutputWithTyping("Loading project viewer...\n");
      await updateProjectDisplay();
      document.addEventListener("keydown", handleProjectNavigation);
      break;

    case "ascii":
      await appendOutputWithTyping(
        `${ASCII_LOGO}\n${ASCII_COMPUTER}\n${PROJECT_ASCII}\n${MATRIX_ASCII}`
      );
      break;

    case "matrix":
      if (!matrixAnimation) {
        matrixAnimation = setupMatrixRain();
      }
      if (isMatrixRunning) {
        matrixAnimation.stop();
        await appendOutputWithTyping("Matrix rain effect stopped!\n");
      } else {
        matrixAnimation.start();
        await appendOutputWithTyping(
          'Matrix rain effect started! Type "matrix" again to stop.\n'
        );
      }
      isMatrixRunning = !isMatrixRunning;
      break;

    case "resume":
      await appendOutputWithTyping("Downloading resume...\n");
      // Add resume download logic here
      break;
    case "experience":
      await showExperience();
      break;
    case "exit":
    case "quit":
      await appendOutputWithTyping("Goodbye! Press F5 to restart.\n");
      break;

    default:
      if (commands[cmd]) {
        await appendOutputWithTyping(commands[cmd]);
      } else {
        await appendOutputWithTyping(
          '\nCommand not found. Type "help" for available commands.\n'
        );
      }
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Handle intro screen
  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && introDiv.style.display !== "none") {
      introDiv.style.opacity = "0";
      setTimeout(async () => {
        introDiv.style.display = "none";
        mainContainer.style.display = "flex";
        consoleDiv.style.display = "flex";
        inputField.style.display = "inline";
        inputField.focus();
        await appendOutputWithTyping(
          `${ASCII_LOGO}\n\nWelcome to my portfolio! Type "help" to see available commands.\n`
        );
      }, 500);
    }
  });

  // Handle command input
  inputField.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const command = inputField.value;
      inputField.value = "";
      await handleCommand(command);
    }
  });

  // Initial greeting
  setTimeout(async () => {
    await appendOutputWithTyping(
      `Welcome to my portfolio!\nPress Enter to start.\n`
    );
  }, 1000);
});

// Add styles
const style = document.createElement("style");
style.textContent = `
  .selected-project {
    color: #0f0;
    font-weight: bold;
  }
  .project-status {
    color: #0af;
    font-style: italic;
  }
  .project-nav {
    color: #ff0;
    margin-top: 10px;
  }
`;
document.head.appendChild(style);

const EXPERIENCE_ASCII = `
    ⚡ EXPERIENCE ⚡    
     ______________     
    /             /|   
   /             / |   
  /____________ /  |   
  |           |   |    
  |           |   |    
  |           |   |    
  |___________|  /     
  |           | /      
  |___________|/       
`;

// Add experience data
const experienceData = [
  {
    company: "TechCorp Solutions",
    role: "Senior Backend Developer",
    period: "2022 - Present",
    highlights: [
      "Led team of 5 developers on microservices architecture",
      "Reduced API response time by 40%",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored 3 junior developers",
    ],
  },
  {
    company: "DataFlow Systems",
    role: "Backend Developer",
    period: "2020 - 2022",
    highlights: [
      "Developed REST APIs serving 1M+ daily requests",
      "Optimized database queries reducing load by 30%",
      "Implemented real-time notification system",
      "Led migration from monolith to microservices",
    ],
  },
];

// Add new animations
function typewriterEffect(element, text, speed = 50) {
  let i = 0;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

function glitchText(text, iterations = 3) {
  const glitchChars = "!@#$%^&*<>-_";
  let result = text;

  for (let i = 0; i < iterations; i++) {
    const pos = Math.floor(Math.random() * text.length);
    const glitchChar =
      glitchChars[Math.floor(Math.random() * glitchChars.length)];
    result = result.substring(0, pos) + glitchChar + result.substring(pos + 1);
  }

  return result;
}

async function glitchAnimation(element, finalText, duration = 1000) {
  const steps = 10;
  const stepDuration = duration / steps;

  for (let i = 0; i < steps; i++) {
    element.textContent = glitchText(finalText);
    await new Promise((resolve) => setTimeout(resolve, stepDuration));
  }

  element.textContent = finalText;
}

// Add slide-in animation for boxes
function slideInBox(content) {
  const lines = content.split("\n");
  return new Promise(async (resolve) => {
    for (const line of lines) {
      await appendOutputWithTyping(
        "| " + line + " ".repeat(50 - line.length) + "|\n",
        30
      );
    }
    resolve();
  });
}

// Enhance formatBox with animation
async function animatedBox(title, content) {
  const titleLength = 55;
  await appendOutputWithTyping(`╔${"═".repeat(titleLength)}╗\n`);
  await appendOutputWithTyping(
    `║ ${title.toUpperCase().padEnd(titleLength - 2)} ║\n`
  );
  await appendOutputWithTyping(`╠${"═".repeat(titleLength)}╣\n`);

  const lines = content.split("\n");
  for (const line of lines) {
    await appendOutputWithTyping(`║  ${line.padEnd(titleLength - 4)} ║\n`);
  }

  await appendOutputWithTyping(`╚${"═".repeat(titleLength)}╝\n`);
}

// Add experience command handler
async function showExperience() {
  await appendOutputWithTyping(EXPERIENCE_ASCII + "\n");

  for (const exp of experienceData) {
    await animatedBox(
      exp.company,
      `Role: ${exp.role}
Period: ${exp.period}

Key Achievements:
${exp.highlights.map((h) => `• ${h}`).join("\n")}`
    );
    await new Promise((resolve) => setTimeout(resolve, 500)); // Pause between experiences
  }
}

// Update commands object
commands.experience = async () => {
  await showExperience();
};
