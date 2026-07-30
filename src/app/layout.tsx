import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Nigeria Story | Guinness World Record Project",
  description: "Walk through Nigeria itself. Join Adetunwase Adenle's 5th Guinness World Record attempt. Every Nigerian has a story worth animating.",
  keywords: "Nigeria, Guinness World Record, Animation, Adetunwase Adenle, Culture, Lagos, Danfo",
  openGraph: {
    title: "The Nigeria Story | Guinness World Record Project",
    description: "An interactive, animated journey celebrating Nigerian culture, history, and stories.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} antialiased custom-cursor-active bg-[#0A0A0A] text-white`}>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}
