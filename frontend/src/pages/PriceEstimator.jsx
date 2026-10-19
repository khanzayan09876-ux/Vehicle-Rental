import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PriceEstimator() {
  const navigate = useNavigate();

  // Vehicle list and daily prices
  const vehicles = [
    { name: "Porsche 911 GT3 RS", price: 320 },
    { name: "Mercedes AMG GT", price: 280 },
    { name: "BMW M4", price: 220 },
    { name: "Audi RS7", price: 300 },
    { name: "Range Rover Sport", price: 280 },
    { name: "Toyota Land Cruiser", price: 200 },
    { name: "Tesla Model S", price: 180 },
    { name: "Tesla Model X", price: 240 },
    { name: "BMW i7", price: 290 },
    { name: "Yamaha MT-15", price: 150 },
    { name: "BMW S 1000 RR", price: 250 },
    { name: "Ducati Panigale V4", price: 300 },
    { name: "Kawasaki Ninja ZX-10R", price: 280 },
  ];

  // State
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [days, setDays] = useState(1);

  const [addons, setAddons] = useState({
    coverage: false,
    gps: false,
    driver: false,
  });

  // Current vehicle
  const vehicle = vehicles[selectedVehicle];

  // Add-on daily prices
  const addonPrices = {
    coverage: 30,
    gps: 10,
    driver: 20,
  };

  // Calculate daily add-on cost
  const dailyAddonCost =
    (addons.coverage ? addonPrices.coverage : 0) +
    (addons.gps ? addonPrices.gps : 0) +
    (addons.driver ? addonPrices.driver : 0);

  // Calculate total
  const totalCost = (vehicle.price + dailyAddonCost) * days;

  // Toggle add-on
  function handleAddonChange(addon) {
    setAddons((previous) => ({
      ...previous,
      [addon]: !previous[addon],
    }));
  }

  // Book vehicle
  function handleBooking() {
    navigate("/Detail", {
      state: {
        vehicle: vehicle.name,
        price: vehicle.price,
        days: days,
        addons: addons,
        totalCost: totalCost,
      },
    });
  }

  return (
    <div className="min-h-screen w-full bg-[#050817] px-4 py-10 text-white sm:px-6 pt-40">

      {/* Heading */}
      <section className="mx-auto max-w-[1100px]">

        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-extrabold tracking-[2px] text-sky-400">
            COST TRANSPARENCY
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Interactive Rental Price Estimator
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Calculate custom quotes based on duration, vehicle class,
            and add-on coverage before booking.
          </p>
        </div>

        {/* Estimator Card */}
        <div className="mx-auto max-w-[960px] rounded-[28px] border border-slate-700/60 bg-[#10182b] p-5 shadow-2xl sm:p-8 md:p-10">

          {/* Vehicle and Days */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Vehicle Selection */}
            <div>
              <label className="mb-3 block text-sm font-bold text-slate-400">
                SELECT VEHICLE CLASS
              </label>

              <select
                value={selectedVehicle}
                onChange={(e) =>
                  setSelectedVehicle(Number(e.target.value))
                }
                className="w-full rounded-[20px] border border-slate-700 bg-slate-800 px-5 py-4 text-sm font-bold text-white outline-none transition focus:border-sky-500"
              >
                {vehicles.map((item, index) => (
                  <option key={item.name} value={index}>
                    {item.name} (${item.price}/day)
                  </option>
                ))}
              </select>
            </div>

            {/* Rental Days */}
            <div>
              <label className="mb-5 block text-sm font-bold text-slate-400">
                RENTAL DAYS ({days} {days === 1 ? "DAY" : "DAYS"})
              </label>

              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-sky-500"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>1 day</span>
                <span>30 days</span>
              </div>
            </div>
          </div>

          {/* Add-on Services */}
          <div className="mt-10">
            <h2 className="mb-4 text-sm font-bold text-slate-400">
              ADD-ON SERVICES
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

              {/* Coverage */}
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 transition hover:border-sky-500">
                <input
                  type="checkbox"
                  checked={addons.coverage}
                  onChange={() => handleAddonChange("coverage")}
                  className="h-4 w-4 accent-sky-500"
                />

                <span className="text-sm font-bold">
                  Full Coverage ($30/d)
                </span>
              </label>

              {/* GPS */}
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 transition hover:border-sky-500">
                <input
                  type="checkbox"
                  checked={addons.gps}
                  onChange={() => handleAddonChange("gps")}
                  className="h-4 w-4 accent-sky-500"
                />

                <span className="text-sm font-bold">
                  GPS Navigation ($10/d)
                </span>
              </label>

              {/* Extra Driver */}
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 transition hover:border-sky-500">
                <input
                  type="checkbox"
                  checked={addons.driver}
                  onChange={() => handleAddonChange("driver")}
                  className="h-4 w-4 accent-sky-500"
                />

                <span className="text-sm font-bold">
                  Extra Driver ($20/d)
                </span>
              </label>

            </div>
          </div>

          {/* Total Price */}
          <div className="mt-8 rounded-[24px] bg-gradient-to-r from-[#171b3a] to-[#211b4d] p-6 sm:p-8">

            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

              {/* Price Details */}
              <div>
                <p className="text-sm font-bold text-slate-400">
                  ESTIMATED TOTAL COST
                </p>

                <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-sky-400">
                  $
                  {totalCost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>

                <p className="mt-2 text-sm text-slate-300">
                  {days} {days === 1 ? "day" : "days"} @ $
                  {vehicle.price}/day + $
                  {(dailyAddonCost * days).toLocaleString("en-US")} add-ons
                </p>
              </div>

              {/* Booking Button */}
              <button
                type="button"
                onClick={handleBooking}
                className="w-full rounded-2xl bg-sky-500 px-6 py-4 text-sm font-extrabold text-[#050817] shadow-lg transition duration-200 hover:scale-[1.02] hover:bg-sky-400 md:w-auto"
              >
                Proceed to Book This Vehicle
              </button>

            </div>
          </div>

          {/* Price Disclaimer */}
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Estimated pricing is for reference only. Final charges may
            vary depending on availability, taxes, and booking terms.
          </p>

        </div>
      </section>
    </div>
  );
}

export default PriceEstimator;