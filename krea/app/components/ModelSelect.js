"use client"

import React, { useState } from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, CircleCheck } from "lucide-react"
import { editModels } from "../../data/models.js"

export default function ModelSelect() {
  const [selectedModel, setSelectedModel] = useState(() => {
    return editModels.find(model => model.id === 'flux-kontext-dev') || null
  })

  const handleModelSelect = (model) => {
    setSelectedModel(model)
  }

  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="group hover:bg-gray-600 bg-zinc-900 flex items-center justify-between rounded-2xl px-6 py-4 text-left font-semibold text-white backdrop-blur-2xl cursor-pointer transition-colors">
          <span className="text-zinc-400 mr-1">Model</span>
          <span className="text-base font-bold">{selectedModel ? selectedModel.name : "Models"}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-primary-900/90 border-primary-700 backdrop-blur-2xl max-h-[75vh] overflow-y-auto scrollbar-hide" align="start">
        <div className="space-y-3">
          {editModels.map((model) => (
            <div 
              key={model.id} 
              className={`py-2 hover:bg-gray-600/70 px-3 rounded text-white transition-colors cursor-pointer ${
                selectedModel?.id === model.id ? 'bg-primary-700/50' : ''
              }`}
              onClick={() => handleModelSelect(model)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-lg mb-1">{model.name}</div>
                  <div className="text-xs text-gray-300 leading-relaxed mb-2">{model.description}</div>
                  <div className="flex flex-wrap gap-1">
                    {model.capabilities.map((capability) => (
                      <Badge key={capability} variant="secondary" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedModel?.id === model.id && (
                  <CircleCheck className="h-4 w-4 text-white fill-green-500 ml-2 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
