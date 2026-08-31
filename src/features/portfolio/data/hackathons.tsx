import type { Hackathon } from "../types/hackathons"

export const HACKATHONS: Hackathon[] = [
  {
    id: "hacksync-26",
    name: "HackSync '26",
    prize: "Winner (1st Place)",
    date: "2026-03",
    organizer: "GDG TSEC",
    problemStatement:
      "Brand campaign execution is fragmented across disconnected strategy docs, design suites, and ad platforms, stripping marketing teams of speed and strategic brand intent.",
    project: {
      title: "SocialNest",
      description:
        "Autonomous brand campaign platform orchestrated by NestGPT multi-agent pipelines to turn high-level briefs into complete marketing strategies. Features a Konva-powered creative Canvas Studio, Google Veo 3 video ad synthesis, real-time voice sales agents, and one-click multi-platform publishing.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "Google Gemini",
        "Google Veo",
        "Konva",
        "WebSockets",
      ],
      github: "https://github.com/Vinayak9769/hacksync",
    },
  },

  {
    id: "datathon-26",
    name: "Datathon '26",
    prize: "Participant",
    date: "2026-02",
    organizer: "KJSCE DataZen",
    problemStatement:
      "Engineering data sits fragmented across Jira, GitHub, and meeting transcripts, leaving technical leaders without visibility into delivery health, CapEx/OpEx allocation, and burnout risks.",
    project: {
      title: "Meridian",
      description:
        "Enterprise delivery intelligence platform built on a multi-agent orchestration pipeline and zero-navigation generative UI. Automates BRD/SRS-to-Jira ticket synthesis with human-in-the-loop validation, performs RAG over meeting transcripts, and analyzes engineering velocity using real-time GitHub GraphQL organization telemetry.",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "Qdrant",
        "MongoDB",
        "Jira Cloud API",
        "GitHub GraphQL API",
        "Zoom API",
      ],
      github: "https://github.com/vaiibbbhav/datathon-2026",
    },
  },
  {
    id: "rubix-26",
    name: "Rubix '26",
    prize: "Finalist (Top 10)",
    date: "2026-01",
    organizer: "TSEC Rubix",
    problemStatement:
      "Hospitals struggle with chaotic outpatient queues, blind-spot bed shortages during emergency surges, and manual pharmacy audits that delay patient admissions and critical care.",
    project: {
      title: "CityCare",
      description:
        "Intelligent hospital operations command platform featuring real-time OPD queue optimization, live ward bed tracking with ML-based shortage forecasting, and inter-hospital capacity sharing. Integrates automated voice triage and trauma dispatch with computer vision-powered smart mirror pharmacy audits for controlled substance tracking.",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "FastAPI",
        "Python",
        "MongoDB",
        "YOLO",
      ],
      github: "https://github.com/Vinayak9769/RUBIX-26",
    },
  },
  {
    id: "need-for-code-4",
    name: "Need for Code 4.0",
    prize: "Winner (1st Place)",
    date: "2025-10",
    organizer: "CodeTantra TSEC",
    problemStatement:
      "Family health records are fragmented, messy, and hard to access during emergencies, while routine tasks like doctor scheduling and medication refills fall through the cracks.",
    project: {
      title: "MyFam",
      description:
        "Family health management platform built on a multi-agent architecture. Features automated agent-based appointment scheduling & medicine restocking, RAG-powered vector search over OCR-digitized prescriptions, Wear OS telemetry for real-time vitals, multilingual conversational voice agents for phone-based medication reminders, and encrypted WebRTC virtual consultations.",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Django",
        "Flutter",
        "Wear OS",
        "Google Gemini LLM",
        "WebSockets",
      ],
      github: "https://github.com/yanshuy/nfc-client",
    },
  },
  {
    id: "codeissance-25",
    name: "Codeissance '25",
    prize: "Runner Up (2nd Place)",
    date: "2025-08",
    organizer: "Codestorm TSEC",
    problemStatement:
      "Travelers struggle to plan cohesive day trips that match their unique pace and mood without switching between disjointed map apps, blogs, and transit schedules.",
    project: {
      title: "CityPulse",
      description:
        "Agentic AI urban travel platform that autonomously monitors live city data streams and uses RAG for real-time commuting insights and event discovery. Generates dynamic personalized itineraries mapped with Google Maps direction polylines, offline service worker caching, and location-triggered web push notifications.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Google Maps API",
        "Google Gemini",
        "Vercel AI SDK",
        "Web Push API",
      ],
      github: "https://github.com/yanshuy/CityPulse",
    },
  },
  {
    id: "hackx",
    name: "HackX 3.0",
    prize: "Finalist (Top 10)",
    date: "2025-03",
    organizer: "NMIMS",
    problemStatement:
      "Dine-in restaurants face high order error rates, table bottlenecks, and sluggish communication between waitstaff, kitchens, and payment registers during peak hours.",
    project: {
      title: "ChaiBucks",
      description:
        "Full-stack restaurant operating system with table-side dynamic QR ordering and synchronized real-time kitchen display queues. Implements distinct multi-tenant role portals for waiters, chefs, and store admins with instantaneous WebSocket order status syncing and Razorpay payment gateway integration.",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "WebSockets",
        "Razorpay SDK",
      ],
      github: "https://github.com/yanshuy/hackx3",
    },
  },
  {
    id: "vesit",
    name: "Ves-Hack-It",
    prize: "Finalist (Top 10)",
    date: "2025-03",
    organizer: "VESIT",
    problemStatement:
      "Drivers waste time and fuel circling congested downtown parking facilities without prior knowledge of real-time slot occupancy or exact bay layouts.",
    project: {
      title: "Parko",
      description:
        "Smart parking management platform featuring NFC-based vehicle check-in/out and computer vision spot occupancy detection powered by YOLO models. Incorporates an interactive 3D parking lot visualization dashboard, geolocation-based facility routing, and digital pass validation.",
      techStack: [
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Three.js",
        "Leaflet",
        "Python",
        "YOLO",
      ],
      github: "https://github.com/yanshuy/vesit",
    },
  },
  {
    id: "megahack",
    name: "MegaHack '25",
    prize: "Participant",
    date: "2025-02",
    organizer: "SJCEM",
    problemStatement:
      "Smallholder farmers struggle to bypass retail middlemen and visually showcase bulk produce quality directly to wholesale and urban retail buyers.",
    project: {
      title: "Krishi",
      description:
        "Agricultural marketplace featuring a 3D spatial inventory system with live stock tracking and shelf-life indicators. Integrates regional voice-driven cataloging via speech-to-text parsing and an AI soil advisory model combining geolocation and weather telemetry for automated crop recommendations.",
      techStack: [
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Three.js",
        "Razorpay SDK",
        "Node.js",
        "Express",
      ],
      github: "https://github.com/yanshuy/megahack",
    },
  },
  {
    id: "realms-25",
    name: "Realms '25",
    prize: "Runner Up (2nd Place)",
    date: "2025-02",
    organizer: "KJSCE Team Vision",
    problemStatement:
      "Traditional desktop and mobile games lack physical embodiment, failing to merge rhythmic musical audio with spatial motion tracking in virtual environments.",
    project: {
      title: "SaberXR",
      description:
        "Beat Saber-style AR/VR rhythm game built with real-time motion tracking and spatial physics gameplay mechanics.",
      techStack: ["Unity", "C#", "WebXR"],
    },
  },
  {
    id: "rubix-25",
    name: "Rubix '25",
    prize: "Finalist (Top 10)",
    date: "2025-01",
    organizer: "CSI TSEC",
    problemStatement:
      "Organizing large-scale hackathons involves disconnected tools for team formation, mentor matchmaking, live project code sandboxing, and judging evaluations.",
    project: {
      title: "HackVerse",
      description:
        "Full-stack hackathon orchestration platform featuring GitHub-based team matchmaking, LLM-powered resume scoring, and gamified engagement pipelines. Integrates an AI-driven voice interview module, low-latency 1:1 WebRTC video calls with WebSocket signaling, and containerized one-click project deployment sandboxes with automated CI/CD.",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Django",
        "Django Channels",
        "WebRTC",
      ],
      github: "https://github.com/Vinayak9769/rubix",
    },
  },
  {
    id: "mumbaihacks-24",
    name: "MumbaiHacks '24",
    prize: "Participant",
    date: "2024-10",
    organizer: "TEAM & Meta",
    problemStatement:
      "Women navigating public spaces face heightened risks of harassment and assault, where manual SOS triggers and dial pads are impossible to reach during sudden confrontations.",
    project: {
      title: "Suraksha",
      description:
        "Hands-free mobile emergency response platform built for discreet distress activation. Implements background acoustic keyword sensing coupled with Llama 3 audio sentiment analysis to classify threats, auto-record encrypted ambient audio, plot predictive crime heatmaps, and broadcast real-time telemetry to emergency responders.",
      techStack: [
        "React Native (Expo)",
        "TypeScript",
        "Django",
        "Python",
        "Llama 3",
        "Tailwind CSS",
      ],
      github: "https://github.com/yanshuy/suraksha",
    },
  },
]
