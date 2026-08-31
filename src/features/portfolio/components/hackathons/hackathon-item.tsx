import { format } from "date-fns"
import { LinkIcon, TrophyIcon } from "lucide-react"

import { IconTile } from "@/components/ui/icon-tile"
import { Tag } from "@/components/ui/tag"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Separator } from "@/components/base/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { GitHubIcon } from "@/components/icons"
import type { Hackathon } from "@/features/portfolio/types/hackathons"

export function HackathonItem({
  className,
  hackathon,
}: {
  className?: string
  hackathon: Hackathon
}) {
  return (
    <Collapsible className={className} defaultOpen={false}>
      <div className="group/hackathon flex items-center hover:bg-accent-muted">
        <IconTile className="mx-4">
          <TrophyIcon />
        </IconTile>

        <div className="flex-1 border-l border-dashed border-line">
          <div className="flex w-full items-center gap-2 p-4 pr-2 text-left">
            <CollapsibleTrigger className="flex flex-1 cursor-pointer flex-col text-left outline-none">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {hackathon.name}
              </h3>

              <dl className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                <div>
                  <dt className="sr-only">Prize</dt>
                  <dd className="font-medium text-foreground">
                    {hackathon.prize}
                  </dd>
                </div>

                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                  aria-hidden
                />

                <div>
                  <dt className="sr-only">Date</dt>
                  <dd>
                    <time dateTime={new Date(hackathon.date).toISOString()}>
                      {format(new Date(hackathon.date), "MM.yyyy")}
                    </time>
                  </dd>
                </div>

                {hackathon.organizer && (
                  <>
                    <Separator
                      className="data-vertical:h-4 data-vertical:self-center"
                      orientation="vertical"
                      aria-hidden
                    />
                    <div>
                      <dt className="sr-only">Organizer</dt>
                      <dd>{hackathon.organizer}</dd>
                    </div>
                  </>
                )}
              </dl>
            </CollapsibleTrigger>

            {hackathon.project.github && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={hackathon.project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open source code on GitHub"
                    >
                      <GitHubIcon className="pointer-events-none size-4" />
                    </a>
                  }
                />
                <TooltipContent>
                  <p>Source code</p>
                </TooltipContent>
              </Tooltip>
            )}

            {hackathon.project.link && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={hackathon.project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open project demo"
                    >
                      <LinkIcon className="pointer-events-none size-4" />
                    </a>
                  }
                />
                <TooltipContent>
                  <p>Live demo</p>
                </TooltipContent>
              </Tooltip>
            )}

            <CollapsibleTrigger className="shrink-0 cursor-pointer text-muted-foreground [&_svg]:size-4">
              <CollapsibleChevronsUpDownIcon duration={0.15} />
            </CollapsibleTrigger>
          </div>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4 text-sm">
          <div>
            <h4 className="mb-1 font-medium text-foreground">
              Problem statement
            </h4>
            <p className="leading-relaxed text-muted-foreground">
              {hackathon.problemStatement}
            </p>
          </div>

          <div>
            <h4 className="mb-1 font-medium text-foreground">
              Solution: {hackathon.project.title}
            </h4>
            <p className="mb-2.5 leading-relaxed text-muted-foreground">
              {hackathon.project.description}
            </p>
            {Array.isArray(hackathon.project.techStack) &&
              hackathon.project.techStack.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {hackathon.project.techStack.map((tech) => (
                    <li key={tech} className="flex">
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              )}
          </div>

          {hackathon.experience && (
            <div>
              <h4 className="mb-1 font-medium text-foreground">
                Experience & learnings
              </h4>
              <p className="leading-relaxed text-muted-foreground">
                {hackathon.experience}
              </p>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
