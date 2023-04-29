import '@/styles/globals.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { GlobalContextProvider } from '@/context/GlobalContext';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
