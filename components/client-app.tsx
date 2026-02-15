"use client";
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const NoSsr = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})