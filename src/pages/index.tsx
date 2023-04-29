import End from '@/components/phases/End';
import Playing from '@/components/phases/Playing';
import Start from '@/components/phases/Start';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import useGlobalContext from '@/context/GlobalContext';
import { LIMIT, OFFSET, fetchAllPokemon } from '@/hooks/usePokemon';
import Head from 'next/head';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchAllPokemon(LIMIT, OFFSET),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const { phase } = useGlobalContext();

  return (
    <>
      <Head>
        <title>Who&apos;s that pokemon?</title>
        <meta
          name="description"
          content="Pokemon Quiz"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="grid min-h-screen place-items-center bg-rose-200 bg-opacity-50">
        <div className="rounded-2xl border bg-white px-14 py-4">
          <h1 className="mt-4 text-2xl">Who&apos;s that pokemon?</h1>
          {phase === 'start' && <Start />}
          {phase === 'playing' && <Playing />}
          {phase === 'end' && <End />}
        </div>
      </main>
    </>
  );
}
