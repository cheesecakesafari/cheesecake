import React from 'react';
import App from '@/App';

// Render the existing SPA `App` inside Next's _app so client-side routing works.
export default function MyApp(_: any) {
  return <App />;
}
