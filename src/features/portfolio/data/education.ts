import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "tsec",
    school: "Thadomal Shahani Engineering College, Mumbai",
    degree: "Bachelor of Engineering",
    fieldOfStudy: "Computer Engineering",
    period: {
      start: "08.2023",
      end: "Present",
    },
    description: `- Current CGPA: 9.21.
- Senior Committee Member at TSEC Codecell (2024 - 2026), involved in organizing TSEC Hacks '25 & '26 (300+ participants, 10+ cities) and managing competitive programming contests (Weekly Challenges).
- Winner of multiple college and national hackathons (Need For Code 4.0, Codeissance '25, HackSync '26).`,
    skills: [
      "Algorithms",
      "Data Structures",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Distributed Computing",
      "Software Engineering",
      "AI/ML",
      "C++",
      "Java",
      "Python",
    ],
  },
]
