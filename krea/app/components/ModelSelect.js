"use client"

import React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { editModels } from "../../data/models.js"

export default function ModelSelect() {
  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="group hover:bg-gray-600 bg-gray-800 flex items-center gap-1 rounded-2xl px-6 py-4 text-left font-semibold text-white backdrop-blur-2xl cursor-pointer transition-colors">
          <span className="text-base">Models</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 bg-primary-900/90 border-primary-700 backdrop-blur-2xl" align="start">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold mb-3 text-white">Available Models</h4>
          {editModels.map((model) => (
            <div key={model.id} className="text-sm py-1 hover:bg-primary-800/50 px-2 rounded text-white transition-colors">
              {model.name}
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
