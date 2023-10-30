'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="bottom-center" />
      {children}
    </>
  );
}
export default ClientProvider;
