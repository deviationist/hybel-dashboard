"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { LocaleProvider } from "@/contexts/locale-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { DEFAULT_LOCALE } from "@/lib/config";

const NoSsr = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
  );
  const userLocale = DEFAULT_LOCALE; // TODO: Get from user settings, fallback to browser
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <LocaleProvider value={userLocale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
};

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
