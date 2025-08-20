'use client';

import { useState, useRef } from 'react';

// Helper functions for localStorage management
const STORAGE_KEY = 'uploaded_files_history';

const saveFileToStorage = (file) => {
  try {
    // Convert file to base64 for storage
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => {
        const fileData = {
          id: Date.now() + Math.random(), // Unique ID
          name: file.name,
          size: file.size,
          type: file.type,
          data: reader.result, // Base64 data
          uploadedAt: new Date().toISOString(),
          timestamp: Date.now()
        };
        
        // Get existing files from localStorage
        const existingFiles = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        
        // Add new file to the beginning of the array
        const updatedFiles = [fileData, ...existingFiles];
        
        // Keep only the last 10 files to prevent localStorage from getting too large
        const limitedFiles = updatedFiles.slice(0, 10);
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedFiles));
        
        resolve(fileData);
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error saving file to localStorage:', error);
    return null;
  }
};

const getFilesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Error retrieving files from localStorage:', error);
    return [];
  }
};

export default function UploadFile({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
      
      // Save file to localStorage with timestamp
      try {
        const savedFileData = await saveFileToStorage(file);
        console.log('File saved to localStorage:', savedFileData);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('fileUploaded', { detail: savedFileData }));
      } catch (error) {
        console.error('Failed to save file to localStorage:', error);
      }
      
      // Call the parent callback to pass the file up
      if (onFileSelect) {
        onFileSelect(file);
      }
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="w-80 mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center
          w-full h-120 rounded-lg
          cursor-pointer transition-all duration-200
          hover:bg-gray-700 hover:border-gray-500
          ${isDragOver 
            ? 'border-blue-500 bg-blue-900' 
            : 'border-gray-600 bg-gray-800'
          }
        `}
        style={{ height: '30rem' }}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">Edit</h2>
          <p className="text-center text-gray-300 mb-8 leading-relaxed">
            Rearrange objects in your scene, blend objects from multiple images, place characters, or expand edges.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Upload Image
          </button>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Selected File:</h3>
          <p className="text-sm text-gray-600">{selectedFile.name}</p>
          <p className="text-xs text-gray-500">
            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          {selectedFile.type.startsWith('image/') && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="mt-2 max-w-full h-32 object-cover rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}

// Export helper functions for use in other components
export { getFilesFromStorage, STORAGE_KEY };