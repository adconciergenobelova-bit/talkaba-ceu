import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TalkABA with Nene and Helen | Monthly CEU Events',
  description:
    'Monthly Continuing Education Unit (CEU) events bringing Applied Behavior Analysis to the world. Join our monthly ABA learning series featuring leading international experts.',
  keywords: [
    'ABA',
    'Applied Behavior Analysis',
    'CEU',
    'Continuing Education Unit',
    'BCBA',
    'Behavior Analyst',
    'IBAO',
    'TalkABA',
    'Nigeria',
  ],
  authors: [{ name: 'TalkABA with Nene and Helen' }],
  openGraph: {
    title: 'TalkABA with Nene and Helen | Monthly CEU Events',
    description: 'Bringing Applied Behavior Analysis to the World — Monthly CEU Learning Series',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
