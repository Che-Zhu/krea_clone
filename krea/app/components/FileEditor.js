'use client';

import { useState, useEffect } from 'react';
import FileDisplay from './FileDisplay';
import PromptInput from './PromptInput';
import UploadHistoryBar from './UploadHistoryBar';

export default function FileEditor({ file, onClose, onFileSelect, onAddNew }) {
  const [currentFile, setCurrentFile] = useState(file);

  // Update currentFile when the prop file changes
  useEffect(() => {
    setCurrentFile(file);
  }, [file]);

  const handleHistoryFileSelect = (selectedFile) => {
    // Update the currently displayed file
    setCurrentFile(selectedFile);
    
    // Also pass the selected file to the parent component if needed
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  const handleAddNew = () => {
    // Handle add new file action - could navigate back to upload or trigger file picker
    if (onAddNew) {
      onAddNew();
    } else {
      // Default behavior: go back to upload screen
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className='w-full h-screen relative'>
      <UploadHistoryBar 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" 
        onFileSelect={handleHistoryFileSelect}
        onAddNew={handleAddNew}
      />
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <FileDisplay file={currentFile} />
        {/* Additional components can be added here */}
        <PromptInput onGenerate={(prompt) => console.log('Generated prompt:', prompt)} />
      </div>
    </div>
  );
}