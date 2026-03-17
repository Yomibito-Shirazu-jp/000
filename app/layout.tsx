import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'DTP Web Design 総合OS',
  description: 'Adobeの代替となる、自然言語対応の次世代CanvaライクDTP・Webデザイン総合プラットフォーム',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
