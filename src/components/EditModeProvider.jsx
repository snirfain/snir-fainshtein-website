import React, { createContext, useState, useContext, useEffect } from 'react';

// יצירת Context לניהול מצב העריכה
export const EditModeContext = createContext({
  isEditMode: false,
  setEditMode: () => {},
  editedContent: {},
  updateContent: () => {},
  saveAllChanges: () => {}
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({});
  
  // בדיקה האם המשתמש במצב עריכה בטעינת העמוד
  useEffect(() => {
    const editModeStatus = localStorage.getItem('editMode') === 'true';
    setIsEditMode(editModeStatus);
  }, []);
  
  // עדכון תוכן ספציפי
  const updateContent = (id, content) => {
    setEditedContent(prev => ({
      ...prev,
      [id]: content
    }));
    
    // שמירה אוטומטית
    localStorage.setItem('editedContent', JSON.stringify({
      ...editedContent,
      [id]: content
    }));
  };
  
  // שמירת כל השינויים למאגר תוכן האתר
  const saveAllChanges = () => {
    const siteContent = localStorage.getItem('siteContent');
    if (siteContent) {
      try {
        const parsedContent = JSON.parse(siteContent);
        // עדכון ערכים עם תוכן שנערך
        const updatedContent = applyEdits(parsedContent, editedContent);
        localStorage.setItem('siteContent', JSON.stringify(updatedContent));
        return true;
      } catch (e) {
        console.error('Error saving content:', e);
        return false;
      }
    }
    return false;
  };
  
  // יישום העריכות על התוכן המקורי
  const applyEdits = (original, edits) => {
    // העתקה עמוקה של התוכן המקורי
    const result = JSON.parse(JSON.stringify(original));
    
    // עדכון לפי מפתח, לדוגמה: "home.hero.title"
    Object.entries(edits).forEach(([key, value]) => {
      const parts = key.split('.');
      if (parts.length === 3) {
        const [page, section, field] = parts;
        if (result[page] && result[page][section]) {
          result[page][section][field] = value;
        }
      }
    });
    
    return result;
  };
  
  return (
    <EditModeContext.Provider value={{
      isEditMode,
      setEditMode: (mode) => {
        setIsEditMode(mode);
        localStorage.setItem('editMode', String(mode));
      },
      editedContent,
      updateContent,
      saveAllChanges
    }}>
      {children}
      {isEditMode && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 z-50 flex justify-between items-center">
          <span className="font-bold">מצב עריכה פעיל</span>
          <div className="flex gap-2">
            <button
              onClick={saveAllChanges}
              className="bg-white text-red-600 px-4 py-1 rounded text-sm font-bold"
            >
              שמור שינויים
            </button>
            <button
              onClick={() => {
                setIsEditMode(false);
                localStorage.setItem('editMode', 'false');
                window.location.reload();
              }}
              className="bg-red-700 text-white px-4 py-1 rounded text-sm font-bold"
            >
              צא ממצב עריכה
            </button>
          </div>
        </div>
      )}
      {isEditMode && (
        <div className="pb-12">
          {/* מרווח תחתון למצב עריכה */}
        </div>
      )}
    </EditModeContext.Provider>
  );
};