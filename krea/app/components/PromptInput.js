'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Helper functions for localStorage management
const MODIFY_HISTORY_KEY = 'modify_history';

const saveToModifyHistory = async (file, prompt) => {
  try {
    if (!file) return null;

    // Convert file to base64 for storage
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => {
        const modifyData = {
          id: Date.now() + Math.random(), // Unique ID
          name: file.name,
          size: file.size,
          type: file.type,
          data: reader.result, // Base64 data
          prompt: prompt,
          modifiedAt: new Date().toISOString(),
          timestamp: Date.now()
        };
        
        // Get existing modify history from localStorage
        const existingHistory = JSON.parse(localStorage.getItem(MODIFY_HISTORY_KEY) || '[]');
        
        // Add new entry to the beginning of the array
        const updatedHistory = [modifyData, ...existingHistory];
        
        // Keep only the last 20 modifications to prevent localStorage from getting too large
        const limitedHistory = updatedHistory.slice(0, 20);
        
        // Save to localStorage
        localStorage.setItem(MODIFY_HISTORY_KEY, JSON.stringify(limitedHistory));
        
        resolve(modifyData);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error saving to modify history:', error);
    return null;
  }
};

export default function PromptInput({ onGenerate, currentFile }) {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      setIsGenerating(true);
      setProgress(0);
      
      // Clear the textarea immediately
      const currentPrompt = prompt.trim();
      setPrompt('');
      
      // Save current image to modify history before generating
      if (currentFile) {
        try {
          const savedData = await saveToModifyHistory(currentFile, currentPrompt);
          console.log('Saved to modify history:', savedData);
          
          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('fileModified', { detail: savedData }));
        } catch (error) {
          console.error('Failed to save to modify history:', error);
        }
      }
      
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 5; // Increment by 5% every 100ms for 2 seconds total
        });
      }, 100);
      
      // Call the original onGenerate callback
      if (onGenerate) {
        onGenerate(currentPrompt);
      }
      
      // Reset generating state after 2 seconds
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 2000);
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
      {/* Progress bar - only show when generating */}
      {isGenerating && (
        <div className="w-full mb-2">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-gray-400 mt-1 text-center">Generating... {Math.round(progress)}%</p>
        </div>
      )}
      
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
              disabled={isGenerating}
            />
          </div>

          {/* Grid icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-full w-20 bg-zinc-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Need inspiration? Try a preset</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex flex-col h-full w-30">
            {/* Tab indicators - takes 1/5 of space */}
            <div className="flex-none flex items-center justify-center w-full">
              <ToggleGroup
                type="single"
                variant="outline"
                value={activeTab}
                onValueChange={(value) => {
                  if (value) setActiveTab(value);
                }}
                className="grid w-full grid-cols-2 h-8"
              >
                <ToggleGroupItem 
                  value="1" 
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium h-6 px-2 data-[state=on]:bg-white data-[state=on]:text-black"
                >
                  1
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="2" 
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2 data-[state=on]:bg-white data-[state=on]:text-black"
                >
                  2
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {/* Generate button - takes 4/5 of space */}
            <div className="flex-1 flex items-center justify-center w-full">
              <Button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className="w-full h-full gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
                {isGenerating ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Export helper functions for use in other components
export { MODIFY_HISTORY_KEY };
