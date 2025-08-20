'use client';

import { useState, useEffect } from 'react';

export default function FileDisplay({ file }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded file"
          className="max-w-[66.67vw] max-h-[90vh] object-contain"
        />
      )}
    </div>
  );
}
