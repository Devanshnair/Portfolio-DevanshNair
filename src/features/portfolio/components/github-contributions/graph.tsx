"use client"

import { use } from "react"
import { format, parseISO } from "date-fns"
import { LoaderIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/registry/components/contribution-graph"
import type { DeveloperActivityData } from "@/features/portfolio/data/github-contributions"
import { SOCIAL } from "@/features/portfolio/data/social-links"

export function GitHubContributionGraph({
  dataPromise,
}: {
  dataPromise: Promise<DeveloperActivityData>
}) {
  const { activities, stats } = use(dataPromise)

  if (activities.length === 0) {
    return null
  }

  return (
    <figure>
      <ContributionGraph
        className="mx-auto gap-4 py-4"
        data={activities}
        blockSize={12}
        blockMargin={2}
        blockRadius={0}
        aria-label="Developer Activity Graph"
      >
        <ContributionGraphCalendar
          className="px-4 **:data-[slot=month-labels]:text-muted-foreground"
          title="Developer Activity"
          aria-hidden
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger
                render={
                  <g>
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  </g>
                }
              />
              <TooltipContent className="font-sans">
                <p>
                  {activity.count}{" "}
                  {activity.count === 1 ? "activity" : "activities"} on{" "}
                  {format(parseISO(activity.date), "d MMM yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="items-start justify-between px-4 text-sm">
          <ContributionGraphTotalCount>
            {() => (
              <figcaption className="text-pretty tabular-nums">
                <div>
                  <span className="mr-2 tracking-wide text-muted-foreground/80">
                    Fig. 2.
                  </span>
                  <span className="font-medium text-foreground">
                    {stats.githubContributions.toLocaleString("en")}{" "}
                    contributions
                  </span>
                  <span className="text-muted-foreground">, </span>
                  <span className="font-medium text-foreground">
                    {stats.solvedProblems.toLocaleString("en")} solved
                  </span>
                  <span className="text-muted-foreground">, </span>
                  <span className="font-medium text-foreground">
                    {stats.contests.toLocaleString("en")} contests
                  </span>
                  <span className="text-muted-foreground">
                    , {format(parseISO(activities[0].date), "dd.MM.yyyy")} –{" "}
                    {format(
                      parseISO(activities[activities.length - 1].date),
                      "dd.MM.yyyy"
                    )}
                    .
                  </span>
                </div>

                <div className="mt-1 text-muted-foreground">
                  <span>Sources: </span>
                  <a
                    href={SOCIAL.github.href}
                    className="text-foreground link-underline"
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                  <span>, </span>
                  <a
                    href={SOCIAL.leetcode.href}
                    className="text-foreground link-underline"
                    target="_blank"
                    rel="noopener"
                  >
                    LeetCode
                  </a>
                  <span>, </span>
                  <a
                    href={SOCIAL.codeforces.href}
                    className="text-foreground link-underline"
                    target="_blank"
                    rel="noopener"
                  >
                    Codeforces
                  </a>
                  <span>.</span>
                </div>
              </figcaption>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend className="self-start pt-0.5" aria-hidden />
        </ContributionGraphFooter>
      </ContributionGraph>
    </figure>
  )
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
