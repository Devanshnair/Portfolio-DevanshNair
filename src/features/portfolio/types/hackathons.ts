export type Hackathon = {
  id: string
  name: string
  prize: string
  date: string
  organizer?: string
  location?: string
  problemStatement: string
  project: {
    title: string
    description: string
    techStack: string[]
    link?: string
    github?: string
  }
  experience?: string
}
