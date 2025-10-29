import { HomeIcon, ChartBarIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const MENU = [
  { label: "SRL-uri", route: "/", icon: <HomeIcon className="w-6 h-6" /> },
  { label: "Sancțiuni oferite", route: "/sanctiuni", icon: <ExclamationCircleIcon className="w-6 h-6" /> },
  { label: "Statistici", route: "/statistici", icon: <ChartBarIcon className="w-6 h-6" /> },
];

export default function Sidebar({ current = "/" }: { current?: string }) {
  return (
    <aside className="min-h-screen w-64 bg-gradient-to-b from-white via-[#fff5e0] to-[#ffe9a7] border-r border-[#bfa042]/20 shadow-xl flex flex-col px-5 py-8">
      <h1 className="text-3xl font-black mb-10 tracking-widest flex items-center gap-2"
        style={{
          background: "linear-gradient(90deg, #bfa042 35%, #ebc676 65%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 16px #bfa04255"
        }}
      >ANPC Panel</h1>
      <nav className="flex flex-col gap-5">
        {MENU.map((item) => (
          <a
            key={item.route}
            href={item.route}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              current === item.route
                ? "bg-[#bfa042]/90 shadow-lg scale-105 text-white"
                : "hover:bg-[#bfa042]/30 hover:scale-105 text-gray-900"
            )}
            style={current === item.route ? {
              boxShadow: "0 4px 24px 0 #bfa04244"
            } : {}}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto mb-2 text-xs text-gray-400 text-center">
        Powered by epicjoc-hub • {new Date().getFullYear()}
      </div>
    </aside>
  );
}
