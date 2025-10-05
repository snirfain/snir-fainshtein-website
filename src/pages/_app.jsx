import React from 'react';
import { EditModeProvider } from '../components/EditModeProvider';

export default function App({ Component, pageProps }) {
  return (
    <EditModeProvider>
      <Component {...pageProps} />
    </EditModeProvider>
  );
}