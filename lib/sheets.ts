import Papa from "papaparse";

/**
 * ============================================================
 *  PUSAT KONEKSI & KALKULASI DATA
 *  Semua logika "penjumlahan" ada di sini, BUKAN di Sheets.
 * ============================================================
 */

// ID Sheet diambil dari .env.local (jangan hardcode di sini)
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID ?? "";

// 🔧 UBAH: Sesuaikan nama TAB/SHEET di bawah dengan nama asli di file Anda
export const SHEET_NAMES = {
  klasemen: "HASIL",        // Tab berisi jumlah medali mentah per tim
  jadwal: "DAFTAR_LOMBA",   // Tab berisi 4 lomba & statusnya
  dashboard: "DASHBOARD",   // Tab berisi budget & progres divisi
};

// Sistem poin medali (sesuai aturan Anda)
export const MEDAL_POINTS = { emas: 5, perak: 3, perunggu: 1, partisipasi: 0 };

/** Membuat URL CSV mentah dari Google Sheets */
function csvUrl(sheetName: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName
  )}`;
}

/**
 * Mengambil 1 tab sebagai array baris (teks mentah).
 * revalidate: 60 -> inilah yang membuat web AMAN dari rate-limit.
 */
async function fetchSheet(sheetName: string): Promise<Record<string, string>[]> {
  const res = await fetch(csvUrl(sheetName), {
    next: { revalidate: 60 }, // cache 60 detik di server Vercel
  });
  if (!res.ok) return []; // kalau gagal, jangan crash -> tampilkan kosong
  const csvText = await res.text();
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data;
}

/** Helper: ubah teks "Rp 1.200.000" / "1200000" / "12,5" -> angka asli */
export function toNumber(raw?: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^0-9.-]/g, "").replace(/\.(?=\d{3}\b)/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

/* ================= KALKULASI KLASEMEN ================= */
export type TeamScore = {
  tim: string;
  emas: number;
  perak: number;
  perunggu: number;
  poin: number;
  rank: number;
};

/**
 * Mengambil jumlah medali mentah, lalu MENGHITUNG poin di JS.
 * 🔧 UBAH: nama kolom "Tim", "Emas", "Perak", "Perunggu"
 *    agar sama persis dengan header di tab Anda.
 */
export async function getLeaderboard(): Promise<TeamScore[]> {
  const rows = await fetchSheet(SHEET_NAMES.klasemen);

  const scored = rows
    .filter((r) => (r["Tim"] ?? "").trim() !== "") // buang baris kosong/error
    .map((r) => {
      const emas = toNumber(r["Emas"]);
      const perak = toNumber(r["Perak"]);
      const perunggu = toNumber(r["Perunggu"]);
      // Inilah pengganti rumus Sheets yang error:
      const poin =
        emas * MEDAL_POINTS.emas +
        perak * MEDAL_POINTS.perak +
        perunggu * MEDAL_POINTS.perunggu;
      return { tim: r["Tim"].trim(), emas, perak, perunggu, poin };
    });

  // Urutkan: poin tertinggi dulu; jika seri, emas terbanyak menang
  scored.sort((a, b) => b.poin - a.poin || b.emas - a.emas);

  return scored.map((t, i) => ({ ...t, rank: i + 1 }));
}

/* ================= JADWAL / LOMBA ================= */
export type Match = {
  kode: string;
  nama: string;
  jadwal: string;
  lokasi: string;
  status: string;
};

/** 🔧 UBAH: nama kolom sesuai header tab DAFTAR_LOMBA Anda */
export async function getSchedule(): Promise<Match[]> {
  const rows = await fetchSheet(SHEET_NAMES.jadwal);
  return rows
    .filter((r) => (r["ID"] ?? "").trim() !== "")
    .map((r) => ({
      kode: r["ID"]?.trim() ?? "",
      nama: r["Lomba"]?.trim() ?? "",
      jadwal: r["Tanggal"]?.trim() ?? "-",
      lokasi: r["Venue"]?.trim() ?? "-",
      status: (r["Status"]?.trim() || "Belum Mulai"),
    }));
}

/* ================= DASHBOARD DIVISI ================= */
export type Division = {
  divisi: string;
  budget: number;
  totalTugas: number;
  selesai: number;
  progres: number; // 0-100, dihitung di JS (pengganti COUNTIF error)
};

/**
 * 🔧 UBAH: nama kolom sesuai tab DASHBOARD Anda.
 * Daripada pakai COUNTIF(G7:G,"Selesai") yang error,
 * kita ambil angka mentah "Total Tugas" & "Tugas Selesai" lalu hitung sendiri.
 */
export async function getDashboard(): Promise<{
  divisions: Division[];
  totalBudget: number;
  avgProgress: number;
}> {
  const rows = await fetchSheet(SHEET_NAMES.dashboard);

  const divisions = rows
    .filter((r) => (r["Divisi"] ?? "").trim() !== "")
    .map((r) => {
      const totalTugas = toNumber(r["Total Tugas"]);
      const selesai = toNumber(r["Tugas Selesai"]);
      const progres =
        totalTugas > 0 ? Math.round((selesai / totalTugas) * 100) : 0;
      return {
        divisi: r["Divisi"].trim(),
        budget: toNumber(r["Budget"]),
        totalTugas,
        selesai,
        progres,
      };
    });

  const totalBudget = divisions.reduce((s, d) => s + d.budget, 0);
  const avgProgress =
    divisions.length > 0
      ? Math.round(divisions.reduce((s, d) => s + d.progres, 0) / divisions.length)
      : 0;

  return { divisions, totalBudget, avgProgress };
}

/** Format angka -> "Rp 12.079.356" */
export const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
