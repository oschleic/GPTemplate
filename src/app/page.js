"use client";

import React, { useState, useEffect } from 'react';
import OutputCard from './components/OutputCard';
import {cardClass, headerClass, bodyClass, inputClass, disabledInputClass, buttonPrimary, buttonSuccess, buttonDanger, buttonSecondary, tagClass, buttonClass} from './components/classes'
import Spinner from './components/spinner';
import SettingsComponent from './components/settings';

import OpenAI from "openai";



const DynamicFormBuilder = () => {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: '', fields: [] });
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [activeForm, setActiveForm] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [lockedFields, setLockedFields] = useState({});
  const [savedForms, setSavedForms] = useState({});
  const [mode, setMode] = useState('build'); // 'build', 'use', or 'view'

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false)
  const [apikey, setApikey] = useState('')

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTemplates = localStorage.getItem('formTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
    
    const savedFormData = localStorage.getItem('savedFormData');
    if (savedFormData) {
      setSavedForms(JSON.parse(savedFormData));
    }
    
    const savedLockedFields = localStorage.getItem('lockedFields');
    if (savedLockedFields) {
      setLockedFields(JSON.parse(savedLockedFields));
    }
    
  }, []);

  // Save templates to localStorage whenever templates change
  useEffect(() => {
    localStorage.setItem('formTemplates', JSON.stringify(templates));
  }, [templates]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('savedFormData', JSON.stringify(savedForms));
  }, [savedForms]);

  // Save locked fields to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lockedFields', JSON.stringify(lockedFields));
  }, [lockedFields]);

  const addField = () => {
    if (newFieldLabel.trim() === '') return;
    
    setCurrentTemplate({
      ...currentTemplate,
      fields: [...currentTemplate.fields, { id: Date.now(), label: newFieldLabel }]
    });
    
    setNewFieldLabel('');
  };

  const removeField = (fieldId) => {
    setCurrentTemplate({
      ...currentTemplate,
      fields: currentTemplate.fields.filter(field => field.id !== fieldId)
    });
  };

  const saveTemplate = () => {
    if (currentTemplate.name.trim() === '' || currentTemplate.fields.length === 0) return;
    
    // Check if we're updating an existing template
    const existingIndex = templates.findIndex(t => t.name === currentTemplate.name);
    
    if (existingIndex >= 0) {
      // Update existing template
      const updatedTemplates = [...templates];
      updatedTemplates[existingIndex] = currentTemplate;
      setTemplates(updatedTemplates);
    } else {
      // Add new template
      setTemplates([...templates, currentTemplate]);
    }
    
    // Reset current template
    setCurrentTemplate({ name: '', fields: [] });
  };

  const selectTemplate = (template) => {
    setCurrentTemplate({ ...template });
  };

  const deleteTemplate = (templateName) => {
    setTemplates(templates.filter(t => t.name !== templateName));
    
    // Also delete any saved forms for this template
    const updatedSavedForms = { ...savedForms };
    delete updatedSavedForms[templateName];
    setSavedForms(updatedSavedForms);
    
    // Also delete locked fields for this template
    const updatedLockedFields = { ...lockedFields };
    delete updatedLockedFields[templateName];  const cardClass = "transition-all duration-200 rounded-xl shadow-lg overflow-hidden border dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300";
  
    const headerClass = "py-4 px-6 flex justify-between items-center dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-800";
  
  const bodyClass = "p-6 dark:text-gray-300 text-gray-700";
  
  const inputClass = "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 bg-white border-gray-300 text-gray-900 focus:ring-blue-400";
  
  const disabledInputClass = "w-full px-4 py-2 rounded-lg border cursor-not-allowed dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 bg-gray-100 border-gray-200 text-gray-500";
  
  const buttonPrimary = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-800 bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400";
  
  const buttonSuccess = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:focus:ring-green-800 bg-green-500 hover:bg-green-600 text-white focus:ring-green-400";
  
  const buttonDanger = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white dark:focus:ring-red-800 bg-red-500 hover:bg-red-600 text-white focus:ring-red-400";
  
  const buttonSecondary = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white dark:focus:ring-gray-900 bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400";
  
  const tagClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-200 bg-blue-100 text-blue-800";
  const buttonClass = "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-800 bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400";
  
  };

  const useTemplate = (template) => {
    setActiveForm(template);
    // Check if there's saved data for this template
    if (savedForms[template.name]) {
      setFormValues(savedForms[template.name]);
    } else {
      setFormValues({});
    }
    
    // Initialize locked fields if none exist
    if (!lockedFields[template.name]) {
      const initialLocks = {};
      template.fields.forEach(field => {
        initialLocks[field.id] = false;
      });
      setLockedFields({
        ...lockedFields,
        [template.name]: initialLocks
      });
    }
    
    setMode('use');
  };

  const viewSavedForm = (template) => {
    setActiveForm(template);
    setFormValues(savedForms[template.name]);
    setMode('view'); // View-only mode
  };

  const handleInputChange = (fieldId, value) => {
    setFormValues({
      ...formValues,
      [fieldId]: value
    });
  };

  const toggleFieldLock = (fieldId) => {
    setLockedFields({
      ...lockedFields,
      [activeForm.name]: {
        ...lockedFields[activeForm.name],
        [fieldId]: !lockedFields[activeForm.name][fieldId]
      }
    });
  };

  const isFieldLocked = (fieldId) => {
    return lockedFields[activeForm?.name]?.[fieldId] || false;
  };

  const saveFormData = () => {
    // Save the current form data
    setSavedForms({
      ...savedForms,
      [activeForm.name]: formValues
    });
    
    // Show a toast or notification that data was saved
    alert(`Form data for "${activeForm.name}" saved successfully!`);
  };

  const deleteSavedForm = (templateName) => {
    const updatedSavedForms = { ...savedForms };
    delete updatedSavedForms[templateName];
    setSavedForms(updatedSavedForms);
    
    // Also reset locked fields
    const updatedLockedFields = { ...lockedFields };
    
    if (updatedLockedFields[templateName]) {
      Object.keys(updatedLockedFields[templateName]).forEach(fieldId => {
        updatedLockedFields[templateName][fieldId] = false;
      });
      setLockedFields(updatedLockedFields);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save only the locked fields
    const lockedValues = {};
    let prompt = "";
    
    Object.keys(formValues).forEach(fieldId => {
      if (isFieldLocked(fieldId)) {
        lockedValues[fieldId] = formValues[fieldId];
      }
      prompt += formValues[fieldId] + " ";
    });
    prompt = prompt.trimEnd();

    setLoading(true)


    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: apikey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
              role: "user",
              content: prompt,
          },
      ],
    });

    setLoading(false);

    setResponse(completion.choices[0].message.content)

    
    // Update the form values to only keep locked fields
    const updatedFormValues = { ...lockedValues };
    setFormValues(updatedFormValues);
    
    // Save the form data (only locked fields)
    setSavedForms({
      ...savedForms,
      [activeForm.name]: updatedFormValues
    });
    
    console.log('Form submitted with values:', updatedFormValues);
    console.log('Cleared fields:', Object.keys(formValues).filter(id => !isFieldLocked(id)));
    
    // Show confirmation
    
    // Go back to builder
    //goBack();
  };

  const goBack = () => {
    setMode('build');
    setResponse('')
    setActiveForm(null);
  };

  // Check if a template has saved data
  const hasSavedData = (templateName) => {
    return savedForms[templateName] !== undefined;
  };



  return (<>
    <div className={`min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-white bg-gray-200 text-gray-900`}>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === 'build' ? 'AI Prompt Template Creator' : 
             mode === 'view' ? `Viewing: ${activeForm?.name}` : 
             `Editing: ${activeForm?.name}`}
          </h1>
        </div>
        
        {mode === 'build' ? (
          <div className="space-y-8">
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
                    <ul className={`rounded-lg overflow-hidden divide-y dark:divide-gray-700 divide-gray-200`}>
                      {currentTemplate.fields.map(field => (
                        <li key={field.id} className={`p-4 flex justify-between items-center dark:bg-gray-700 bg-gray-50`}>
                          <span className="font-medium">{field.label}</span>
                          <button 
                            className={`dark:text-red-400 dark:hover:text-red-300 'text-red-500 hover:text-red-600 transition-colors`}
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
            
            {templates.length > 0 && (
              <div className={cardClass}>
                <div className={headerClass}>
                  <h2 className="text-xl font-semibold">Saved Templates</h2>
                </div>
                <div className={bodyClass}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map(template => (
                      <div key={template.name} onClick={() => useTemplate(template)} className={`p-6 rounded-xl transition-transform hover:scale-102 dark:bg-gray-700 dark:hover:bg-gray-600 hover:cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-200`}>
                        <div className="flex flex-col h-full">
                          <div className="mb-4">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-medium text-lg">{template.name}</h3>
                              {hasSavedData(template.name) && (
                                <span className={tagClass}>Saved Data</span>
                              )}
                            </div>
                            <p className={`text-sm dark:text-gray-400 text-gray-500`}>
                              {template.fields.length} {template.fields.length === 1 ? 'field' : 'fields'}
                            </p>
                          </div>
                          
                          <div className="mt-auto pt-4 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <button 
                                className={`${buttonPrimary} w-full px-3 py-1.5 text-sm`}
                                onClick={() => selectTemplate(template)}
                              >
                                Edit Template
                              </button>
                              <button 
                                className={`${buttonSuccess} w-full px-3 py-1.5 text-sm`}
                                onClick={() => useTemplate(template)}
                              >
                                {hasSavedData(template.name) ? 'Edit Data' : 'Add Data'}
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {hasSavedData(template.name) && (
                                <button 
                                  className={`${buttonSecondary} w-full px-3 py-1.5 text-sm`}
                                  onClick={() => viewSavedForm(template)}
                                >
                                  View Data
                                </button>
                              )}
                              {hasSavedData(template.name) ? (
                                <button 
                                  className={`${buttonDanger} w-full px-3 py-1.5 text-sm`}
                                  onClick={() => deleteSavedForm(template.name)}
                                >
                                  Clear Data
                                </button>
                              ) : (
                                <button 
                                  className={`${buttonDanger} w-full px-3 py-1.5 text-sm`}
                                  onClick={() => deleteTemplate(template.name)}
                                >
                                  Delete
                                </button>
                              )}
                              {hasSavedData(template.name) && (
                                <button 
                                  className={`${buttonDanger} w-full col-span-2 px-3 py-1.5 text-sm`}
                                  onClick={() => deleteTemplate(template.name)}
                                >
                                  Delete Template
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button 
              className={`${buttonSecondary} mb-6`}
              onClick={goBack}
            >
              ← Back to Builder
            </button>
            
            <div className={cardClass}>
              <div className={headerClass}>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{activeForm.name} Form</h2>
                  {mode === 'view' && (
                    <div className={tagClass}>View Only</div>
                  )}
                </div>
              </div>
              <div className={bodyClass}>
                {mode === 'use' ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-2 text-sm">
                      <span className={`dark:text-yellow-300 text-yellow-600 font-medium`}>
                        💡 Tip: Toggle the lock icon to keep field values after submission
                      </span>
                    </div>
                    
                    {activeForm.fields.map(field => (
                      <div key={field.id} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium">{field.label}</label>
                          <button 
                            type="button"
                            className={`p-1 rounded-md transition-colors ${
                              isFieldLocked(field.id) 
                                ? 'dark:text-yellow-300 dark:bg-gray-700 text-yellow-600 bg-yellow-100' 
                                : 'dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => toggleFieldLock(field.id)}
                            title={isFieldLocked(field.id) ? "Unlock field" : "Lock field"}
                          >
                            {isFieldLocked(field.id) ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <div className={`relative ${isFieldLocked(field.id) ? 'ring-2 ring-offset-2 ' + ('dark:ring-yellow-500 ring-yellow-400') : ''}`}>
                          <textarea  
                            type="text" 
                            className={inputClass}
                            value={formValues[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                          />
                          {isFieldLocked(field.id) && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className={'dark:text-yellow-300 text-yellow-600'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </div>
                          )}
                        </div>
                        {isFieldLocked(field.id) && (
                          <p className="mt-1 text-xs font-medium" style={{ color: '#FCD34D' }}>
                            This field will be preserved after submission
                          </p>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex space-x-4 pt-4">
                      <button 
                        type="submit"
                        className={buttonSuccess}
                      >
                        Submit Form
                      </button>
                      <div className="text-sm flex items-center">
                        <span>* Unlocked fields will be cleared on submit</span>
                      </div>
                    </div>
                    {response ? <OutputCard cardText={response}/> : (loading ? <div className='flex justify-center'><Spinner/></div> : <></>)}
                  </form>
                ) : (
                  <div className="space-y-6">
                    {activeForm.fields.map(field => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium mb-2">{field.label}</label>
                        <input 
                          type="text" 
                          className={disabledInputClass}
                          value={formValues[field.id] || ''}
                          disabled
                        />
                      </div>
                    ))}
                    
                    <div className="flex space-x-4">
                      <button 
                        className={buttonPrimary}
                        onClick={() => useTemplate(activeForm)}
                      >
                        Edit Data
                      </button>
                      <button 
                        className={buttonDanger}
                        onClick={() => {
                          deleteSavedForm(activeForm.name);
                          goBack();
                        }}
                      >
                        Delete Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <SettingsComponent apikey={apikey} setApikey={setApikey}/>
</>
  );
};

export default DynamicFormBuilder;