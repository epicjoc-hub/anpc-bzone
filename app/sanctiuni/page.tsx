"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function SanctiuniPage() {
  const [sanctiuni, setSanctiuni] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/sanctiuni").then(res => res.json()).then(setSanctiuni);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#fffbe7]">
      <Sidebar current="/sanctiuni" />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-black mb-10"
            style={{
              background: "linear-gradient(90deg, #bfa042 30%, #ebc676 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
          Sancțiuni oferite
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/80 rounded-xl shadow">
            <thead>
              <tr className="bg-[#bfa042]/20 text-gray-900 font-bold uppercase text-xs">
                <th className="py-3 px-4">SRL</th>
                <th className="py-3 px-4">Descriere</th>
                <th className="py-3 px-4">Motiv</th>
                <th className="py-3 px-4">Data expirare</th>
                <th className="py-3 px-4">Oferită de</th>
              </tr>
            </thead>
            <tbody>
              {sanctiuni.map((s, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2 px-4">{s.srl?.nume || "-"}</td>
                  <td className="py-2 px-4">{s.descriere}</td>
                  <td className="py-2 px-4">{s.motiv}</td>
                  <td className="py-2 px-4">{new Date(s.dataExpirare).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{s.oferitDe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
