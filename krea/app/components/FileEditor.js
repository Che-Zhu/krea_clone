'use client';

import FileDisplay from './FileDisplay';
import PromptInput from './PromptInput';

export default function FileEditor({ file, onClose }) {
  return (
    <div className='mb-4'>
      <FileDisplay file={file} />
      {/* Additional components can be added here */}

      <PromptInput onGenerate={(prompt) => console.log('Generated prompt:', prompt)} />
    </div>
  );
}