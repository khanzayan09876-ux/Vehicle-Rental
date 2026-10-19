import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Gauge,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Wallet,
  Smartphone,
  Bitcoin,
} from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");

  // =====================================
  // QUICK LINKS
  // (path apne App.jsx ke routes ke mutabiq badal lena)
  // =====================================

  const quickLinks = [
    { label: "Explore Inventory", to: "/Rentnow" },
    { label: "Price Estimator Widget", to: "/priceestimator" },
    { label: "Track Booking Status", to: "/mybooking" },
    { label: "Fleet Management Admin", to: "/Fleetadmin" },
  ];

  // =====================================
  // NEWSLETTER SUBMIT
  // =====================================

  function handleSubscribe(e) {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Yahan baad mein backend API laga sakte ho
    console.log("Newsletter email:", cleanEmail);

    alert("Thank you for subscribing!");
    setEmail("");
  }

  return (
    <footer className="w-full border-t border-slate-800 bg-[#0f1729] text-slate-300">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10 lg:px-16">

        {/* TOP GRID */}

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-500/30">
                <Gauge size={30} className="text-white" />
              </div>

              <h2 className="text-3xl font-black tracking-wide text-white">
                VELOCITY
              </h2>
            </div>

            <p className="mt-5 max-w-xs text-[15px] leading-7 text-slate-400">
              Premier vehicle rental experience offering top-tier
              performance, zero paperwork barriers, and instant
              confirmation passes.
            </p>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[15px] text-slate-400 transition hover:text-sky-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & SUPPORT */}

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              Contact &amp; Support
            </h3>

            <ul className="mt-5 space-y-3 text-[15px] text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-sky-500" />
                <a
                  href="tel:+18009021829"
                  className="transition hover:text-sky-400"
                >
                  +1 (800) 902-1829
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-sky-500" />
                <a
                  href="mailto:concierge@velocityrentals.com"
                  className="break-all transition hover:text-sky-400"
                >
                  concierge@velocityrentals.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-sky-500" />
                <span>Beverly Hills VIP Hub, CA</span>
              </li>
            </ul>
          </div>

          {/* VIP NEWSLETTER */}

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              VIP Newsletter
            </h3>

            <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-[47px] w-full rounded-2xl border border-slate-700 bg-[#1a2438] px-4 text-sm text-slate-200 outline-none placeholder:text-slate-400 focus:border-sky-500"
              />

              <button
                type="submit"
                className="h-[45px] w-full rounded-2xl bg-sky-500 text-sm font-extrabold text-slate-900 transition hover:bg-sky-400 active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            © 2026 VELOCITY Rentals. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-500">
            <CreditCard size={20} />
            <Wallet size={20} />
            <Smartphone size={20} />
            <Bitcoin size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;