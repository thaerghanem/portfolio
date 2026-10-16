import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thaer Ghanem | ثائر غانم",
  description: "Flutter, Next.js and Node.js Developer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#020f1b] text-white">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}