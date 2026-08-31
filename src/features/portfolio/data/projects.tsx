import { CodeXmlIcon, CpuIcon } from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "hackverse",
    title: "HackVerse",
    period: {
      start: "05.2025",
    },
    link: "https://github.com/Devanshnair",
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Django",
      "WebSockets",
      "WebRTC",
      "Gemini API",
      "CI/CD",
    ],
    description: `Full-stack hackathon management platform featuring hackathon discovery, GitHub-based team matchmaking, intelligent resume scoring using LLMs, and gamification elements to drive engagement.
- Architected an AI-driven interview module using Google Gemini API and Web Speech API.
- Enabled 1:1 video calls and real-time chat for 50+ users using WebSockets and WebRTC.
- Engineered a one-click deployment system with fully automated CI/CD pipelines.
`,
    icon: <CodeXmlIcon />,
    isExpanded: true,
  },
  {
    id: "supportos",
    title: "SupportOS",
    period: {
      start: "01.2025",
    },
    link: "https://github.com/Devanshnair",
    skills: [
      "React",
      "TypeScript",
      "FastAPI",
      "Qdrant",
      "PostgreSQL",
      "LangChain",
      "Redis",
      "Celery",
      "Twilio",
    ],
    description: `Multi-tenant AI support SaaS with customizable chatbot and FAQ widgets.
- Integrated a LangChain (RAG) pipeline with Qdrant vector search for precise enterprise knowledge retrieval.
- Evaluated and optimized pipeline to achieve 0.93 faithfulness, 0.89 answer relevancy, 0.82 context precision, and 1.00 context recall (RAGAS).
- Developed a voice assistant with Twilio, enabling live call handling, real-time transcription, and automated escalation to human agents.
`,
    icon: <CpuIcon />,
  },
]
