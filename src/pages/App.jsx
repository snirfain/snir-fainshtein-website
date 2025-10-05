import React from 'react';
import { EditModeProvider } from '../components/EditModeProvider';

export default function App({ children }) {
  return (
    <EditModeProvider>
      {children}
    </EditModeProvider>
  );
}