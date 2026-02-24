import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PageTransition } from "@/components/layout/page-transition";
import { ThemeProvider } from "@/components/layout/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AcaSaaS | Gestão de Treinos Premium",
  description: "A plataforma definitiva para personal trainers e alunos.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider>
          <main className="min-h-screen max-w-md mx-auto relative overflow-x-hidden border-x border-border/50 bg-background flex flex-col">
            <Header />
            <PageTransition>
              {children}
            </PageTransition>
            <MobileNav />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
