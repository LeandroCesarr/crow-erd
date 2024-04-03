import { ReactNode } from 'react';
import { RecoilProvider } from '@/components/common/RecoilProvider';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { LatestUpdates } from '@/components/common/LatestUpdatesDialog';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RecoilProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RecoilProvider>

        <LatestUpdates />
      </body>
    </html>
  );
}
