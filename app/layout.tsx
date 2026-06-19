import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pekan Kemerdekaan DISBUDPAR Jatim 2026",
  description: "Papan skor & informasi resmi Pekan Kemerdekaan DISBUDPAR Jawa Timur 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
