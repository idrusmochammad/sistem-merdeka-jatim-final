import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pekan Kemerdekaan DISBUDPAR Jatim 2026",
  description: "Papan skor & informasi resmi Pekan Kemerdekaan DISBUDPAR Jawa Timur 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
