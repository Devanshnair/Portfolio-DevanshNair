import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Devansh",
  lastName: "Nair",
  displayName: "Devansh Nair",
  username: "devanshnair",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Building systems and AI solutions.",
  flipSentences: [
    "Computer Engineering Student.",
    "Full Stack Developer.",
    "Competitive Programmer.",
    "AI Enthusiast.",
  ],
  address: "Mumbai, India",
  phoneNumberB64: "KzkxLTk4Njc3MDUyMjE=", // +91-9867705221 E.164 base64 encoded
  emailB64: "ZGV2YW5zaG5haXIuMDVAZ21haWwuY29t", // devanshnair.05@gmail.com base64 encoded
  website: "https://devanshnair.me",
  jobTitle: "Software Engineer",
  jobs: [
    {
      title: "Ex - Data Analyst Intern",
      company: "Colgate",
      website: "https://www.colgatepalmolive.com",
      experienceId: "colgate",
    },
    {
      title: "Software Engineer | Building Scalable Full-Stack & AI Systems",
    },
  ],
  about: `- I’m Devansh Nair — a Software Engineer passionate about building thoughtful applications and obsessing over the little details that matter.
- Naturally curious about how things work, I like breaking problems down to their fundamentals and working my way up from first principles.
- I learn best by getting my hands dirty — picking up new technologies, experimenting with them, and building something along the way.
`,
  avatar: "/images/avatar.jpg",
  avatarVariants: {
    lightOff: "/images/avatar.jpg",
    lightOn: "/images/avatar.jpg",
    darkOff: "/images/avatar.jpg",
    darkOn: "/images/avatar.jpg",
  },
  ogImage: "/og.png",
  namePronunciationUrl: "",
  timeZone: "Asia/Kolkata",
  keywords: [
    "Devansh Nair",
    "devanshnair",
    "TSEC",
    "Thadomal Shahani",
    "Computer Engineering",
    "AmberFlux",
    "Colgate",
    "Codecell",
    "Software Engineer",
  ],
  dateCreated: "2026-08-17", // YYYY-MM-DD
}
