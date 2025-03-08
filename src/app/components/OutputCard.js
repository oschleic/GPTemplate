import React, { useState } from 'react';
import { cardClass, headerClass, bodyClass, buttonClass } from './classes';

import { marked } from 'marked';

const OutputCard = ({cardText}) => {
  const [copied, setCopied] = useState(false);


  const text = {__html: marked.parse(cardText)}
  console.log(text)
  
//  
  const copyToClipboard = (e) => {
    e.preventDefault();

    const blobHtml = new Blob([text.__html], { type: "text/html" });

    const data = [new ClipboardItem({
      ["text/html"]: blobHtml,
  })];

    navigator.clipboard.write(data).then(() => {

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };


  
  return (
        <>
        <div className={cardClass}>
          <div className={headerClass}>
            <h2 className="text-xl font-semibold">Text Content</h2>
            <button 
              className={buttonClass}
              onClick={copyToClipboard}
              aria-label="Copy to clipboard"
            >
              <div className="flex items-center">
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </>
                )}
              </div>
            </button>
          </div>
          <div className={bodyClass} dangerouslySetInnerHTML={text}></div>
        </div>
        
        {/* Success toast notification */}
        <div className={`z-100 fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform dark:bg-green-800 dark:text-white bg-green-100 text-green-800 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Copied to clipboard!
          </div>
        </div>
      
    </>
  );
};

export default OutputCard;