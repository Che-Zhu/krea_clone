import React, { useState, useEffect } from 'react';
import { getFilesFromStorage } from './UploadFile';
import { Button } from '@/components/ui/button';

const UploadHistoryBar = ({ className = '', onFileSelect, onAddNew }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Load files from localStorage on component mount
    const loadFiles = () => {
      const files = getFilesFromStorage();
      setUploadedFiles(files);
    };

    loadFiles();

    // Optional: Listen for storage changes to update the list when new files are added
    const handleStorageChange = () => {
      loadFiles();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when files are added in the same tab
    window.addEventListener('fileUploaded', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('fileUploaded', handleStorageChange);
    };
  }, []);

  const handleFileClick = (fileData) => {
    // Convert base64 back to File object for reuse
    try {
      const byteCharacters = atob(fileData.data.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], fileData.name, { type: fileData.type });
      
      if (onFileSelect) {
        onFileSelect(file);
      }
    } catch (error) {
      console.error('Error converting file data:', error);
    }
  };

  const formatUploadTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`flex flex-col w-16 bg-zinc-900 p-2 space-y-2 overflow-hidden ${className} ml-2 rounded-sm`}>
      {/* Add new file button */}
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-md bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        onClick={() => onAddNew && onAddNew()}
        title="Add new file"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Button>

      {/* Separator */}
      <div className="w-8 h-px bg-gray-700 mx-auto"></div>
      
      {uploadedFiles.length === 0 ? (
        <div className="text-gray-500 text-xs text-center py-4">
          No files uploaded yet
        </div>
      ) : (
        uploadedFiles.slice(0, 6).map((fileData) => (
          <div
            key={fileData.id}
            onClick={() => handleFileClick(fileData)}
            className="cursor-pointer group relative"
            title={`${fileData.name} - ${formatUploadTime(fileData.timestamp)}`}
          >
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors">
              {fileData.type.startsWith('image/') ? (
                <img
                  src={fileData.data}
                  alt={fileData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  FILE
                </div>
              )}
            </div>
            
            {/* Hover tooltip - positioned to not cause horizontal overflow */}
            <div className="absolute left-16 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-48 truncate">
              <div className="font-medium truncate">{fileData.name}</div>
              <div className="text-gray-400">{formatUploadTime(fileData.timestamp)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UploadHistoryBar;
