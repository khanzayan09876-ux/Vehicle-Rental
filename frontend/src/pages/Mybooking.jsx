
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Navebar from "../Component/Navebar";

function Mybooking() {
  const navigate = useNavigate();

  // Demo booking data
  const [bookings, setBookings] = useState([
    {
      id: "BK-7019",
      customer: "Alex Mercer",
      vehicle: "Tesla Model S Plaid",
      startDate: "2026-10-10",
      endDate: "2026-10-14",
      duration: 4,
      amount: 910,
      status: "CANCELLED",
    },
  ]);

  // Remove a booking from the displayed list
  const handleArchive = (id) => {
    setBookings((previous) =>
      previous.filter((booking) => booking.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#050817] text-white mt-20">
   

      <main className="mx-auto min-h-screen w-full max-w-[1560px] px-4 py-6 sm:px-6 lg:px-10">
        {/* Page heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Local Reservations
            </h1>

            <p className="mt-1 text-sm text-slate-400 sm:text-base">
              All bookings saved in your browser session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/ExploreFleet")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-500"
          >
            <Plus size={19} />
            Rent Another Vehicle
          </button>
        </div>

        {/* Reservations table */}
        <section className="overflow-hidden rounded-[30px] border border-slate-800 bg-[#10192c]">
          {bookings.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#192438] text-xs font-bold uppercase text-slate-500">
                    <th className="px-5 py-6">Ref Code</th>
                    <th className="px-5 py-6">Customer</th>
                    <th className="px-5 py-6">Vehicle Model</th>
                    <th className="px-5 py-6">Dates</th>
                    <th className="px-5 py-6">Duration</th>
                    <th className="px-5 py-6">Total Amount</th>
                    <th className="px-5 py-6">Status</th>
                    <th className="px-5 py-6">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-slate-800 transition hover:bg-slate-800/30"
                    >
                      <td className="whitespace-nowrap px-5 py-6 text-sm font-extrabold text-sky-400">
                        {booking.id}
                      </td>

                      <td className="whitespace-nowrap px-5 py-6 text-sm font-bold">
                        {booking.customer}
                      </td>

                      <td className="whitespace-nowrap px-5 py-6 text-sm font-bold">
                        {booking.vehicle}
                      </td>

                      <td className="whitespace-nowrap px-5 py-6 text-sm text-slate-400">
                        {booking.startDate} → {booking.endDate}
                      </td>

                      <td className="whitespace-nowrap px-5 py-6 text-sm font-semibold">
                        {booking.duration} Day(s)
                      </td>

                      <td className="whitespace-nowrap px-5 py-6 text-sm font-extrabold text-sky-400">
                        ${booking.amount.toLocaleString("en-US")}
                      </td>

                      <td className="whitespace-nowrap px-5 py-6">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${
                            booking.status === "CANCELLED"
                              ? "border-rose-500/30 bg-rose-500/10 text-rose-500"
                              : booking.status === "CONFIRMED"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-6 text-sm text-slate-400">
                        {booking.status === "CANCELLED" ? (
                          <span>Archived</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleArchive(booking.id)}
                            className="rounded-lg bg-rose-500/10 px-3 py-2 font-bold text-rose-400 transition hover:bg-rose-500/20"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-20 text-center">
              <h2 className="text-xl font-bold">
                No Reservations Found
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                You don't have any reservations to display.
              </p>

              <button
                type="button"
                onClick={() => navigate("/ExploreFleet")}
                className="mt-6 rounded-xl bg-sky-600 px-5 py-3 font-bold transition hover:bg-sky-500"
              >
                Browse Vehicles
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Mybooking;