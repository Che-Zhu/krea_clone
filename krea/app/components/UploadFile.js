'use client';

import { useState, useRef } from 'react';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
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