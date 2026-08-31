import type { Route } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { HACKATHONS } from "@/features/portfolio/data/hackathons"

import { HackathonItem } from "./hackathon-item"

const ID = "hackathons"
const FEATURED_IDS = ["hacksync-26", "need-for-code-4", "codeissance-25"]

export function Hackathons() {
  const featuredHackathons = FEATURED_IDS.map((id) =>
    HACKATHONS.find((h) => h.id === id)
  ).filter((h): h is (typeof HACKATHONS)[number] => Boolean(h))

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Hackathons</a>
          <PanelTitleSup>({HACKATHONS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <ul className="divide-y divide-line">
        {featuredHackathons.map((hackathon) => (
          <li key={hackathon.id}>
            <HackathonItem hackathon={hackathon} />
          </li>
        ))}
      </ul>

      {HACKATHONS.length > featuredHackathons.length && (
        <div className="screen-line-top flex justify-center py-4">
          <Button
            className="gap-2 pr-2.5 pl-3 shadow-[inset_0_0_1px] shadow-foreground/20"
            variant="secondary"
            size="sm"
            nativeButton={false}
            render={<Link href={"/hackathons" as Route} />}
          >
            All hackathons
            <ArrowRightIcon />
          </Button>
        </div>
      )}
    </Panel>
  )
}
