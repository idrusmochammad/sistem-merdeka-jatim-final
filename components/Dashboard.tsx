import { Division, rupiah } from "@/lib/sheets";

export default function Dashboard({
  divisions,
  totalBudget,
  avgProgress,
}: {
  divisions: Division[];
  totalBudget: number;
  avgProgress: number;
}) {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-6 text-center text-2xl font-bold text-[var(--merah)] sm:text-3xl">
          📊 Dashboard Kepanitiaan
        </h2>

        {}
        {/* Ringkasan atas */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-red-50 p-5 text-center">
            <p className="text-sm text-slate-500">Total Estimasi Budget</p>
            <p className="text-2xl font-bold text-[var(--merah)]">
              {rupiah(totalBudget)}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-5 text-center">
            <p className="text-sm text-slate-500">Jumlah Divisi</p>
            <p className="text-2xl font-bold text-slate-800">
              {divisions.length}
            </p>
          </div>
          <div className="rounded-2xl bg-green-50 p-5 text-center">
            <p className="text-sm text-slate-500">Rata-rata Progres</p>
            <p className="text-2xl font-bold text-green-600">{avgProgress}%</p>
          </div>
        </div>

        {}
        {/* Progres per divisi */}
        <div className="space-y-3">
          {divisions.map((d) => (
            <div key={d.divisi}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{d.divisi}</span>
                <span className="text-slate-500">
                  {d.selesai}/{d.totalTugas} tugas · {rupiah(d.budget)}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[var(--merah)] transition-all"
                  style={{ width: `${d.progres}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
