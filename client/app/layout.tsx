import type { Metadata } from 'next';

import './globals.css';



export const metadata: Metadata = {
  title: 'Docify',
  description: 'Let us handle your wiki',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body >{children}</body>
    </html>
  );
}
