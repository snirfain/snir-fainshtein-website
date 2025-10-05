import React, { useState, useEffect } from 'react';
import { useEditMode } from './EditModeProvider';

export const EditableText = ({ id, defaultText, tag = 'p' }) => {
  const { isEditMode, updateContent, editedContent } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText || '');
  
  useEffect(() => {
    // עדכון הטקסט אם יש תוכן ערוך קיים
    if (editedContent && editedContent[id]) {
      setText(editedContent[id]);
    }
  }, [editedContent, id]);
  
  const handleClick = () => {
    if (isEditMode) {
      setIsEditing(true);
    }
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    if (text !== defaultText) {
      updateContent(id, text);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };
  
  if (!isEditMode) {
    return React.createElement(tag, { className: 'editable' }, text);
  }
  
  if (isEditing) {
    // תיבת טקסט לעריכה
    return (
      <textarea
        autoFocus
        className="border-2 border-blue-500 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  }
  
  // טקסט עם הדגשה במצב עריכה
  return React.createElement(
    tag,
    {
      className: 'editable border-dashed border-2 border-blue-300 hover:border-blue-500 p-1 cursor-pointer',
      onClick: handleClick,
    },
    text
  );
};