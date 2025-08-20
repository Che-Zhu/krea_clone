'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function PromptInput({ onGenerate }) {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && onGenerate) {
      onGenerate(prompt.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-zinc-900 p-2 w-full max-w-[40vw] mb-4 rounded-lg">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center h-22">
          <div className="flex-1 h-full">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write what you want to change in your image and click generate, or pick a preset and choose from many options!"
              className="w-full h-full bg-zinc-800 text-white placeholder-gray-400 border-zinc-700 focus-visible:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          {/* Grid icon */}
            <button
              type="button"
              className="h-full w-20 flex items-center justify-center text-gray-400 hover:text-white transition-colors bg-zinc-800 rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
              </svg>
          </button>
          
          <div className="flex flex-col h-full w-30">
            {/* Tab indicators - takes 1/5 of space */}
            <div className="flex-1 flex items-center justify-center w-full">
              <ToggleGroup
                type="single"
                value={activeTab}
                onValueChange={setActiveTab}
                className="grid w-full grid-cols-2"
              >
                <ToggleGroupItem 
                  value="1" 
                  variant="outline"
                  className="text-xs font-medium"
                >
                  1
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="2" 
                  variant="outline"
                  className="text-xs"
                >
                  2
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {/* Generate button - takes 4/5 of space */}
            <div className="flex-[4] flex items-center justify-center w-full">
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
