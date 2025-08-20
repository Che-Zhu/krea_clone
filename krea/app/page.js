'use client';

import { useState } from "react";
import Image from "next/image";
import ModelSelect from "./components/ModelSelect";
import UploadFile from "./components/UploadFile";
import FileEditor from "./components/FileEditor";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCloseEditor = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="fixed bottom-4 left-4 z-50">
        <ModelSelect />
      </div>

      {!selectedFile && <UploadFile onFileSelect={handleFileSelect} />}

      {selectedFile && (
        <FileEditor file={selectedFile} onClose={handleCloseEditor} />
      )}
    </div>
  );
}
