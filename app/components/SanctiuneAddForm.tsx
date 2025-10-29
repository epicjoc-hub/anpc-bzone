import React, { useState } from "react";
import Modal from "./Modal";
import { USERS } from "@/data/users";

export default function SanctiuneAddForm({ open, onClose, onSubmit }) {
  const [descriere, setDescriere] = useState("");
  const [motiv, setMotiv] = useState("");
  const [dataExpirare, setDataExpirare] = useState("");
  const [oferitDe, setOferitDe] = useState(USERS[0].name);

  return (
    <Modal open={open} title="Aplică Sancțiune" onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ descriere, motiv, dataExpirare, oferitDe });
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sancțiune (descriere)</label>
          <input
            required
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={descriere}
            onChange={e => setDescriere(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Motiv</label>
          <input
            required
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={motiv}
            onChange={e => setMotiv(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data expirării</label>
          <input
            type="date"
            required
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={dataExpirare}
            onChange={e => setDataExpirare(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Oferit de</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-[#bfa042]/40 bg-white/80 focus:ring-2 focus:ring-[#bfa042] transition"
            value={oferitDe}
            onChange={e => setOferitDe(e.target.value)}
          >
            {USERS.map(u => (
              <option key={u.name} value={u.name}>{u.name} ({u.grade})</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-[#bfa042] to-[#ebc676] text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 transition-all"
        >
          Aplică Sancțiune
        </button>
      </form>
    </Modal>
  );
}
