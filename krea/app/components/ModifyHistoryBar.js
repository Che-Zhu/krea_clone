import React, { useState, useEffect } from 'react';
import { MODIFY_HISTORY_KEY } from './PromptInput';

const ModifyHistoryBar = ({ className = '', onItemSelect }) => {
  const [modifyHistory, setModifyHistory] = useState([]);

  useEffect(() => {
    // Load modify history from localStorage on component mount
    const loadModifyHistory = () => {
      try {
        const history = JSON.parse(localStorage.getItem(MODIFY_HISTORY_KEY) || '[]');
        setModifyHistory(history);
      } catch (error) {
        console.error('Error loading modify history:', error);
        setModifyHistory([]);
      }
    };

    loadModifyHistory();

    // Listen for storage changes to update the list when new modifications are added
    const handleStorageChange = () => {
      loadModifyHistory();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when modifications are added in the same tab
    window.addEventListener('fileModified', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('fileModified', handleStorageChange);
    };
  }, []);

  const handleItemClick = (modifyData) => {
    // Convert base64 back to File object for reuse
    try {
      const byteCharacters = atob(modifyData.data.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], modifyData.name, { type: modifyData.type });
      
      if (onItemSelect) {
        onItemSelect(file, modifyData);
      }
    } catch (error) {
      console.error('Error converting modify data:', error);
    }
  };

  const formatModifyTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`flex flex-col w-48 bg-zinc-900 p-2 rounded-lg ${className} mr-2`}>
      {modifyHistory.length === 0 ? (
        <div className="text-gray-500 text-xs text-center py-4">
          No modifications yet
        </div>
      ) : (
        <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
          {modifyHistory.slice(0, 6).map((modifyData) => (
            <div
              key={modifyData.id}
              onClick={() => handleItemClick(modifyData)}
              className="cursor-pointer group relative"
              title={`${modifyData.name} - ${modifyData.prompt} - ${formatModifyTime(modifyData.timestamp)}`}
            >
              <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-800 border border-gray-700 hover:border-gray-500 transition-colors">
                {modifyData.type.startsWith('image/') ? (
                  <img
                    src={modifyData.data}
                    alt={modifyData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    FILE
                  </div>
                )}
              </div>
              
              {/* Hover tooltip - positioned to not cause overflow */}
              <div className="absolute right-0 top-16 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-48">
                <div className="font-medium truncate">{modifyData.name}</div>
                <div className="text-gray-300 truncate">"{modifyData.prompt}"</div>
                <div className="text-gray-400">{formatModifyTime(modifyData.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModifyHistoryBar;
