import Countdown from "@/components/Countdown";
import Leaderboard from "@/components/Leaderboard";
import Schedule from "@/components/Schedule";
import Dashboard from "@/components/Dashboard";
import { getLeaderboard, getSchedule, getDashboard } from "@/lib/sheets";

// Komponen ini berjalan di SERVER -> data diambil & di-cache di sini
export default async function Home() {
  // Ambil semua data paralel (lebih cepat)
  const [leaderboard, schedule, dashboard] = await Promise.all([
    getLeaderboard(),
    getSchedule(),
    getDashboard(),
  ]);

  return (
    <main>
      {/* ===== HERO SECTION (nuansa Merah-Putih) ===== */}
      <header className="relative overflow-hidden bg-[var(--merah)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:py-24">
          <span className="mb-3 rounded-full bg-white/20 px-4 py-1 text-xs font-medium tracking-wide">
            DISBUDPAR JAWA TIMUR
          </span>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            Pekan Kemerdekaan 2026
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Semarak HUT ke-81 Kemerdekaan Republik Indonesia. Bersatu, Berprestasi,
            Berbudaya.
          </p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-white/80">
              Menuju 17 Agustus 2026
            </p>
            <Countdown />
          </div>
        </div>

        {/* Garis putih pemisah */}
        <div className="h-3 w-full bg-white" />
      </header>

      {/* ===== KONTEN ===== */}
      <Leaderboard data={leaderboard} />
      <Schedule data={schedule} />
      <Dashboard
        divisions={dashboard.divisions}
        totalBudget={dashboard.totalBudget}
        avgProgress={dashboard.avgProgress}
      />

      <footer className="bg-slate-800 py-6 text-center text-sm text-slate-300">
        © 2026 DISBUDPAR Provinsi Jawa Timur · Dibuat untuk Pekan Kemerdekaan
      </footer>
    </main>
  );
}
