import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: "Notehub",
  description: "Edit, delete, view notes",
  openGraph: {
    title: "Notehub",
    description: "Edit, delete, view notes",
    url: "https://notehub-public.goit.study/api", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub preview image",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal:  React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
         <TanStackProvider>
          <Header />
          <hr />
          {children}
          {modal}
          <hr />
          <Footer />
        </TanStackProvider>

      </body>
    </html>
  );
}

// Підключіть шрифт Roboto глобально для всього застосунку 
// у файлі app/layout.tsx. 
// Для цього скористайтеся вбудованою підтримкою з next/font/google, 
// обовʼязково вказавши відповідні налаштування 
// (weight, variable, display та subsets).