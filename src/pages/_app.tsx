import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { ReactFlowProvider } from 'reactflow';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <ReactFlowProvider>
          <Component {...pageProps} />
        </ReactFlowProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
