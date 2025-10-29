import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s]">
      <div className="relative bg-white/80 rounded-3xl shadow-2xl border border-[#bfa042]/30 max-w-lg w-full mx-4 p-8
          backdrop-blur-xl
          before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-[#fffbe7]/80 before:to-[#ffe18f]/40 before:z-[-1]">
        <button
          className="absolute top-6 right-6 bg-[#bfa042]/80 hover:bg-[#ebc676] p-2 rounded-full shadow-lg transition-all"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>
        <h2
          className="mb-6 text-2xl font-bold tracking-wide text-center"
          style={{
            background: "linear-gradient(90deg, #bfa042 35%, #ebc676 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 12px #bfa04255"
          }}
        >
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
