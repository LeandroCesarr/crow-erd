import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/common/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
