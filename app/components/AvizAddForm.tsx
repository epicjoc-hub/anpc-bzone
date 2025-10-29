import React, { useState } from "react";
import Modal from "./Modal";
import { USERS } from "@/data/users";

export default function AvizAddForm({ open, onClose, onSubmit }) {
  const [dataExpirare, setDataExpirare] = useState("");
  const [oferitDe, setOferitDe] = useState(USERS[0].name);

  return (
    <Modal open={open} title="Adaugă Aviz" onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ dataExpirare, oferitDe });
        }}
      >
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
          Salvează Aviz
        </button>
      </form>
    </Modal>
  );
}
