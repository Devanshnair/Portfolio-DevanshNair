import { Suspense } from "react"

import { getDeveloperActivity } from "@/features/portfolio/data/github-contributions"

import { Panel } from "../panel"
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph"

export function GitHubContributions() {
  const activityData = getDeveloperActivity()

  return (
    <Panel className="screen-line-top-none">
      <h2 className="sr-only">Developer Activity</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph dataPromise={activityData} />
      </Suspense>

      <div className="h-px" />
    </Panel>
  )
}
