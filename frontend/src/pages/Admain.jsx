import React, { useEffect, useState } from "react";
import axios from "axios";
import Navebar from "../Component/Navebar";
import {
  Users,
  Mail,
  UserRound,
  Search,
  RefreshCw,
} from "lucide-react";

function Admain() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/user/Admain",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError("Users ka data nahi mila.");
      }
    } catch (error) {
      console.log("Get Users Error:", error);
      setError("Users ka data load nahi hua. Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((person) => {
    const name = person.name || "";
    const email = person.email || "";
    const searchText = search.toLowerCase();

    return (
      name.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen min-w-0 bg-slate-950 text-white md:ml-[265px]">
      <Navebar />

      <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
        {/* Page Heading */}
        <div className="mb-8 flex min-w-0 flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-300">
              <Users size={16} className="shrink-0" />
              <span>User Management</span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Admin <span className="text-blue-400">Dashboard</span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
              View registered users and their contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={getUsers}
            disabled={loading}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-400 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Users
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="min-w-0 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/60 p-5 shadow-xl sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-400">
                  Total Registered Users
                </p>

                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  {users.length}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Users saved in your database
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 sm:h-14 sm:w-14">
                <Users size={26} />
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/60 p-5 shadow-xl sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-400">
                  Displayed Users
                </p>

                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  {filteredUsers.length}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Matching your search
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 sm:h-14 sm:w-14">
                <UserRound size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Registered Users */}
        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Table Header */}
          <div className="flex min-w-0 flex-col justify-between gap-4 border-b border-slate-800 p-4 sm:p-6 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <h2 className="text-lg font-bold sm:text-xl">
                Registered Users
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                User names and email addresses
              </p>
            </div>

            <div className="relative w-full min-w-0 lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center px-4 py-16">
              <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

              <p className="text-sm text-slate-400">
                Loading registered users...
              </p>
            </div>
          ) : error ? (
            <div className="px-4 py-12 text-center sm:px-6">
              <p className="mb-4 break-words text-red-400">{error}</p>

              <button
                type="button"
                onClick={getUsers}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Try Again
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                <Users size={30} />
              </div>

              <h3 className="text-lg font-bold text-white">
                No Users Found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {search
                  ? "Try searching with a different name or email."
                  : "No registered users are available yet."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop and Tablet Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-slate-950/70">
                    <tr className="text-xs uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-4 font-semibold lg:px-6">
                        #
                      </th>

                      <th className="px-4 py-4 font-semibold lg:px-6">
                        User Name
                      </th>

                      <th className="px-4 py-4 font-semibold lg:px-6">
                        Email Address
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((person, index) => (
                      <tr
                        key={person._id || person.email}
                        className="border-t border-slate-800 transition hover:bg-slate-800/50"
                      >
                        <td className="px-4 py-5 text-sm text-slate-500 lg:px-6">
                          {index + 1}
                        </td>

                        <td className="px-4 py-5 lg:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                              {person.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <span className="break-words font-semibold text-slate-100">
                              {person.name || "Unnamed User"}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-5 lg:px-6">
                          <div className="flex items-center gap-3 text-sm text-slate-300">
                            <Mail
                              size={17}
                              className="shrink-0 text-blue-400"
                            />

                            <span className="break-all">
                              {person.email || "No email available"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile User Cards */}
              <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                {filteredUsers.map((person, index) => (
                  <div
                    key={person._id || person.email}
                    className="min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold">
                        {person.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words font-semibold text-white">
                          {person.name || "Unnamed User"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          User #{index + 1}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex min-w-0 items-start gap-3 border-t border-slate-800 pt-3 text-sm text-slate-300">
                      <Mail
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-400"
                      />

                      <span className="min-w-0 break-all">
                        {person.email || "No email available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          {!loading && !error && users.length > 0 && (
            <div className="border-t border-slate-800 px-4 py-4 text-xs text-slate-500 sm:px-6">
              Showing {filteredUsers.length} of {users.length} registered users
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admain;