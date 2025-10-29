"use client";
import React, { useEffect, useState } from "react";
import type { Srl } from "./types";
import Sidebar from "./components/Sidebar";
import SrlCard from "./components/SrlCard";
import SRLAddForm from "./components/SRLAddForm";
import AvizAddForm from "./components/AvizAddForm";
import SanctiuneAddForm from "./components/SanctiuneAddForm";

export default function Page() {
  const [showAdd, setShowAdd] = useState(false);
  const [showAviz, setShowAviz] = useState(false);
  const [showSanct, setShowSanct] = useState(false);
  const [activeSrl, setActiveSrl] = useState<Srl | null>(null);
  const [srluri, setSrluri] = useState<Srl[]>([]);

  // Fetch din API!
  useEffect(() => {
    fetch("/api/srl").then(res => res.json()).then(setSrluri);
  }, []);

  async function handleAddSRL(newSRL: any) {
    await fetch("/api/srl", { method: "POST", body: JSON.stringify(newSRL) });
    fetch("/api/srl").then(res => res.json()).then(setSrluri);
    setShowAdd(false);
  }

  async function handleAddAviz(data: any) {
    if (!activeSrl) return;
    await fetch("/api/aviz", { method: "POST", body: JSON.stringify({ ...data, srlId: activeSrl.id }) });
    fetch("/api/srl").then(res => res.json()).then(setSrluri);
    setShowAviz(false); setActiveSrl(null);
  }

  async function handleAddSanctiune(data: any) {
    if (!activeSrl) return;
    await fetch("/api/sanctiune", { method: "POST", body: JSON.stringify({ ...data, srlId: activeSrl.id }) });
    fetch("/api/srl").then(res => res.json()).then(setSrluri);
    setShowSanct(false); setActiveSrl(null);
  }

  return (
    <div className="min-h-screen flex bg-[#fffbe7]">
      <Sidebar current="/" />
      <main className="flex-1 p-8 overflow-x-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black"
            style={{
              background: "linear-gradient(90deg, #bfa042 30%, #ebc676 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            SRL-uri înregistrate
          </h2>
          <button
            className="bg-gradient-to-r from-[#bfa042] to-[#ebc676] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition-all text-lg"
            onClick={() => setShowAdd(true)}
          >
            + Adaugă SRL
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {srluri.map((srl: Srl) => (
            <SrlCard
              key={srl.id}
              srl={srl}
              onAddAviz={() => { setActiveSrl(srl); setShowAviz(true); }}
              onAddSanctiune={() => { setActiveSrl(srl); setShowSanct(true); }}
            />
          ))}
        </div>
        <SRLAddForm open={showAdd} onClose={() => setShowAdd(false)} onSubmit={handleAddSRL} />
        <AvizAddForm open={showAviz} onClose={() => setShowAviz(false)} onSubmit={handleAddAviz} />
        <SanctiuneAddForm open={showSanct} onClose={() => setShowSanct(false)} onSubmit={handleAddSanctiune} />
      </main>
    </div>
  );
}
