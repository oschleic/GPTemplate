import React, { useState } from 'react';
import { Settings } from 'lucide-react';



const SettingsComponent = ({apikey, setApikey, modalOpen, setModalOpen}) => {
  // Define style classes
  const cardClass = "transition-all duration-200 rounded-xl shadow-lg overflow-hidden border dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300";
  const headerClass = "py-4 px-6 flex justify-between items-center dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-800";
  const bodyClass = "p-6 dark:text-gray-300 text-gray-700";
  const inputClass = "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 bg-white border-gray-300 text-gray-900 focus:ring-blue-400";
  const buttonPrimary = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-800 bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400";
  const buttonSecondary = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white dark:focus:ring-gray-900 bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400";

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false)
  };

  return (
    <>
      {/* Settings button positioned in top right */}
      <button 
        onClick={openModal}
        className="fixed top-4 right-4 p-2 rounded-full dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800 transition-all transform hover:scale-105"
        aria-label="Settings"
      >
        <Settings size={24} />
      </button>

      {/* Modal overlay - only shown when modalOpen is true */}
      {modalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal */}
          <div className={`${cardClass} w-full max-w-md mx-4`}>
            {/* Modal header */}
            <div className={headerClass}>
              <h2 className="text-xl font-semibold">Settings</h2>
              <button 
                onClick={closeModal}
                className="dark:text-gray-300 dark:hover:text-white text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            {/* Modal content */}
            <div className={bodyClass}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">OpenAI API key</label>
                  <input 
                    type="password" 
                    className={inputClass}
                    value={apikey}
                    onChange={(e) => setApikey(e.target.value)}
                    placeholder="Enter your api key"
                  />
                </div>
            </div>
            
            {/* Modal footer */}
            <div className="flex justify-end p-4 border-t dark:border-gray-700 border-gray-300">
              <button 
                onClick={closeModal}
                className={`${buttonSecondary} mr-2`}
              >
                Cancel
              </button>
              <button 
                onClick={closeModal}
                className={buttonPrimary}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default SettingsComponent;