import "server-only"

import { unstable_cache } from "next/cache"

import { GITHUB_USERNAME } from "@/config/site"
import type { Activity } from "@/registry/components/contribution-graph"
import { SOCIAL } from "@/features/portfolio/data/social-links"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      userCalendar?: {
        submissionCalendar?: string
      }
      submitStatsGlobal?: {
        acSubmissionNum?: Array<{
          difficulty: string
          count: number
        }>
      }
    }
  }
}

type CodeforcesSubmissionsResponse = {
  status?: string
  result?: Array<{
    verdict?: string
    creationTimeSeconds?: number
    problem?: {
      contestId?: number
      index?: string
    }
  }>
}

type CodeforcesRatingResponse = {
  status?: string
  result?: Array<{
    contestId?: number
    contestName?: string
  }>
}

export type DeveloperActivityData = {
  activities: Activity[]
  stats: {
    githubContributions: number
    solvedProblems: number
    contests: number
    totalActivities: number
  }
}

export const getDeveloperActivity = unstable_cache(
  async (): Promise<DeveloperActivityData> => {
    const leetcodeUsername = SOCIAL.leetcode.handle || "Devanshnair"
    const codeforcesHandle = SOCIAL.codeforces.handle || "devanshnair"

    const [ghRes, lcRes, cfRes, cfRatingRes] = await Promise.allSettled([
      // 1. GitHub Contributions
      fetch(
        `${process.env.GITHUB_CONTRIBUTIONS_API_URL || "https://github-contributions-api.jogruber.de"}/v4/${GITHUB_USERNAME}?y=last`
      ).then(async (res) => {
        if (!res.ok) return null
        return (await res.json()) as GitHubContributionsResponse
      }),

      // 2. LeetCode Submissions & Problems Solved
      fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          Referer: `https://leetcode.com/${leetcodeUsername}/`,
        },
        body: JSON.stringify({
          query: `
            query userCalendarAndStats($username: String!) {
              matchedUser(username: $username) {
                userCalendar {
                  submissionCalendar
                }
                submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }
          `,
          variables: { username: leetcodeUsername },
        }),
      }).then(async (res) => {
        if (!res.ok) return null
        return (await res.json()) as LeetCodeResponse
      }),

      // 3. Codeforces Submissions
      fetch(
        `https://codeforces.com/api/user.status?handle=${codeforcesHandle}&from=1&count=5000`
      ).then(async (res) => {
        if (!res.ok) return null
        return (await res.json()) as CodeforcesSubmissionsResponse
      }),

      // 4. Codeforces Contests
      fetch(
        `https://codeforces.com/api/user.rating?handle=${codeforcesHandle}`
      ).then(async (res) => {
        if (!res.ok) return null
        return (await res.json()) as CodeforcesRatingResponse
      }),
    ])

    // 1. Parse GitHub
    const ghData = ghRes.status === "fulfilled" ? ghRes.value : null
    const ghContributions = ghData?.contributions ?? []
    const githubContributions = ghContributions.reduce(
      (acc, c) => acc + (c.count || 0),
      0
    )

    // 2. Parse LeetCode
    let lcSolvedCount = 0
    const lcDailyMap = new Map<string, number>()
    if (lcRes.status === "fulfilled" && lcRes.value?.data?.matchedUser) {
      const matched = lcRes.value.data.matchedUser
      const allAc = matched.submitStatsGlobal?.acSubmissionNum?.find(
        (s) => s.difficulty === "All"
      )
      lcSolvedCount = allAc?.count || 0

      const calStr = matched.userCalendar?.submissionCalendar || "{}"
      try {
        const cal = JSON.parse(calStr) as Record<string, number>
        for (const [timestampStr, count] of Object.entries(cal)) {
          const d = new Date(parseInt(timestampStr, 10) * 1000)
          const dateKey = d.toISOString().split("T")[0]
          lcDailyMap.set(
            dateKey,
            (lcDailyMap.get(dateKey) || 0) + Number(count)
          )
        }
      } catch {}
    }

    // 3. Parse Codeforces
    let cfSolvedCount = 0
    const cfDailyMap = new Map<string, number>()
    if (cfRes.status === "fulfilled" && cfRes.value?.result) {
      const cfSubs = cfRes.value.result
      const acSubs = cfSubs.filter((s) => s.verdict === "OK")
      const uniqueProblems = new Set(
        acSubs.map((s) => `${s.problem?.contestId}_${s.problem?.index}`)
      )
      cfSolvedCount = uniqueProblems.size

      for (const sub of cfSubs) {
        if (sub.creationTimeSeconds) {
          const d = new Date(sub.creationTimeSeconds * 1000)
          const dateKey = d.toISOString().split("T")[0]
          cfDailyMap.set(dateKey, (cfDailyMap.get(dateKey) || 0) + 1)
        }
      }
    }

    // 4. Parse Codeforces Contests
    let contests = 0
    if (cfRatingRes.status === "fulfilled" && cfRatingRes.value?.result) {
      contests = cfRatingRes.value.result.length
    }

    // Fallbacks if stats were missing
    const solvedProblems = (lcSolvedCount || 194) + (cfSolvedCount || 248)
    if (!contests) contests = 43

    // Merge activities over calendar days
    const activities: Activity[] =
      ghContributions.length > 0
        ? ghContributions.map((gh) => {
            const date = gh.date
            const ghCount = gh.count || 0
            const lcCount = lcDailyMap.get(date) || 0
            const cfCount = cfDailyMap.get(date) || 0
            const totalCount = ghCount + lcCount + cfCount

            let level = 0
            if (totalCount >= 8) level = 4
            else if (totalCount >= 5) level = 3
            else if (totalCount >= 2) level = 2
            else if (totalCount >= 1) level = 1

            return {
              date,
              count: totalCount,
              level,
            }
          })
        : []

    const totalActivities = activities.reduce((acc, a) => acc + a.count, 0)

    return {
      activities,
      stats: {
        githubContributions: githubContributions || 119,
        solvedProblems,
        contests,
        totalActivities: totalActivities || githubContributions || 1274,
      },
    }
  },
  ["developer-unified-activity"],
  { revalidate: 86400 } // Cache for 1 day
)

// Backwards-compatible export
export const getGitHubContributions = unstable_cache(
  async () => {
    const data = await getDeveloperActivity()
    return data.activities
  },
  ["github-contributions"],
  { revalidate: 86400 }
)
