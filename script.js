const introDiv = document.getElementById("intro");
const consoleDiv = document.getElementById("console");
const outputDiv = document.getElementById("output");
const inputField = document.getElementById("command-input");

const commands = {
  help: "Available commands: about, skills, projects, contact, clear",
  about:
    "Hi, I'm a backend developer specializing in Node.js, Express, and MongoDB.",
  skills:
    "Skills: Node.js, Express.js, MongoDB, SQL, JavaScript, and REST APIs.",
  projects:
    "Projects: 1. Chat Realm (Real-time chat app) 2. DNS Server 3. Crypto Payment Gateway",
  contact: "Email: tusharkalra307@gmail.com | GitHub: github.com/username",
  clear: "",
};

// Intro Animation
const introLines = [
  "Initializing console...",
  "Welcome, I am Tushar Kalra.",
  "Backend Developer | Node.js Enthusiast.",
  "Building efficient and scalable backend solutions.",
  "Press Enter to continue...",
];

let lineIndex = 0;

function typeLine(line, callback) {
  let charIndex = 0;
  const interval = setInterval(() => {
    if (charIndex < line.length) {
      outputDiv.innerHTML += line[charIndex++];
    } else {
      clearInterval(interval);
      outputDiv.innerHTML += "\n";
      callback();
    }
  }, 50); // Adjust typing speed here
}

function displayIntro() {
  if (lineIndex < introLines.length) {
    typeLine(introLines[lineIndex], () => {
      lineIndex++;
      displayIntro();
    });
  } else {
    enableInput();
  }
}

function enableInput() {
  inputField.style.display = "inline";
  inputField.focus();
}

// Handle Commands
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = inputField.value.trim();
    inputField.value = "";

    if (command === "clear") {
      outputDiv.innerHTML = "";
    } else if (commands[command]) {
      appendOutput(`> ${command}\n${commands[command]}`);
    } else {
      appendOutput(
        `> ${command}\nCommand not found. Type "help" for a list of commands.`
      );
    }
  }
});

function appendOutput(text) {
  outputDiv.innerHTML += `${text}\n`;
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Transition from Intro to Console
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && introDiv.style.display !== "none") {
    introDiv.style.opacity = 0;
    setTimeout(() => {
      introDiv.style.display = "none";
      consoleDiv.style.display = "flex";
      displayIntro();
    }, 500); // Adjust timing for smooth transition
  }
});
