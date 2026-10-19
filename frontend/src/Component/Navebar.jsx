import React from "react";
import { NavLink } from "react-router-dom";
import {
  RefreshCw,
  CarFront,
  ShieldCheck,
  Gauge,
  ChevronRight,
} from "lucide-react";

function Sidebar() {
  const links = [
    {
      to: "/update",
      label: "Update",
      icon: RefreshCw,
    },
    // {
    //   to: "/Rentnow",
    //   label: "Rentnow",
    //   icon: CarFront,
    // },
    {
      to: "/Admain", 
      label: "Adamin",
      icon: ShieldCheck,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-700/70 bg-gradient-to-b from-[#101b32] via-[#0b1428] to-[#050b1c] px-4 py-6 text-white shadow-2xl">

      {/* Logo / Brand */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-lg shadow-blue-500/30">
          <Gauge size={26} strokeWidth={2.5} />
        </div>

        <div>
          <h1 className="text-xl font-black tracking-wide">
            VELOCITY
          </h1>

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-400">
            Luxury Fleet & Rentals
          </p>
        </div>
      </div>

      {/* Section Heading */}
      <div className="mb-4 px-3">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-500">
          Main Menu
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center justify-between overflow-hidden rounded-2xl border px-4 py-4 transition-all duration-300 ${
                isActive
                  ? "border-sky-400/30 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-white shadow-lg shadow-sky-950/30"
                  : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800/70 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-cyan-400" />
                )}

                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-lg shadow-sky-500/20"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-cyan-400"
                    }`}
                  >
                    <Icon size={21} strokeWidth={2.2} />
                  </span>

                  <span className="text-sm font-bold">
                    {label}
                  </span>
                </span>

                <ChevronRight
                  size={17}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-cyan-400"
                      : "-translate-x-1 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Information Card */}
      <div className="mt-auto">
        <div className="relative overflow-hidden rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-500/15 to-indigo-600/15 p-4">
          <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-sky-400/10 blur-2xl" />
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-slate-800 pt-4 text-center">
          <p className="text-[10px] font-semibold tracking-wide text-slate-500">
            © 2026 VELOCITY
          </p>

          <p className="mt-1 text-[9px] text-slate-600">
            Luxury Fleet & Rentals
          </p>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;