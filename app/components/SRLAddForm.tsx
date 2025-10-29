import React, { useState } from "react";
import Modal from "./Modal";
import { TIP_SRL } from "@/data/tipSrl";
import { LOCATII } from "@/data/locatii";

interface SRLAddFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function SRLAddForm({ open, onClose, onSubmit }: SRLAddFormProps) {
  const [nume, setNume] = useState("");
  const [locatie, setLocatie] = useState(LOCATII[0]);
  const [tip, setTip] = useState(TIP_SRL[0]);
  // ... alte state-uri pentru proprietar, coproprietar, manager

  return (
    <Modal open={open} title="+ Adaugă SRL" onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e: any) => {
          e.preventDefault();
          // trimite datele spre backend/onSubmit
          onSubmit({ nume, locatie, tip /* ...altele */ });
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nume firmă</label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={nume}
            onChange={(e: any) => setNume(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locație</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={locatie}
            onChange={(e: any) => setLocatie(e.target.value)}
          >
            {LOCATII.map((loc: string) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tip SRL</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={tip}
            onChange={(e: any) => setTip(e.target.value)}
          >
            {TIP_SRL.map((tipS: string) => <option key={tipS} value={tipS}>{tipS}</option>)}
          </select>
        </div>
        {/* Aici adaugă logică pentru proprietar, coproprietar, manager, cu același stil */}
        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-[#bfa042] to-[#ebc676] text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 transition-all"
        >
          Salvează SRL
        </button>
      </form>
    </Modal>
  );
}
