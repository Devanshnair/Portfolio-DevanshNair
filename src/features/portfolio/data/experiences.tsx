import { BriefcaseBusinessIcon, CodeXmlIcon, LineChartIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "colgate",
    companyName: "Colgate Global Business Services",
    companyLogo: "/images/companies/colgate.svg",
    companyWebsite: "https://www.colgatepalmolive.com",
    location: "Mumbai, India",
    locationType: "Hybrid",
    positions: [
      {
        id: "colgate-1",
        title: "Data Analyst",
        employmentPeriod: {
          start: "06.2026",
          end: "08.2026",
        },
        employmentType: "Internship",
        icon: <LineChartIcon />,
        description: `- Developed 4 automation systems, including an LLM-assisted data validation engine, automated reporting workflows, finance analytics dashboards, and an AI-powered Google Chat application.
- Successfully reduced manual administrative effort by ~47% across the target processes.`,
        skills: [
          "Python",
          "Snowflake",
          "BigQuery",
          "Retool",
          "Google Cloud",
          "Google Workspace",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "amberflux",
    companyName: "AmberFlux",
    companyLogo: "/images/companies/amberflux.svg",
    companyWebsite: "https://www.amberflux.com",
    location: "Hyderabad, India",
    locationType: "Remote",
    positions: [
      {
        id: "amberflux-1",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "09.2025",
          end: "02.2026",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description: `- Developed production-scale features across a Dockerized full-stack architecture, independently building a complete Admin Panel spanning frontend and backend.
- Implemented JWT authentication refresh flow using Axios interceptors and request queues and Server-Sent Events (SSE) for real-time updates.
- Integrated complex response parsing and dynamic rendering of AI-generated BRD, DRD, and ADD documents using markdown with mermaid diagram support.`,
        skills: [
          "React",
          "Redux",
          "TanStack",
          "Express",
          "Prisma",
          "Zod",
          "Docker",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "visionx",
    companyName: "VisionX Technologies",
    location: "Mumbai, India",
    locationType: "Hybrid",
    positions: [
      {
        id: "visionx-1",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "06.2024",
          end: "08.2024",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description: `- Worked closely with clients to gather requirements for custom features and functionalities, successfully launching 2 new websites within tight deadlines.
- Worked alongside senior developers to resolve bugs, improve performance, and optimize websites.`,
        skills: [
          "JavaScript",
          "TypeScript",
          "Tailwind CSS",
          "React.js",
          "Next.js",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "freelance",
    companyName: "Freelance",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "freelance-1",
        title: "Web Developer",
        employmentPeriod: {
          start: "12.2024",
          end: "02.2025",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description: `- Collaborated with clients to define technical requirements and deliver complex UI workflows.
- Developed and integrated GSAP-powered micro-interactions and high-performance web animations.
- Achieved ~15% higher user retention rate on client websites through polished visual details.`,
        skills: ["TypeScript", "Tailwind CSS", "GSAP", "React.js"],
      },
    ],
  },
]
