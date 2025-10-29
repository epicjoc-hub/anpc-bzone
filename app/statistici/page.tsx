"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

function statisticiFromSRL(srluri) {
  const total = srluri.length;
  const active = srluri.filter(s =>
    s.avize && s.avize.length > 0 &&
    new Date(s.avize[s.avize.length - 1].dataExpirare) > new Date()
  ).length;
  const sanc = srluri.filter(s => s.sanctiuni && s.sanctiuni.length > 0).length;
  return { total, active, sanc };
}

export default function StatisticiPage() {
  const [srluri, setSrluri] = useState([]);
  useEffect(() => {
    fetch("/api/srl").then(r => r.json()).then(setSrluri);
  }, []);
  const stats = statisticiFromSRL(srluri);

  return (
    <div className="min-h-screen flex bg-[#fffbe7]">
      <Sidebar current="/statistici" />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-black mb-10"
            style={{
              background: "linear-gradient(90deg, #bfa042 30%, #ebc676 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
          Statistici
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center border-l-8 border-[#bfa042]">
            <span className="text-6xl font-black text-[#bfa042]">{stats.total}</span>
            <span className="mt-2 text-lg font-semibold text-gray-700">Total SRL-uri</span>
          </div>
          <div className="bg-white/80 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center border-l-8 border-green-500">
            <span className="text-6xl font-black text-green-600">{stats.active}</span>
            <span className="mt-2 text-lg font-semibold text-gray-700">SRL-uri cu avize active</span>
          </div>
          <div className="bg-white/80 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center border-l-8 border-red-500">
            <span className="text-6xl font-black text-red-600">{stats.sanc}</span>
            <span className="mt-2 text-lg font-semibold text-gray-700">SRL-uri sancționate</span>
          </div>
        </div>
      </main>
    </div>
  );
}
