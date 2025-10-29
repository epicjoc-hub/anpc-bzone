import { ExclamationTriangleIcon, CheckCircleIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Srl } from "../types";

// Props: srl { nume, tip, locatie, proprietar {nume, prenume, cnp, telefon}, aviz, sanctiuni }
type AvizStatus = "green" | "yellow" | "red";

interface SrlCardProps {
  srl: any; // lightweight, can be refined
  onAddAviz: () => void;
  onAddSanctiune: () => void;
}

export default function SrlCard({ srl, onAddAviz, onAddSanctiune }: SrlCardProps) {
  // Determină starea avizului: verde, galben, roșu
  const now = new Date();
  let avizStatus: AvizStatus = "green";
  let avizText = "Aviz activ";
  if (!srl?.aviz || !srl?.aviz?.dataExpirare) {
    avizStatus = "red";
    avizText = "Fără aviz!";
  } else {
    const exp = new Date(srl.aviz.dataExpirare);
    const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diff < 0) {
      avizStatus = "red";
      avizText = "Expirat!";
    } else if (diff < 3) {
      avizStatus = "yellow";
      avizText = `Expiră în ${Math.ceil(diff)} zile`;
    }
  }

  const statusColors: Record<AvizStatus, string> = {
    green: "from-green-300/40 to-green-100/60 border-green-700 shadow-green-300/40",
    yellow: "from-yellow-200/60 to-yellow-50 border-yellow-600 shadow-yellow-200/40",
    red: "from-red-200/60 to-red-50 border-red-600 shadow-red-300/40",
  };

  return (
    <div className={clsx(
      "relative bg-white/70 backdrop-blur-lg border-l-8 rounded-2xl p-6 mb-8 shadow-2xl transition-all",
      "hover:scale-[1.02] hover:shadow-2xl duration-200",
      "flex flex-col gap-2",
      `border-l-[8px]`,
      `bg-gradient-to-br ${statusColors[avizStatus]}`
    )}>
      {/* Aviz Stare */}
      <span
        className={clsx(
          "absolute right-6 top-6 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow",
          avizStatus === "green" && "bg-green-600 text-white",
          avizStatus === "yellow" && "bg-yellow-400 text-yellow-900",
          avizStatus === "red" && "bg-red-600 text-white"
        )}
      >
        {avizStatus === "green" && <CheckCircleIcon className="inline w-4 h-4 mr-1" />}
        {avizStatus === "yellow" && <ClockIcon className="inline w-4 h-4 mr-1" />}
        {avizStatus === "red" && <ExclamationTriangleIcon className="inline w-4 h-4 mr-1" />}
        {avizText}
      </span>
      <div className="flex items-center gap-4">
        <div className="rounded-xl p-4 bg-gradient-to-tr from-[#bfa042]/90 to-[#ebc676]/80 shadow-lg">
          <UserIcon className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{srl.nume}</h2>
          <div className="text-sm text-gray-600">{srl.tip} · {srl.locatie}</div>
        </div>
      </div>
      <div className="pl-16 mt-2 flex flex-col gap-0.5">
        <div className="text-gray-700">
          <b>Proprietar:</b> {srl.proprietar.nume} {srl.proprietar.prenume} (<span className="font-mono">{srl.proprietar.cnp}</span>)
        </div>
        <div className="text-gray-700">
          <b>Telefon:</b> {srl.proprietar.telefon}
        </div>
        <div className="text-gray-700">
          <b>Aviz valabil până la:</b> {srl.aviz?.dataExpirare ? new Date(srl.aviz.dataExpirare).toLocaleDateString() : "—"}
        </div>
        <div className="text-gray-700 flex flex-wrap gap-1">
          <b>Sancțiuni:</b>
          {srl.sanctiuni && srl.sanctiuni.length === 0 ? (
            <span className="italic text-gray-400">Nicio sancțiune</span>
          ) : (
            (srl.sanctiuni || []).map((sanct: any, idx: number) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-red-200 text-red-800 text-xs font-bold shadow">
                {sanct.descriere}
              </span>
            ))
          )}
        </div>
      </div>
      {/* Butoane acțiune */}
      <div className="flex gap-4 mt-4">
        <button
          className="bg-gradient-to-r from-[#bfa042] to-[#ebc676] text-white shadow-xl px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:brightness-110 transition-all"
          onClick={onAddAviz}
        >
          + Adaugă Aviz
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-red-400 text-white shadow-xl px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:brightness-110 transition-all"
          onClick={onAddSanctiune}
        >
          Sancțiune
        </button>
      </div>
    </div>
  );
}
