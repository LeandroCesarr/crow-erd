import { ReactNode } from 'react';
import { RecoilProvider } from '@/components/common/RecoilProvider';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
