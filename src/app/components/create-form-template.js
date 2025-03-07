import { bodyClass, buttonSuccess, cardClass, headerClass, inputClass } from "./classes"



export default CreateFormTemplate = ({darkMode, currentTemplate, setCurrentTemplate, newFieldLabel, setNewFieldLabel, addField}) =>{
    return (
        <div className={cardClass}>
        <div className={headerClass}>
          <h2 className="text-xl font-semibold">Create Form Template</h2>
        </div>
        <div className={bodyClass}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Template Name</label>
            <input 
              type="text" 
              className={inputClass}
              value={currentTemplate.name}
              onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
              placeholder="Enter template name"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Add Field</label>
            <div className="flex">
              <input 
                type="text" 
                className={`${inputClass} rounded-r-none`}
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                placeholder="Enter field label"
                onKeyPress={(e) => e.key === 'Enter' && addField()}
              />
              <button 
                className={`${buttonPrimary} rounded-l-none`}
                onClick={addField}
              >
                Add Field
              </button>
            </div>
          </div>
          
          {currentTemplate.fields.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Current Fields</h3>
              <ul className={`rounded-lg overflow-hidden divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {currentTemplate.fields.map(field => (
                  <li key={field.id} className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <span className="font-medium">{field.label}</span>
                    <button 
                      className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'} transition-colors`}
                      onClick={() => removeField(field.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            className={`${buttonSuccess}`}
            onClick={saveTemplate}
            disabled={currentTemplate.name.trim() === '' || currentTemplate.fields.length === 0}
          >
            Save Template
          </button>
        </div>
      </div>
    )
}