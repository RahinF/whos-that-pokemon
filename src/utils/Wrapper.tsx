import { GlobalContextProvider } from '@/context/GlobalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
export const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <GlobalContextProvider>{children}</GlobalContextProvider>
  </QueryClientProvider>
);
