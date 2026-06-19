import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        merah: "#c8102e",
      },
    },
  },
  plugins: [],
};
export default config;
```eof

### 2. Perbaiki `app/globals.css` (Gunakan standar yang pasti jalan)
1. Klik folder `app` -> klik `globals.css` -> klik **Edit** (ikon pensil).
2. Hapus semua isi lama, ganti dengan ini:

```css:app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-slate-50 text-slate-800;
}
```eof

### 3. Periksa `app/layout.tsx` (Pastikan sudah benar)
Jika sudah di-edit sebelumnya, pastikan isinya seperti ini (ini versi yang paling aman):

```typescript:app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pekan Kemerdekaan DISBUDPAR Jatim 2026",
  description: "Papan skor resmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
```eof

---
