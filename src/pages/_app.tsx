import dynamic from 'next/dynamic';
import React from 'react';

// Load the SPA only on the client to avoid server-side usage of `window`/`document`.
const NoSSRApp = dynamic(() => import('@/App'), { ssr: false });

export default function MyApp(_: any) {
  return <NoSSRApp />;
}
