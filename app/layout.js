import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SpeaklyAI - AI Voice Agents for Small Business',
  description:
    'Empower your small business with intelligent AI voice agents. Automate customer interactions, boost productivity, and scale your business with SpeaklyAI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
