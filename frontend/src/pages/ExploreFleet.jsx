import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Component/Sidebar";

import {
  MapPin,
  CalendarDays,
  ShieldCheck,
  Headphones,
  Truck,
  Settings2,
  Fuel,
  Users,
  Timer,
  CarFront,
  CalendarCheck,
  Zap,
  KeyRound,
  X,
  Smartphone,
  Phone,
  Download,
  ChevronRight,
  Gauge,
} from "lucide-react";

function ExploreFleet() {
  // =====================================
  // SEARCH FORM STATE
  // =====================================

  const [formdata, setformdata] = useState({
    depot: "",
    pickupdate: "",
    returndate: "",
  });

  // =====================================
  // EXPLORE DATA
  // =====================================

  const [exploredata, setexploredata] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // APP DOWNLOAD POPUP STATE
  // =====================================

  const [showAppPopup, setShowAppPopup] = useState(false);
  const [appVehicle, setAppVehicle] = useState(null);

  // =====================================
  // BOOKING POPUP STATE
  // =====================================

  const [showPopup, setShowPopup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [bookingData, setBookingData] = useState({
    pickupdate: "",
    returndate: "",
    addons: [],
    promocode: "",
  });

  const [promoMessage, setPromoMessage] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  // =====================================
  // VIP ADD-ONS
  // =====================================

  const addonOptions = [
    { name: "GPS Navigation", price: 10 },
    { name: "Full Protection", price: 30 },
    { name: "Extra Driver", price: 20 },
    { name: "Child Safety Seat", price: 15 },
  ];

  // =====================================
  // TODAY'S DATE
  // =====================================

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // =====================================
  // FETCH EXPLORE DATA
  // =====================================

  async function handlesubmit() {
    try {
      const response = await axios.get(
        "http://localhost:3000/explore/getexplore"
      );

      console.log("Explore Data:", response.data.data);

      setexploredata(
        Array.isArray(response.data.data)
          ? response.data.data
          : []
      );
    } catch (error) {
      console.error("Explore Data Error:", error);
      setexploredata([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handlesubmit();
  }, []);

  // =====================================
  // IMAGE URL
  // =====================================

  function getImageUrl(image) {
    if (!image) {
      return "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    const imagePath = image.replace(/\\/g, "/").replace(/^\/+/, "");

    return `http://localhost:3000/${imagePath}`;
  }

  // =====================================
  // SEARCH FORM CHANGE
  // =====================================

  function handleSearchChange(e) {
    const { name, value } = e.target;

    setformdata((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // =====================================
  // SEARCH FORM SUBMIT
  // =====================================

  function handleSubmitFunction(e) {
    e.preventDefault();

    if (!formdata.depot) {
      alert("Please select a pickup depot.");
      return;
    }

    if (!formdata.pickupdate || !formdata.returndate) {
      alert("Please select pickup and return dates.");
      return;
    }

    if (formdata.pickupdate < getTodayDate()) {
      alert("Pickup date cannot be in the past.");
      return;
    }

    if (formdata.returndate <= formdata.pickupdate) {
      alert("Return date must be after pickup date.");
      return;
    }

    alert("Search details selected successfully!");
  }

  // =====================================
  // APP POPUP (ONLY FOR RENT NOW BUTTON)
  // =====================================

  function openAppPopup(vehicle) {
    setAppVehicle(vehicle);
    setShowAppPopup(true);
  }

  function closeAppPopup() {
    // X dabane par booking popup khul jata hai
    const vehicle = appVehicle;
    setShowAppPopup(false);
    setAppVehicle(null);

    if (vehicle) {
      openBooking(vehicle);
    }
  }

  function continueOnWeb() {
    closeAppPopup();
  }

  function handleDownloadApp() {
    // Yahan apna real app link laga dein
    window.open("https://play.google.com/store", "_blank");
  }

  // =====================================
  // OPEN BOOKING POPUP
  // =====================================

  function openBooking(vehicle) {
    setSelectedVehicle(vehicle);

    setBookingData({
      pickupdate: formdata.pickupdate || "",
      returndate: formdata.returndate || "",
      addons: [],
      promocode: "",
    });

    setPromoMessage("");
    setPromoDiscount(0);
    setShowPopup(true);
  }

  // =====================================
  // CLOSE BOOKING POPUP
  // =====================================

  function closePopup() {
    setShowPopup(false);
    setSelectedVehicle(null);
    setPromoMessage("");
    setPromoDiscount(0);
  }

  // =====================================
  // BOOKING DATE CHANGE
  // =====================================

  function handleBookingChange(e) {
    const { name, value } = e.target;

    setBookingData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "pickupdate" || name === "returndate") {
      setPromoDiscount(0);
      setPromoMessage("");
    }
  }

  // =====================================
  // ADD-ON CHANGE
  // =====================================

  function handleAddonChange(addonName) {
    setBookingData((previous) => ({
      ...previous,
      addons: previous.addons.includes(addonName)
        ? previous.addons.filter((item) => item !== addonName)
        : [...previous.addons, addonName],
    }));

    setPromoDiscount(0);
    setPromoMessage("");
  }

  // =====================================
  // RENTAL DAYS
  // =====================================

  const rentalDays = (() => {
    if (!bookingData.pickupdate || !bookingData.returndate) {
      return 0;
    }

    const pickup = new Date(`${bookingData.pickupdate}T00:00:00`);
    const returned = new Date(`${bookingData.returndate}T00:00:00`);

    const difference = returned - pickup;

    if (difference <= 0) {
      return 0;
    }

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  })();

  // =====================================
  // PRICE CALCULATIONS
  // =====================================

  const dailyPrice = Number(selectedVehicle?.price || 0);

  const addonsDailyTotal = addonOptions
    .filter((addon) => bookingData.addons.includes(addon.name))
    .reduce((total, addon) => total + addon.price, 0);

  const baseAmount = dailyPrice * rentalDays;
  const addonsTotal = addonsDailyTotal * rentalDays;
  const subtotal = baseAmount + addonsTotal;

  const totalAmount = Math.max(0, subtotal - promoDiscount);

  // =====================================
  // APPLY PROMO CODE
  // =====================================

  function applyPromoCode() {
    const code = bookingData.promocode.trim().toUpperCase();

    if (!code) {
      setPromoMessage("Please enter a promo code.");
      setPromoDiscount(0);
      return;
    }

    if (code === "RENT20") {
      if (subtotal <= 0) {
        setPromoMessage("Please select valid pickup and return dates first.");
        setPromoDiscount(0);
        return;
      }

      const discount = subtotal * 0.2;

      setPromoDiscount(discount);
      setPromoMessage("20% discount applied!");
    } else {
      setPromoDiscount(0);
      setPromoMessage("Invalid promo code.");
    }
  }

  // =====================================
  // BOOKING SUBMIT
  // =====================================

  function handleBookingSubmit(e) {
    e.preventDefault();

    if (!selectedVehicle) {
      return;
    }

    if (!bookingData.pickupdate || !bookingData.returndate) {
      alert("Please select pickup and return dates.");
      return;
    }

    if (bookingData.pickupdate < getTodayDate()) {
      alert("Pickup date cannot be in the past.");
      return;
    }

    if (bookingData.returndate <= bookingData.pickupdate) {
      alert("Return date must be after pickup date.");
      return;
    }

    if (rentalDays <= 0) {
      alert("Please select valid rental dates.");
      return;
    }

    const bookingSummary = {
      vehicleId: selectedVehicle._id,
      vehicleName: selectedVehicle.name,
      dailyPrice,
      pickupDate: bookingData.pickupdate,
      returnDate: bookingData.returndate,
      rentalDays,
      addons: bookingData.addons,
      addonsTotal,
      promoDiscount,
      totalAmount,
    };

    console.log("Booking Details:", bookingSummary);

    alert(
      `Booking details ready!\n\n` +
        `Vehicle: ${selectedVehicle.name}\n` +
        `Pickup: ${bookingData.pickupdate}\n` +
        `Return: ${bookingData.returndate}\n` +
        `Duration: ${rentalDays} day(s)\n` +
        `Total: $${totalAmount.toFixed(2)}`
    );
  }

  // =====================================
  // MAIN RETURN
  // =====================================

  return (
    <div className="min-h-screen bg-[#050b1c] pt-20 pr-30 text-white">
      <Sidebar />

      <main className="ml-0 min-h-screen px-2 pb-10 pt-8 md:px-4 md:pt-10">
        <div className="mx-auto max-w-[1400px]">

          {/* =====================================
              HERO SECTION
          ===================================== */}

          <section className="relative overflow-hidden rounded-[25px] border border-slate-700/50 bg-gradient-to-br from-[#11192d] via-[#10182b] to-[#102d49] px-5 py-6 md:px-10 md:py-10">
            <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs font-bold tracking-wide text-sky-400">
                <span className="text-yellow-400">⚡</span>
                ZERO PAPERWORK • INSTANT RESERVATION
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Experience Pure Driving
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300 md:text-base">
                Rent world-class luxury sedans, high-performance sports
                cars, rugged electric SUVs, and track-ready bikes.
                Guaranteed best rates with zero hidden fees.
              </p>

              {/* FEATURES */}

              <div className="mt-5 grid max-w-4xl grid-cols-1 border-t border-slate-700/50 pt-4 md:grid-cols-3">
                <div className="flex items-center gap-3 py-2">
                  <ShieldCheck className="h-5 w-5 text-sky-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    Fully Insured Fleet
                  </span>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <Headphones className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    24/7 VIP Concierge
                  </span>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <Truck className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    Free Doorstep Delivery
                  </span>
                </div>
              </div>

              {/* SEARCH FORM */}

              <form
                onSubmit={handleSubmitFunction}
                className="mt-5 rounded-[20px] border border-slate-700 bg-[#0d1628]/90 p-4 shadow-2xl backdrop-blur-md"
              >
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">

                  {/* PICKUP DEPOT */}

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <MapPin className="h-4 w-4 text-sky-400" />
                      PICK-UP DEPOT
                    </label>

                    <select
                      name="depot"
                      value={formdata.depot}
                      onChange={handleSearchChange}
                      className="h-11 w-full rounded-xl border border-slate-600 bg-[#202c40] px-4 text-sm font-semibold text-slate-200 outline-none focus:border-sky-500"
                    >
                      <option value="">Select Pickup Depot</option>
                      <option value="JFK">
                        Central International Airport (JFK)
                      </option>
                      <option value="Downtown">Downtown Depot</option>
                      <option value="LAX">Los Angeles Airport (LAX)</option>
                      <option value="Miami">Miami International Airport</option>
                    </select>
                  </div>

                  {/* PICKUP DATE */}

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <CalendarDays className="h-4 w-4 text-sky-400" />
                      PICK-UP DATE
                    </label>

                    <input
                      type="date"
                      name="pickupdate"
                      min={getTodayDate()}
                      value={formdata.pickupdate}
                      onChange={handleSearchChange}
                      className="h-11 w-full rounded-xl border border-slate-600 bg-[#202c40] px-4 text-sm font-semibold text-slate-200 outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* RETURN DATE */}

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <CalendarDays className="h-4 w-4 text-sky-400" />
                      RETURN DATE
                    </label>

                    <input
                      type="date"
                      name="returndate"
                      min={formdata.pickupdate || getTodayDate()}
                      value={formdata.returndate}
                      onChange={handleSearchChange}
                      className="h-11 w-full rounded-xl border border-slate-600 bg-[#202c40] px-4 text-sm font-semibold text-slate-200 outline-none focus:border-sky-500"
                    />
                  </div>

                  {/* SEARCH BUTTON */}

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="flex h-11 w-full min-w-[160px] items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98]"
                    >
                      Search Available Fleet
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* =====================================
              STATISTICS
          ===================================== */}

          <div className="mt-10 flex flex-wrap justify-center gap-7">
            <div className="h-25 w-60 rounded-3xl bg-sky-500/10 p-5 text-center">
              <h2 className="text-2xl font-extrabold text-cyan-400">
                15,000+
              </h2>
              <p className="mt-1 font-bold text-gray-400">
                Satisfied Clients
              </p>
            </div>

            <div className="h-25 w-60 rounded-3xl bg-sky-500/10 p-5 text-center">
              <h2 className="text-2xl font-extrabold text-cyan-200">
                500+
              </h2>
              <p className="mt-1 font-bold text-gray-400">
                Luxury Fleet
              </p>
            </div>

            <div className="h-25 w-60 rounded-3xl bg-sky-500/10 p-5 text-center">
              <h2 className="text-2xl font-extrabold text-amber-400">
                100%
              </h2>
              <p className="mt-1 font-bold text-gray-400">
                Insured & Guaranteed
              </p>
            </div>

            <div className="h-25 w-60 rounded-3xl bg-sky-500/10 p-5 text-center">
              <h2 className="text-2xl font-extrabold text-emerald-500">
                24/7
              </h2>
              <p className="mt-1 font-bold text-gray-400">
                VIP Support
              </p>
            </div>
          </div>

          {/* =====================================
              PREMIUM INVENTORY
          ===================================== */}

          <section className="mt-10">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-200">
                Explore Premium Inventory
              </h2>
              <p className="mt-1 text-gray-400">
                Select your favourite vehicle and book it instantly.
              </p>
            </div>

            {loading ? (
              <p className="py-10 text-center text-slate-400">
                Loading vehicles...
              </p>
            ) : exploredata.length === 0 ? (
              <p className="py-10 text-center text-slate-400">
                No vehicles available.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {exploredata.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="flex min-h-[498px] w-full flex-col overflow-hidden rounded-[25px] border border-slate-700/70 bg-[#10182b] shadow-xl"
                  >
                    {/* VEHICLE IMAGE */}

                    <div className="relative h-[235px] w-full overflow-hidden bg-slate-800">
                      {vehicle.imageUrl ? (
                        <img
                          src={getImageUrl(vehicle.imageUrl)}
                          alt={vehicle.name || "Vehicle"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                          No image available
                        </div>
                      )}

                      <div className="absolute left-4 top-4 rounded-full border border-slate-600 bg-[#172236]/95 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-sky-400">
                        {vehicle.category || "Vehicle"}
                      </div>

                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-yellow-500/40 bg-[#101827]/95 px-3 py-1.5 text-sm font-bold text-yellow-400">
                        ★ {vehicle.rating || "5"}
                      </div>
                    </div>

                    {/* VEHICLE DETAILS */}

                    <div className="flex flex-1 flex-col px-6 pt-6">
                      <h3 className="break-words text-[21px] font-extrabold tracking-tight text-white">
                        {vehicle.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-sky-300">
                        {vehicle.engine || "Premium Vehicle"}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 pb-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                          <Settings2 className="h-5 w-5 shrink-0 text-sky-500" />
                          <span>{vehicle.transmission || "Automatic"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                          <Fuel className="h-5 w-5 shrink-0 text-sky-500" />
                          <span>{vehicle.fuelType || "Petrol"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                          <Users className="h-5 w-5 shrink-0 text-sky-500" />
                          <span>{vehicle.seats || 5} Seats</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                          <Timer className="h-5 w-5 shrink-0 text-sky-500" />
                          <span>
                            {vehicle.acceleration
                              ? `${vehicle.acceleration}s`
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* PRICE AND RENT NOW BUTTON */}

                      <div className="-mx-6 mt-auto border-t border-slate-700/70 px-6 py-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[28px] font-extrabold tracking-tight text-white">
                              ${Number(vehicle.price || 0)}
                            </span>
                            <span className="text-sm font-medium text-slate-400">
                              / day
                            </span>
                          </div>

                          {/* ONLY THIS BUTTON OPENS THE APP POPUP */}
                          <button
                            type="button"
                            onClick={() => openAppPopup()}
                            className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:scale-[1.03] hover:from-sky-400 hover:to-indigo-500 active:scale-[0.97]"
                          >
                            Rent Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =====================================
              HOW RENTING WORKS
          ===================================== */}

          <section className="mt-16 w-full rounded-t-3xl bg-[#030716] px-5 py-12 text-white sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[1520px]">
              <div className="mb-12 text-center">
                <p className="mb-3 text-sm font-extrabold tracking-wider text-sky-400">
                  SEAMLESS EXPERIENCE
                </p>

                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  How Renting Works in 4 Simple Steps
                </h2>

                <p className="mt-3 text-sm text-slate-400 sm:text-base">
                  Select your vehicle and start your booking.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <div className="relative min-h-[240px] rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7">
                  <span className="absolute right-6 top-5 text-4xl font-black text-slate-700/40">
                    01
                  </span>

                  <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-sky-500/10">
                    <CarFront size={27} className="text-sky-400" />
                  </div>

                  <h3 className="mb-4 text-lg font-extrabold">
                    Select Your Vehicle
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    Choose from luxury SUVs, electric cars and sports vehicles.
                  </p>
                </div>

                <div className="relative min-h-[240px] rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7">
                  <span className="absolute right-6 top-5 text-4xl font-black text-slate-700/40">
                    02
                  </span>

                  <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-indigo-500/10">
                    <CalendarCheck size={27} className="text-indigo-400" />
                  </div>

                  <h3 className="mb-4 text-lg font-extrabold">
                    Pick Schedule & Add-ons
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    Select dates and optional VIP packages.
                  </p>
                </div>

                <div className="relative min-h-[240px] rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7">
                  <span className="absolute right-6 top-5 text-4xl font-black text-slate-700/40">
                    03
                  </span>

                  <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-amber-500/10">
                    <Zap size={27} className="text-amber-400" />
                  </div>

                  <h3 className="mb-4 text-lg font-extrabold">
                    Instant Confirmation
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    Review your booking details and rental amount.
                  </p>
                </div>

                <div className="relative min-h-[240px] rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7">
                  <span className="absolute right-6 top-5 text-4xl font-black text-slate-700/40">
                    04
                  </span>

                  <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-emerald-500/10">
                    <KeyRound size={27} className="text-emerald-400" />
                  </div>

                  <h3 className="mb-4 text-lg font-extrabold">
                    Pick Up & Enjoy
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    Get ready to enjoy your selected vehicle.
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t border-slate-800/90" />
            </div>
          </section>

          {/* =====================================
              FLEET COMPARISON MATRIX
          ===================================== */}

          <section className="mt-16 w-full rounded-2xl bg-[#030716] px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="mb-3 text-sm font-extrabold tracking-widest text-sky-400">
                SPEC SIDE-BY-SIDE
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Fleet Comparison Matrix
              </h2>
            </div>

            <div className="mx-auto max-w-[1520px] overflow-hidden rounded-[30px] border border-slate-700/50 bg-[#10192c]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="h-[60px] bg-[#192438] text-sm font-bold uppercase text-slate-400">
                      <th className="px-5">Vehicle Model</th>
                      <th className="px-5">Class</th>
                      <th className="px-5">Engine / Power</th>
                      <th className="px-5">0–60 MPH</th>
                      <th className="px-5">Seating</th>
                      <th className="px-5">Daily Rate</th>
                      <th className="px-5 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {exploredata.slice(0, 5).map((vehicle) => (
                      <tr
                        key={vehicle._id}
                        className="h-[81px] border-t border-slate-700/50 transition duration-200 hover:bg-slate-800/50"
                      >
                        <td className="px-5">
                          <div className="flex items-center gap-3">
                            {vehicle.imageUrl ? (
                              <img
                                src={getImageUrl(vehicle.imageUrl)}
                                alt={vehicle.name || "Vehicle"}
                                className="h-10 w-10 shrink-0 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-700" />
                            )}

                            <span className="whitespace-nowrap text-sm font-extrabold text-white">
                              {vehicle.name}
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 text-sm text-slate-400">
                          {vehicle.category || "N/A"}
                        </td>

                        <td className="whitespace-nowrap px-5 text-sm text-slate-400">
                          {vehicle.engine || "N/A"}
                        </td>

                        <td className="whitespace-nowrap px-5 text-sm text-slate-400">
                          {vehicle.acceleration
                            ? `${vehicle.acceleration}s`
                            : "N/A"}
                        </td>

                        <td className="whitespace-nowrap px-5 text-sm text-slate-400">
                          {vehicle.seats
                            ? `${vehicle.seats} Seats`
                            : "N/A"}
                        </td>

                        <td className="whitespace-nowrap px-5 text-sm font-extrabold text-sky-400">
                          ${Number(vehicle.price || 0)}/day
                        </td>

                        <td className="px-5 text-center">
                          {/* BOOK BUTTON: SEEDHA BOOKING POPUP KHOLTA HAI (APP POPUP NAHI) */}
                          <button
                            type="button"
                            onClick={() => openBooking(vehicle)}
                            className="rounded-xl bg-sky-500/10 px-4 py-1.5 text-sm font-extrabold text-sky-400 transition duration-200 hover:bg-sky-500 hover:text-white active:scale-95"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {exploredata.length === 0 && !loading && (
                  <p className="px-5 py-10 text-center text-slate-400">
                    No vehicles available.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* =====================================
              CUSTOMER REVIEWS SECTION
          ===================================== */}

          <section className="mt-16 w-full bg-[#030716] px-5 py-12 text-white sm:px-8 lg:px-10">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-extrabold tracking-widest text-sky-400">
                VERIFIED REVIEWS
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                What Drivers Say
              </h2>
            </div>

            <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">

              {/* REVIEW 1 */}

              <div className="rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-500/40">
                <div className="mb-5 flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xl">★</span>
                  ))}
                </div>

                <p className="min-h-[80px] text-[15px] italic leading-6 text-slate-200">
                  "Rented the Porsche 911 GT3 for a weekend trip. Pristine
                  condition, zero paperwork delays, and delivered right
                  outside my hotel."
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Elena Rostova"
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-sm font-extrabold text-white">
                      Elena Rostova
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Rented Porsche 911 GT3
                    </p>
                  </div>
                </div>
              </div>

              {/* REVIEW 2 */}

              <div className="rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-500/40">
                <div className="mb-5 flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xl">★</span>
                  ))}
                </div>

                <p className="min-h-[80px] text-[15px] italic leading-6 text-slate-200">
                  "The Tesla Model S Plaid was phenomenal. Seamless booking
                  modal without tedious login account creations. Will
                  definitely use again!"
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="David Miller"
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-sm font-extrabold text-white">
                      David Miller
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Rented Tesla Model S
                    </p>
                  </div>
                </div>
              </div>

              {/* REVIEW 3 */}

              <div className="rounded-[30px] border border-slate-700/50 bg-[#10192c] p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-500/40">
                <div className="mb-5 flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xl">★</span>
                  ))}
                </div>

                <p className="min-h-[80px] text-[15px] italic leading-6 text-slate-200">
                  "Rented the G63 AMG for a corporate event. The VIP delivery
                  service was prompt and the car smelled factory brand new."
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    alt="Marcus Vance"
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-sm font-extrabold text-white">
                      Marcus Vance
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Rented Mercedes G63
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* =====================================
              FREQUENTLY ASKED QUESTIONS
          ===================================== */}

          <section className="mt-16 w-full bg-[#030716] px-5 py-12 text-white sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[960px]">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mt-3 text-sm text-slate-400 sm:text-base">Everything you need to know about our open rental platform.</p>
              </div>
              <div className="space-y-4">
                <details className="group overflow-hidden rounded-[20px] border border-slate-700/60 bg-[#10182b]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-6 text-base font-extrabold text-white"><span>Do I need to register or create an account to book?</span><span className="text-xl text-sky-400 transition-transform duration-300 group-open:rotate-180">⌄</span></summary>
                  <div className="border-t border-slate-700/60 px-6 py-5 text-sm leading-7 text-slate-400">You can explore our available vehicles and review their details. Follow the booking process to provide your trip information and complete your reservation.</div>
                </details>
                <details className="group overflow-hidden rounded-[20px] border border-slate-700/60 bg-[#10182b]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-6 text-base font-extrabold text-white"><span>What documents are required upon vehicle pickup?</span><span className="text-xl text-sky-400 transition-transform duration-300 group-open:rotate-180">⌄</span></summary>
                  <div className="border-t border-slate-700/60 px-6 py-5 text-sm leading-7 text-slate-400">You should generally bring a valid driving licence and an identification document. Additional requirements may depend on the vehicle and rental location.</div>
                </details>
                <details className="group overflow-hidden rounded-[20px] border border-slate-700/60 bg-[#10182b]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-6 text-base font-extrabold text-white"><span>Is full insurance included with the daily rate?</span><span className="text-xl text-sky-400 transition-transform duration-300 group-open:rotate-180">⌄</span></summary>
                  <div className="border-t border-slate-700/60 px-6 py-5 text-sm leading-7 text-slate-400">Insurance coverage depends on the vehicle and rental terms. Please confirm the coverage and any additional charges before completing your booking.</div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* =====================================
          APP DOWNLOAD POPUP
          (Sirf Rent Now button par khulta hai)
      ===================================== */}

      {showAppPopup && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/80 px-3 py-5 backdrop-blur-md"
          onClick={closeAppPopup}
        >
          <div
            className="relative my-auto grid w-full max-w-[1000px] overflow-hidden rounded-[28px] border border-blue-500 bg-[#030a1e] text-white shadow-[0_0_60px_rgba(37,99,235,0.35)] md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={closeAppPopup}
              aria-label="Close app popup"
              className="absolute right-5 top-5 z-20 rounded-lg p-1.5 text-white transition hover:bg-white/10"
            >
              <X size={28} strokeWidth={3} />
            </button>

            {/* LEFT SIDE: BRAND + CAR */}

            <div className="relative flex min-h-[320px] flex-col overflow-hidden bg-gradient-to-br from-[#04123a] via-[#061a52] to-[#030a1e] p-6 sm:p-8 md:min-h-[560px]">
              <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-sky-500/20 blur-3xl" />

              {/* LOGO */}

              <div className="relative z-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/40">
                  <Gauge size={32} className="text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold tracking-wide">
                    VELOCITY
                  </h3>
                  <p className="text-xs font-medium text-sky-300 sm:text-sm">
                    Drive &nbsp;•&nbsp; Explore &nbsp;•&nbsp; Freedom
                  </p>
                </div>
              </div>

              {/* CAR IMAGE */}

              <div className="relative z-10 mt-auto flex flex-1 items-end justify-center pt-6">
                {appVehicle?.imageUrl ? (
                  <img
                    src={getImageUrl(appVehicle.imageUrl)}
                    alt={appVehicle.name || "Vehicle"}
                    className="max-h-[260px] w-full rounded-2xl object-cover shadow-2xl shadow-blue-900/60"
                  />
                ) : (
                  <CarFront size={160} className="text-sky-400/80" />
                )}
              </div>

              {/* GLOWING PLATFORM */}

              <div className="relative z-10 mx-auto mt-4 h-3 w-[85%] rounded-full bg-blue-500/80 shadow-[0_0_30px_rgba(59,130,246,0.9)]" />

              {appVehicle?.name && (
                <p className="relative z-10 mt-3 text-center text-sm font-bold text-slate-300">
                  {appVehicle.name}
                </p>
              )}
            </div>

            {/* RIGHT SIDE: CONTENT */}

            <div className="flex flex-col p-6 sm:p-8">
              {/* BADGE */}

              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-400/10 px-3 py-1.5 text-xs font-extrabold tracking-wide text-cyan-300">
                <Zap size={16} className="text-cyan-300" />
                RENT ANYTIME, ANYWHERE
              </div>

              {/* HEADING */}

              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Rent your Dream car
                <br />
                <span className="text-sky-400">For a Better Journey</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-200 sm:text-base">
                Book your favorite cars, manage your reservations, and enjoy
                a seamless rental experience — all from your phone.
              </p>

              {/* FEATURES */}

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10">
                    <Smartphone size={22} className="text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold">Easy Booking</h4>
                    <p className="text-sm text-slate-300">
                      Book in just a few taps
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10">
                    <ShieldCheck size={22} className="text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold">Secure Payments</h4>
                    <p className="text-sm text-slate-300">
                      Safe & reliable transactions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/70 bg-blue-500/10">
                    <Headphones size={22} className="text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold">24/7 Support</h4>
                    <p className="text-sm text-slate-300">
                      We're always here for you
                    </p>
                  </div>
                </div>
              </div>

              {/* CALL + DOWNLOAD */}

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href="tel:+923489418187"
                  className="flex items-center gap-3 rounded-full border border-blue-500/70
                   bg-blue-500/5 px-2.4 py-2.5 transition hover:bg-blue-500/15"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center
                   justify-center rounded-full bg-blue-500/20">
                    <Phone size={20} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-300">
                      Need Help? Call Us Now
                    </p>
                    <p className="text-sm font-extrabold text-cyan-300 sm:text-base">
                      +92 348 9418187
                    </p>
                  </div>
                </a>

                
              </div>

             

              <button
                type="button"
                onClick={continueOnWeb}
                className="mt-5 text-center text-sm font-bold text-sky-400 underline-offset-4 transition hover:text-sky-300 hover:underline"
              >
                Continue on Web →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          BOOKING POPUP
      ===================================== */}

      {showPopup && selectedVehicle && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 px-3 py-5 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="my-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-slate-700 bg-[#10192c] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* POPUP HEADER */}

            <div className="border-b border-slate-700 bg-[#080f20] px-5 py-5 sm:px-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold sm:text-2xl">
                    {selectedVehicle.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {selectedVehicle.category || "Vehicle"} • ${dailyPrice}/day
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close booking popup"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* BOOKING STEPS */}

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold sm:text-xs">
                <div className="rounded-xl bg-sky-500 px-2 py-3 text-white">
                  1. TRIP SCHEDULE
                </div>

                <div className="rounded-xl bg-slate-800 px-2 py-3 text-slate-400">
                  2. DRIVER INFO
                </div>

                <div className="rounded-xl bg-slate-800 px-2 py-3 text-slate-400">
                  3. CONFIRMATION
                </div>
              </div>
            </div>

            {/* BOOKING FORM */}

            <form
              onSubmit={handleBookingSubmit}
              className="space-y-5 p-5 sm:p-7"
            >
              {/* PICKUP AND RETURN DATES */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-400">
                    PICK-UP DATE
                  </label>

                  <input
                    type="date"
                    name="pickupdate"
                    required
                    min={getTodayDate()}
                    value={bookingData.pickupdate}
                    onChange={handleBookingChange}
                    className="w-full rounded-2xl border border-slate-700 bg-[#202c40] px-4 py-3 font-semibold text-white outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-400">
                    RETURN DATE
                  </label>

                  <input
                    type="date"
                    name="returndate"
                    required
                    min={bookingData.pickupdate || getTodayDate()}
                    value={bookingData.returndate}
                    onChange={handleBookingChange}
                    className="w-full rounded-2xl border border-slate-700 bg-[#202c40] px-4 py-3 font-semibold text-white outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* VIP ADD-ONS */}

              <div>
                <label className="mb-3 block text-xs font-bold text-slate-400">
                  SELECT VIP ADD-ONS
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {addonOptions.map((addon) => (
                    <label
                      key={addon.name}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-700 bg-[#202c40] px-3 py-3 text-sm font-semibold transition hover:border-sky-500"
                    >
                      <input
                        type="checkbox"
                        checked={bookingData.addons.includes(addon.name)}
                        onChange={() => handleAddonChange(addon.name)}
                        className="h-4 w-4 accent-sky-500"
                      />

                      <span>
                        {addon.name} (${addon.price}/day)
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PROMO CODE */}

              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="promocode"
                    value={bookingData.promocode}
                    onChange={handleBookingChange}
                    placeholder="PROMO CODE (TRY 'RENT20')"
                    className="min-w-0 flex-1 rounded-2xl border border-slate-700 bg-[#202c40] px-4 py-3 text-sm font-semibold uppercase text-white outline-none focus:border-sky-500"
                  />

                  <button
                    type="button"
                    onClick={applyPromoCode}
                    className="rounded-2xl bg-slate-700 px-5 py-3 text-sm font-extrabold transition hover:bg-slate-600"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p className="mt-2 text-sm text-sky-400">
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* PRICE SUMMARY */}

              <div className="rounded-2xl border border-slate-700 bg-[#192438] p-4 sm:p-5">
                <div className="flex justify-between gap-3 py-1 text-sm text-slate-400">
                  <span>Base Rate Daily</span>
                  <span className="font-bold text-slate-300">
                    ${dailyPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 py-1 text-sm text-slate-400">
                  <span>Duration</span>
                  <span>{rentalDays} Day(s)</span>
                </div>

                <div className="flex justify-between gap-3 py-1 text-sm text-slate-400">
                  <span>Base Amount</span>
                  <span>${baseAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between gap-3 py-1 text-sm text-slate-400">
                  <span>Add-ons Total</span>
                  <span>${addonsTotal.toFixed(2)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between gap-3 py-1 text-sm text-emerald-400">
                    <span>Promo Discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-700 pt-4">
                  <span className="font-extrabold">Total Amount</span>

                  <span className="text-xl font-extrabold text-sky-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* NEXT BUTTON */}

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-sky-400 active:scale-[0.99]"
              >
                Next: Driver Information →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreFleet;