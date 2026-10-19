import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateExplore() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
    imageUrl: null,
    category: "",
    rating: "",
    engine: "",
    transmission: "",
    fuelType: "",
    seats: "",
    acceleration: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handlechange = (e) => {
    const { name, value, files } = e.target;

    setformdata((previous) => ({
      ...previous,
      [name]: files ? files[0] || null : value,
    }));
  };

  // Submit Form
  const handleSubmitefunction = async (e) => {
    e.preventDefault();

    if (!formdata.imageUrl) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formdata.name);
      data.append("ImageURL", formdata.imageUrl);
      data.append("category", formdata.category);
      data.append("rating", formdata.rating);
      data.append("engine", formdata.engine);
      data.append("transmission", formdata.transmission);
      data.append("fuelType", formdata.fuelType);
      data.append("seats", formdata.seats);
      data.append("acceleration", formdata.acceleration);
      data.append("price", formdata.price);

      const response = await axios.post(
        "http://localhost:3000/explore/exploreCreate",
        data
      );

      console.log("Explore Created:", response.data);

      if (response.data.success) {
        alert("Explore created successfully!");

        navigate("/ExploreFleet");
      } else {
        alert(
          response.data.message || "Explore creation failed"
        );
      }
    } catch (error) {
      console.error(
        "CREATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while creating explore"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700
       bg-slate-900 p-6 shadow-2xl sm:p-10">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Create Explore
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Add a new vehicle to your luxury fleet.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmitefunction}
          className="space-y-5"
        >
          {/* Vehicle Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Vehicle Name
            </label>

            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              placeholder="Enter vehicle name"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-sky-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Vehicle Image
            </label>

            <input
              type="file"
              name="imageUrl"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlechange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-sky-500"
            />

            {formdata.imageUrl && (
              <p className="mt-2 text-sm text-green-400">
                Selected: {formdata.imageUrl.name}
              </p>
            )}
          </div>

          {/* Category and Rating */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Category
              </label>

              <select
                name="category"
                value={formdata.category}
                onChange={handlechange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              >
                <option value="">Select Category</option>
                <option value="Sports">Sports</option>
                <option value="SUV">SUV</option>
                <option value="Electric">Electric</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Luxury">Luxury</option>
                <option value="Sedan">Sedan</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formdata.rating}
                onChange={handlechange}
                placeholder="e.g. 5"
                min="0"
                max="5"
                step="0.1"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Engine and Transmission */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Engine
              </label>

              <input
                type="text"
                name="engine"
                value={formdata.engine}
                onChange={handlechange}
                placeholder="e.g. 3.0L V6"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Transmission
              </label>

              <select
                name="transmission"
                value={formdata.transmission}
                onChange={handlechange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              >
                <option value="">Select Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
          </div>

          {/* Fuel Type and Seats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Fuel Type
              </label>

              <select
                name="fuelType"
                value={formdata.fuelType}
                onChange={handlechange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Seats
              </label>

              <input
                type="number"
                name="seats"
                value={formdata.seats}
                onChange={handlechange}
                placeholder="e.g. 5"
                min="1"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Acceleration and Price */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Acceleration
              </label>

              <input
                type="number"
                name="acceleration"
                value={formdata.acceleration}
                onChange={handlechange}
                placeholder="e.g. 4.5 seconds"
                min="0"
                step="0.1"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formdata.price}
                onChange={handlechange}
                placeholder="Enter rental price"
                min="0"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition hover:from-sky-400 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Create Explore"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/ExploreFleet")}
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateExplore;