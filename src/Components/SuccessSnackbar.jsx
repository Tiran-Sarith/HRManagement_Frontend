import React, { useState, useEffect } from 'react';

export default function SuccessSnackbar({ open, message, duration = 2000, onClose }) {
  const [isVisible, setIsVisible] = useState(open);
  
  useEffect(() => {
    setIsVisible(open);
    
    let timer;
    if (open) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, duration, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-emerald-500 text-white rounded-lg shadow-lg p-4 flex items-center w-64">
        <div className="mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div className="text-sm font-medium">{message}</div>
      </div>
    </div>
  );
}