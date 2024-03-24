import { ErdEditor } from '@/components/editor/erd';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crow ERD',
};

export default function Page(): JSX.Element {
  return (
    <main className="h-screen bg-background text-foreground">
      <ErdEditor />
    </main>
  );
}
