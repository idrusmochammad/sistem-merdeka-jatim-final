"use client";

import { useEffect, useState } from "react";

// 🔧 Target hari kemerdekaan
const TARGET = new Date("2026-08-17T00:00:00+07:00");

export default function Countdown() {
  const [t, setT] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) return setT({ hari: 0, jam: 0, menit: 0, detik: 0 });
      setT({
        hari: Math.floor(diff / 86400000),
        jam: Math.floor((diff / 3600000) % 24),
        menit: Math.floor((diff / 60000) % 60),
        detik: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center rounded-xl bg-white/15 px-3 py-2 backdrop-blur sm:px-5 sm:py-3">
      <span className="text-2xl font-bold tabular-nums sm:text-4xl">
        {String(v).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wider sm:text-xs">{l}</span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-4">
      <Box v={t.hari} l="Hari" />
      <Box v={t.jam} l="Jam" />
      <Box v={t.menit} l="Menit" />
      <Box v={t.detik} l="Detik" />
    </div>
  );
}
