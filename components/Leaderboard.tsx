import { TeamScore } from "@/lib/sheets";

export default function Leaderboard({ data }: { data: TeamScore[] }) {
  const medal = (r: number) =>
    r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : r;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-[var(--merah)] sm:text-3xl">
        🏆 Klasemen Medali
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-[var(--merah)] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Peringkat</th>
              <th className="px-4 py-3 text-left">Tim / Bidang</th>
              <th className="px-3 py-3 text-center">🥇</th>
              <th className="px-3 py-3 text-center">🥈</th>
              <th className="px-3 py-3 text-center">🥉</th>
              <th className="px-4 py-3 text-center">Poin</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr
                key={t.tim}
                className={`border-t border-slate-100 ${
                  t.rank <= 3 ? "bg-red-50 font-semibold" : ""
                }`}
              >
                <td className="px-4 py-3 text-lg">{medal(t.rank)}</td>
                <td className="px-4 py-3">{t.tim}</td>
                <td className="px-3 py-3 text-center">{t.emas}</td>
                <td className="px-3 py-3 text-center">{t.perak}</td>
                <td className="px-3 py-3 text-center">{t.perunggu}</td>
                <td className="px-4 py-3 text-center text-lg font-bold text-[var(--merah)]">
                  {t.poin}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Belum ada data klasemen.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
