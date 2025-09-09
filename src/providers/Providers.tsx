"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StoreProvider from "./redux";
import { useState, useEffect } from "react";
import { ToastFunction } from "@/components/ui/Toast";
import FetchUserProvider from "./FetchUserProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient inside the component to avoid SSR issues
  console.log("Main layout re rendered");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <FetchUserProvider>{children}</FetchUserProvider>
      </StoreProvider>
      <ToastFunction />
    </QueryClientProvider>
  );
}
