import { Match } from "@/lib/sheets";

// Warna badge berdasarkan status
function statusStyle(s: string) {
  const v = s.toLowerCase();
  if (v.includes("selesai")) return "bg-green-100 text-green-700";
  if (v.includes("berlangsung") || v.includes("main"))
    return "bg-yellow-100 text-yellow-700";
  return "bg-slate-100 text-slate-500";
}

const ICON: Record<string, string> = {
  L01: "🎤",
  L02: "🏐",
  L03: "🏸",
  L04: "🏃",
};

export default function Schedule({ data }: { data: Match[] }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-[var(--merah)] sm:text-3xl">
        📅 Jadwal & Cabang Lomba
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((m) => (
          <div
            key={m.kode}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-3 text-4xl">{ICON[m.kode] ?? "🎯"}</div>
            <h3 className="text-lg font-bold text-slate-800">{m.nama}</h3>
            <p className="mt-1 text-sm text-slate-500">📍 {m.lokasi}</p>
            <p className="text-sm text-slate-500">🕒 {m.jadwal}</p>
            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${statusStyle(
                m.status
              )}`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
