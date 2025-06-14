import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Items Management App",
  description: "Modern items management application built with Next.js",
};

/**
 * Root Layout Component
 * 
 * Provides the base HTML structure and navigation for the entire application.
 * This layout wraps all pages and provides:
 * - RTL support for Hebrew content
 * - Global navigation with consistent styling
 * - Responsive design
 * - Clean typography with Geist fonts
 * 
 * No state management is handled at this level - each page manages its own state.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        {/* Global Navigation Header */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  ניהול פריטים
                </h1>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  דף הבית
                </a>
                <a
                  href="/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  הוסף פריט חדש
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
