import {
  Car,
  Calculator,
  ClipboardList,
  SlidersHorizontal,
  Sun,
  UserPlus,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItemClass = (path) => {
    const isActive = location.pathname === path;

    return `flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-[#1c2a40] text-cyan-400"
        : "text-slate-400 hover:bg-[#18263d] hover:text-white"
    }`;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0b1428]">
      <div className="relative flex h-[82px] items-center px-6">

        {/* Logo */}
        <Link
          to="/ExploreFleet"
          className="flex shrink-0 items-center gap-3"
        >
          <div
            className="
              flex h-12 w-11
              items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-blue-500
              via-indigo-500
              to-purple-600
              shadow-lg
            "
          >
            <Car size={24} className="text-white" />
          </div>

          <div className="leading-none">
            <h1 className="text-[23px] font-black tracking-wide text-white">
              Vehicle Rental
            </h1>

            <p className="mt-1 text-[9px] font-bold tracking-[1.2px] text-cyan-400">
              LUXURY FLEET & RENTALS
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          className="
            absolute left-1/2
            flex h-[56px]
            -translate-x-1/2
            items-center
            rounded-[18px]
            border border-white/10
            bg-[#0d172d]
            px-1.5
          "
        >

          {/* Explore Fleet */}
          <Link
            to="/ExploreFleet"
            className={navItemClass("/ExploreFleet")}
          >
            <Car size={18} />
            <span>Explore Fleet</span>
          </Link>

          {/* Price Estimator */}
          <Link
            to="/PriceEstimator"
            className={navItemClass("/PriceEstimator")}
          >
            <Calculator size={18} />
            <span>Price Estimator</span>
          </Link>

          {/* My Bookings */}
          <Link
            to="/Mybooking"
            className={navItemClass("/Mybooking")}
          >
            <ClipboardList size={18} />
            <span>My Bookings</span>
          </Link>

        </nav>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-5">

          {/* Theme Button */}
          <button
            type="button"
            className="
              text-yellow-400
              transition-all
              duration-200
              hover:scale-110
            "
          >
            <Sun size={22} />
          </button>

          {/* Registration */}
          <Link
            to="/Registration"
            className="
              flex items-center gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-5 py-3
              text-sm font-bold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:from-blue-700
              hover:to-indigo-700
              hover:shadow-blue-500/30
            "
          >
            <UserPlus size={18} />
            <span>Daitail</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
  






