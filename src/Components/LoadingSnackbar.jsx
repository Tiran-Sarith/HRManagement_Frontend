import React, { useState, useEffect } from 'react';

export default function LoadingSnackbar({ open, message }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let timer = null;
    
    if (open) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            return 0;
          }
          return prevProgress + 5;
        });
      }, 300);
    } else {
      setProgress(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open]);

  if (!open) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-64">
        <div className="text-emerald-600 mb-2 text-sm font-medium">{message}</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}