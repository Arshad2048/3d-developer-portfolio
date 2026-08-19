/**
 * Arshad Khan — Interactive AI Copilot Assistant
 * Client-side intelligent query resolver & conversational assistant
 */

(function () {
  const KNOWLEDGE_BASE = {
    identity: {
      name: "Arshad Khan",
      role: "Full-Stack Web Developer & AI Automation Specialist",
      github: "https://github.com/Arshad2048",
      status: "Available for full-time opportunities, freelance contracts, and innovative collaborations",
      bio: "Arshad is a passionate Full-Stack Developer specializing in modern MERN stack architectures, Python-powered AI chatbots & automations, Supabase/SQL database modeling, and interactive, scroll-driven 3D web experiences."
    },
    skills: {
      frontend: ["React.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Canvas API & 2D/3D Interactive Graphics", "Responsive Web Design"],
      backend: ["Node.js", "Express.js", "Python (FastAPI, Flask)", "RESTful API Design", "Authentication & JWT", "Webhooks"],
      databases: ["Supabase (PostgreSQL)", "SQL", "MongoDB & Mongoose", "Database Schema Design & Query Optimization", "Row Level Security (RLS)"],
      ai_automation: ["Custom AI Chatbots", "Python LLM Integration (OpenAI, Gemini, Anthropic)", "Prompt Engineering & RAG Workflows", "Automated Task Pipelines", "Webhook Orchestrations"],
      tools: ["Git & GitHub (@Arshad2048)", "Postman", "VS Code", "npm/pip", "Vercel & Render Deployment"]
    },
    projects: [
      {
        id: "majdoor-mitra",
        name: "Majdoor Mitra (मजदूर मित्र)",
        tagline: "Empowering Laborers & Daily Wage Workers with Job Connectivity",
        stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
        highlights: [
          "Direct worker-to-contractor matching with verified trade categories (Masonry, Plumbing, Electrical, Painting).",
          "Multilingual intuitive user interface designed specifically for accessible mobile use.",
          "Transparent daily wage listings, instant contact capabilities, and job status tracking.",
          "High performance backend with secure role-based access for laborers and recruiters."
        ],
        github: "https://github.com/Arshad2048/majdoor-mitra"
      },
      {
        id: "spendwise",
        name: "SpendWise",
        tagline: "Smart Personal Expense Intelligence & Budget Tracker",
        stack: ["React", "Supabase", "PostgreSQL", "SQL Analytics", "Tailwind CSS", "Chart.js"],
        highlights: [
          "Real-time expense synchronization and balance tracking powered by Supabase PostgreSQL.",
          "Dynamic visual analytics with category-wise breakdown and monthly spending forecasts.",
          "Custom budget limit thresholds with visual progress tracking and goal milestones.",
          "Secure authentication with PostgreSQL Row Level Security (RLS) policies."
        ],
        github: "https://github.com/Arshad2048/spendwise"
      },
      {
        id: "lets-scroll-portfolio",
        name: "Interactive 3D Diorama Portfolio",
        tagline: "Scroll-Scrubbed Continuous Walkthrough & Canvas Engine",
        stack: ["HTML5 Canvas", "Vanilla JavaScript", "Custom Scroll-Scrub Engine", "CSS Glassmorphism"],
        highlights: [
          "Zero-dependency 60fps canvas particle field and isometric clay diorama stages.",
          "Interactive client-side AI Copilot assistant with natural conversational response engine.",
          "Responsive project carousel with touch gestures and interactive code inspector."
        ],
        github: "https://github.com/Arshad2048"
      }
    ],
    contact: {
      github: "https://github.com/Arshad2048",
      email: "contact.arshad2048@gmail.com",
      hirePitch: "Arshad is ready to bring high energy, fast learning, and rigorous full-stack + AI automation skills to your engineering team!"
    }
  };

  const SUGGESTED_QUERIES = [
    "What is Arshad's tech stack?",
    "Tell me about Majdoor Mitra",
    "How does Arshad build AI chatbots?",
    "Tell me about SpendWise",
    "Why hire Arshad as a fresher?",
    "How can I contact Arshad?"
  ];

  function generateAIResponse(userInput) {
    const q = (userInput || "").toLowerCase().trim();

    // 1. Greet / Intro
    if (/^(hi|hello|hey|greetings|who are you|who is arshad)/.test(q)) {
      return `👋 **Hello! I'm Arshad's AI Copilot.** \n\nArshad Khan is a **Full-Stack Developer & AI Automation Specialist** skilled in **MERN Stack**, **Python AI Chatbots**, **Supabase & SQL**, and **Interactive Web UIs**. \n\nFeel free to ask me about his projects (*Majdoor Mitra*, *SpendWise*), tech stack, or how to get in touch!`;
    }

    // 2. Tech Stack / Skills
    if (/skill|stack|tech|technolog|mern|react|node|python|sql|supabase|mongo/.test(q)) {
      return `⚡ **Arshad's Core Technical Arsenal:**\n\n` +
        `• **Frontend**: React.js, JavaScript (ES6+), Modern CSS/Tailwind, HTML5 Canvas API, interactive scroll animations.\n` +
        `• **Backend**: Node.js, Express.js, Python (FastAPI/Flask), REST API architecture, Webhooks.\n` +
        `• **Databases**: Supabase (PostgreSQL), SQL relational queries, MongoDB & Mongoose.\n` +
        `• **AI & Automation**: Custom AI Chatbots in Python, LLM Orchestration (OpenAI/Gemini API), Task automation workflows.\n` +
        `• **Developer Tools**: Git & GitHub (@Arshad2048), Postman, VS Code.`;
    }

    // 3. Majdoor Mitra Project
    if (/majdoor|labor|labour|mitra|worker/.test(q)) {
      const p = KNOWLEDGE_BASE.projects[0];
      return `🛠️ **Project Spotlight: ${p.name}**\n\n` +
        `*${p.tagline}*\n\n` +
        `• **Tech Stack**: ${p.stack.join(", ")}\n` +
        `• **Problem Solved**: Directly connects daily-wage laborers (masons, electricians, painters, plumbers) with local employers and contractors, removing exploitative intermediaries.\n` +
        `• **Key Features**: Multilingual interface, verified trade badges, transparent daily wage rates, and instant calling.\n\n` +
        `🔗 Explore on GitHub: [github.com/Arshad2048/majdoor-mitra](${p.github})`;
    }

    // 4. SpendWise Project
    if (/spendwise|expense|budget|finance|money/.test(q)) {
      const p = KNOWLEDGE_BASE.projects[1];
      return `💰 **Project Spotlight: ${p.name}**\n\n` +
        `*${p.tagline}*\n\n` +
        `• **Tech Stack**: ${p.stack.join(", ")}\n` +
        `• **Architecture**: Powered by **Supabase PostgreSQL** for real-time transactional sync, with Row Level Security (RLS) guaranteeing user privacy.\n` +
        `• **Key Features**: Interactive visual analytics, dynamic category breakdown, monthly spending alerts, and savings milestone targets.\n\n` +
        `🔗 Explore on GitHub: [github.com/Arshad2048/spendwise](${p.github})`;
    }

    // 5. AI Chatbot / Automation expertise
    if (/ai|chatbot|bot|automation|llm|python chatbot/.test(q)) {
      return `🤖 **Python AI Chatbots & Automations:**\n\n` +
        `Arshad builds smart conversational AI systems and automated workflows:\n\n` +
        `1. **Custom Website Chatbots**: Integrating Python backend services with LLMs (OpenAI, Gemini) to answer customer queries with custom knowledge bases.\n` +
        `2. **Intelligent Webhooks & Triggers**: Automating business actions, lead capture, and notifications upon user events.\n` +
        `3. **Full-Stack AI Bridges**: Connecting React frontends seamlessly to Python AI APIs via clean RESTful architectures.`;
    }

    // 6. Experience / Fresher context
    if (/experience|fresher|hire|background|education|job/.test(q)) {
      return `🚀 **Why Hire Arshad Khan?**\n\n` +
        `As a dedicated and motivated fresher developer, Arshad brings:\n\n` +
        `• **Production-Ready Practical Skills**: Proven hands-on projects (**Majdoor Mitra** and **SpendWise**) demonstrating end-to-end full-stack development.\n` +
        `• **Modern AI-First Mindset**: Not just traditional CRUD — capable of building AI chatbots, automations, and modern interactive web graphics.\n` +
        `• **Rapid Problem Solver**: Passionate about clean code, scalable database schemas, and intuitive UI/UX.\n` +
        `• **Immediate Availability**: Ready to contribute from day one!`;
    }

    // 7. Contact / Socials
    if (/contact|email|reach|hire|github|linkedin|phone|call/.test(q)) {
      return `📬 **Connect with Arshad:**\n\n` +
        `• **GitHub**: [github.com/Arshad2048](https://github.com/Arshad2048)\n` +
        `• **Email**: \`contact.arshad2048@gmail.com\`\n` +
        `• **Status**: Open to full-stack, frontend, backend, or AI developer roles!\n\n` +
        `You can also use the contact form at the bottom of this portfolio to send a direct message.`;
    }

    // Fallback response with helpful hints
    return `🤖 I'm here to help you learn all about Arshad! You can ask me:\n\n` +
      `• *"What is Arshad's tech stack?"*\n` +
      `• *"Tell me about the Majdoor Mitra project"*\n` +
      `• *"How does he build AI chatbots with Python?"*\n` +
      `• *"How does SpendWise use Supabase & SQL?"*\n` +
      `• *"How can I hire or contact Arshad?"*`;
  }

  // Export globally to window
  window.ArshadAICopilot = {
    generateResponse: generateAIResponse,
    getSuggestedQueries: () => SUGGESTED_QUERIES,
    knowledge: KNOWLEDGE_BASE
  };
})();
