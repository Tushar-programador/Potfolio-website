const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(isMobile);
if (isMobile) {
  // Wait for DOM content to load
  // Mobile device detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  
    document.addEventListener("DOMContentLoaded", () => {
      const introSection = document.getElementById("intro");
      const mainContainer = document.getElementById("main-container");
      const consoleElement = document.getElementById("console");
      const commandInput = document.getElementById("command-input");
      const outputElement = document.getElementById("output");
      const mobileButton = document.getElementById("mobile-button");
      const sendButton = document.getElementById("send-button");

      // Initialize mobile UI
      function initializeMobileUI() {
        mobileButton.style.display = "block";
        sendButton.style.display = "block";

        // Adjust layout for mobile
        mainContainer.style.width = "100%";
        mainContainer.style.height = "100%";
        mainContainer.style.border = "none";

        // Enhance console visibility
        consoleElement.style.padding = "10px";
        outputElement.style.maxHeight = "70vh";

        // Improve input experience
        commandInput.style.fontSize = "16px"; // Prevent zoom on iOS
        commandInput.style.width = "calc(100% - 70px)";
      }

      // Handle command execution
      function handleCommand(command) {
        const cmd = command.toLowerCase().trim();

        // Append command to output
        writeOutput(`> ${command}`);

        switch (cmd) {
          case "help":
            writeOutput(
              "Available commands: 'about', 'projects', 'contact', 'skills', 'experience', 'clear'"
            );
            break;
          case "about":
            writeOutput(
              "About me: I am Tushar Kalra, a passionate web developer!"
            );
            break;
          case "projects":
            displayProjects();
            break;
          case "contact":
            writeOutput("Contact: tusharkalra307@gmail.com");
            break;
          case "skills":
            displaySkills();
            break;
          case "experience":
            displayExperience();
            break;
          case "clear":
            outputElement.innerHTML = "";
            break;
          default:
            writeOutput(
              `Unknown command: '${command}'. Type 'help' for available commands.`
            );
        }
      }

      // Utility functions
      function writeOutput(text) {
        const newLine = document.createElement("div");
        newLine.textContent = text;
        outputElement.appendChild(newLine);
        outputElement.scrollTop = outputElement.scrollHeight;
      }

      function displayProjects() {
        const projects = [
          { title: "Chat Realm", description: "Real-time chat application" },
          { title: "DNS Server", description: "Custom DNS implementation" },
          { title: "KeepAnEye", description: "Website monitoring tool" },
        ];

        const projectList = document.createElement("div");
        projectList.className = "mobile-project-list";

        projects.forEach((project) => {
          const projectItem = document.createElement("div");
          projectItem.className = "mobile-project-item";
          projectItem.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        `;
          projectList.appendChild(projectItem);
        });

        outputElement.appendChild(projectList);
        outputElement.scrollTop = outputElement.scrollHeight;
      }

      function displaySkills() {
        const skills = {
          Backend: ["Node.js", "Express", "MongoDB"],
          Frontend: ["HTML", "CSS", "JavaScript"],
          DevOps: ["Docker", "Git", "CI/CD"],
        };

        const skillsList = document.createElement("div");
        skillsList.className = "mobile-skills-list";

        Object.entries(skills).forEach(([category, items]) => {
          skillsList.innerHTML += `
          <div class="skill-category">
            <h3>${category}</h3>
            <p>${items.join(", ")}</p>
          </div>
        `;
        });

        outputElement.appendChild(skillsList);
        outputElement.scrollTop = outputElement.scrollHeight;
      }

      function displayExperience() {
        const experience = [
          {
            role: "Backend Developer",
            company: "Learn Kro Education",
            period: "2024 - Present",
            description:
              "Led team of 3 developers, implemented microservices architecture",
          },
        ];

        const expList = document.createElement("div");
        expList.className = "mobile-experience-list";

        experience.forEach((exp) => {
          expList.innerHTML += `
          <div class="experience-item">
            <h3>${exp.role} at ${exp.company}</h3>
            <p>${exp.period}</p>
            <p>${exp.description}</p>
          </div>
        `;
        });

        outputElement.appendChild(expList);
        outputElement.scrollTop = outputElement.scrollHeight;
      }

      // Event listeners
      mobileButton.addEventListener("click", () => {
        introSection.style.display = "none";
        mainContainer.style.display = "flex";
        consoleElement.style.display = "flex";
        commandInput.style.display = "block";
        initializeMobileUI();
        writeOutput(
          "Welcome to the portfolio console! Type 'help' for available commands."
        );
      });

      sendButton.addEventListener("click", () => {
        const command = commandInput.value.trim();
        if (command) {
          handleCommand(command);
          commandInput.value = "";
        }
      });

      commandInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const command = commandInput.value.trim();
          if (command) {
            handleCommand(command);
            commandInput.value = "";
          }
        }
      });

      // Initialize
      initializeMobileUI();
    });
  } else {
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
      status: "Not Deployed",
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
      status: "Completed",
    },
    {
      title: "KeepAnEye",
      description: "Website uptime monitoring tool",
      tech: "Node.js,  Express, MongoDB",
      url: "https://github.com/username/payment-gateway",
      features: [
        "Multi-user support",
        "Uptime reports",
        "Alerts & notifications",
        "API for integrations",
      ],
      status: "In Development",
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
    canvas.style.opacity = "0.8";
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
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Background with slight transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const colorKeys = Object.keys(COLORS); // Get color names from the COLORS object

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]; // Random character
        const randomColor =
          COLORS[colorKeys[Math.floor(Math.random() * colorKeys.length)]]; // Random color
        ctx.fillStyle = randomColor; // Set random color
        ctx.fillText(text, i * fontSize, drops[i] * fontSize); // Draw the character

        // Reset drop to the top of the canvas with some randomness
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
• building scalable applications
• Expertise in API development
• Focus on performance optimization
• Passionate about clean code`
    ),
    contact: formatBox(
      "Contact",
      `Email:  tusharkalra307@gmail.com
GitHub:   https://github.com/Tushar-programador
LinkedIn: https://www.linkedin.com/in/tushar-kalra-developer/`
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
        if (currentProjectIndex < projectsData.length - 1)
          currentProjectIndex++;
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
    // Add styles
    document.head.appendChild(style);

    switch (cmd) {
      case "clear":
        outputDiv.innerHTML = "";
        break;
      case "experince":
        await showExperience();
        break;
      case "skills":
        console.log(1);
        currentSkillCategoryIndex = 0;
        await appendOutputWithTyping("Loading interactive skills viewer...\n");
        outputDiv.innerHTML = showSkillCategories();
        document.addEventListener("keydown", handleSkillNavigation);
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
      company: "Learn Kro Education",
      role: "Backend Developer",
      period: "2024 - Present",
      highlights: [
        "Led team of 3 developers on microservices architecture",
        "Create a scalable backend system ",
        "Developed a Monitoring system for the application",
        "Implement automated Excel data transfer system",
      ],
    },
    // {
    //   company: "DataFlow Systems",
    //   role: "Backend Developer",
    //   period: "2020 - 2022",
    //   highlights: [
    //     "Developed REST APIs serving 1M+ daily requests",
    //     "Optimized database queries reducing load by 30%",
    //     "Implemented real-time notification system",
    //     "Led migration from monolith to microservices",
    //   ],
    // },
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
      result =
        result.substring(0, pos) + glitchChar + result.substring(pos + 1);
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
  // Skills Data
  const skillsData = {
    Backend: ["Node.js", "Express", "MongoDB", "Redis", "Socket.io"],
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    DevOps: ["Docker", "CI/CD", "Git", "Nginx"],
    Tools: ["Postman", "VS Code", "GitHub", "Webpack"],
  };

  // Skill Navigation State
  let currentSkillCategoryIndex = 0;

  // Function to Display Skill Categories
  function showSkillCategories() {
    const categories = Object.keys(skillsData);
    let output = `\nSelect a category to view skills:\n\n`;

    categories.forEach((category, index) => {
      const isSelected = index === currentSkillCategoryIndex;
      output += `${isSelected ? ">" : " "} ${category}\n`;
    });

    output += `\n[←/→] Navigate Categories  [Enter] View Skills  [Q]uit Skills View`;
    return output;
  }

  // Function to Display Skills in Selected Category
  function showSkillsInCategory(category) {
    const skills = skillsData[category];
    return formatBox(
      category,
      `Skills:\n${skills.map((skill) => `• ${skill}`).join("\n")}`
    );
  }

  // Skill Navigation Handler
  function handleSkillNavigation(e) {
    const categories = Object.keys(skillsData);
    let needsUpdate = true;

    switch (e.key.toLowerCase()) {
      case "arrowleft":
        if (currentSkillCategoryIndex > 0) currentSkillCategoryIndex--;
        break;
      case "arrowright":
        if (currentSkillCategoryIndex < categories.length - 1)
          currentSkillCategoryIndex++;
        break;
      case "enter":
        const selectedCategory = categories[currentSkillCategoryIndex];
        outputDiv.innerHTML = showSkillsInCategory(selectedCategory);
        return;
      case "q":
        document.removeEventListener("keydown", handleSkillNavigation);
        appendOutputWithTyping(
          '\nExited skills view. Type "help" for commands.\n'
        );
        return;
      default:
        needsUpdate = false;
    }

    if (needsUpdate) {
      outputDiv.innerHTML = showSkillCategories();
    }
  }
}
