"use client"

import { useState } from "react"
import { compareDesc } from "date-fns"

import { CollapsibleList } from "@/components/collapsible-list"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { AWARDS } from "@/features/portfolio/data/awards"
import type { AwardCategory } from "@/features/portfolio/types/awards"

import { AwardItem } from "./award-item"

const SORTED_AWARDS = [...AWARDS].sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date))
})

const ID = "awards"

export function Awards() {
  const [activeTab, setActiveTab] = useState<"all" | AwardCategory>("all")

  const filteredAwards = SORTED_AWARDS.filter((award) => {
    if (activeTab === "all") return true
    return award.category === activeTab
  })

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Awards</a>
          <PanelTitleSup>({filteredAwards.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-line bg-muted/20 px-4 py-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`cursor-pointer rounded px-2.5 py-1 font-medium transition-colors ${
            activeTab === "all"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-accent-muted hover:text-foreground"
          }`}
        >
          All ({AWARDS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("hackathon")}
          className={`cursor-pointer rounded px-2.5 py-1 font-medium transition-colors ${
            activeTab === "hackathon"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-accent-muted hover:text-foreground"
          }`}
        >
          Hackathons ({AWARDS.filter((a) => a.category === "hackathon").length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("competitive-programming")}
          className={`cursor-pointer rounded px-2.5 py-1 font-medium transition-colors ${
            activeTab === "competitive-programming"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-accent-muted hover:text-foreground"
          }`}
        >
          Competitive Programming (
          {
            AWARDS.filter((a) => a.category === "competitive-programming")
              .length
          }
          )
        </button>
      </div>

      <CollapsibleList
        items={filteredAwards}
        max={6}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <AwardItem award={item} />}
      />
    </Panel>
  )
}
