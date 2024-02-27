import { RecoilRoot } from 'recoil';
import { ErdEditor } from '@/components/editor/erd';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Crow ERD</title>
      </Head>
      <main className="h-screen bg-background text-foreground">
        <RecoilRoot>
          <ErdEditor />
        </RecoilRoot>
      </main>
    </>
  );
}
