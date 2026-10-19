import React, { useState, useEffect } from "react";
import axios from "axios";
import Navebar from "../Component/Navebar";

const API = "http://localhost:3000";

function Update() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  // ==========================
  // LOAD VEHICLES
  // ==========================

  async function loadVehicles() {
    try {
      const res = await axios.get(`${API}/explore/getexplore`);
      setVehicles(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Load error:", err);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  function getImageUrl(image) {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API}/${image.replace(/\\/g, "/").replace(/^\/+/, "")}`;
  }

  // ==========================
  // EDIT POPUP
  // ==========================

  function openEdit(vehicle) {
    setEditing(vehicle);
    setForm({
      name: vehicle.name ?? "",
      category: vehicle.category ?? "",
      engine: vehicle.engine ?? "",
      transmission: vehicle.transmission ?? "",
      fuelType: vehicle.fuelType ?? "",
      seats: vehicle.seats ?? "",
      acceleration: vehicle.acceleration ?? "",
      price: vehicle.price ?? "",
      rating: vehicle.rating ?? "",
    });
    setNewImage(null);
    setPreview(getImageUrl(vehicle.imageUrl));
  }

  function closeEdit() {
    setEditing(null);
    setNewImage(null);
    setPreview("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG, PNG and WEBP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  }

  // ==========================
  // UPDATE
  // ==========================

  async function handleUpdate(e) {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name and price are required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("id", editing._id);
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (newImage) formData.append("ImageURL", newImage);

      const res = await axios.post(`${API}/explore/updateExplore`, formData);

      if (res.data.success) {
        alert("Vehicle updated successfully!");
        closeEdit();
        loadVehicles();
      } else {
        alert(res.data.message || "Update failed.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  // ==========================
  // DELETE
  // ==========================

  async function handleDelete(vehicle) {
    if (!window.confirm(`Delete "${vehicle.name}"?`)) return;

    try {
      const res = await axios.post(`${API}/explore/deleteapi`, {
        id: vehicle._id,
      });

      if (res.data.success) {
        setVehicles((prev) => prev.filter((v) => v._id !== vehicle._id));
      } else {
        alert(res.data.message || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-600 bg-[#202c40] px-4 py-2.5 text-sm font-semibold text-slate-200 outline-none focus:border-sky-500";
  const labelClass = "mb-1.5 block text-[11px] font-bold text-slate-400";

  return (
    <div className="min-h-screen bg-[#050b1c] pt-20 text-white">
      <Navebar />

      {/* md:pl-64 = sidebar ki chaurai ke barabar jagah, taake content na chhupe */}
      <main className="mx-auto max-w-[1400px] px-4 pb-10 pt-8 md:pl-72">
        <h1 className="text-3xl font-extrabold">Update Vehicles</h1>
        <p className="mt-1 text-slate-400">
          Yahan ke changes Explore Fleet page par show honge.
        </p>

        {loading ? (
          <p className="py-10 text-center text-slate-400">Loading...</p>
        ) : vehicles.length === 0 ? (
          <p className="py-10 text-center text-slate-400">No vehicles found.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((v) => (
              <div
                key={v._id}
                className="overflow-hidden rounded-[25px] border border-slate-700/70 bg-[#10182b] shadow-xl"
              >
                {/* VEHICLE IMAGE (poori gari nazar aaye) */}

                <div className="relative h-[200px] overflow-hidden bg-[#0a1020]">
                  {v.imageUrl ? (
                    <>
                      <img
                        src={getImageUrl(v.imageUrl)}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl"
                      />

                      <img
                        src={getImageUrl(v.imageUrl)}
                        alt={v.name}
                        className="relative z-10 h-full w-full object-contain"
                      />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold">{v.name}</h3>
                  <p className="text-sm text-sky-300">
                    {v.category} • {v.engine}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-2xl font-extrabold">
                      ${Number(v.price || 0)}
                      <span className="text-sm font-medium text-slate-400">
                        {" "}/ day
                      </span>
                    </span>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(v)}
                        className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-extrabold transition hover:scale-[1.03]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(v)}
                        className="rounded-xl bg-red-500/10 px-4 py-2 text-sm font-extrabold text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* EDIT POPUP */}

      {editing && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 px-3 py-5 backdrop-blur-sm"
          onClick={closeEdit}
        >
          <form
            onSubmit={handleUpdate}
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-[720px] space-y-4 rounded-2xl border border-slate-700 bg-[#10192c] p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Edit {editing.name}</h2>
              <button
                type="button"
                onClick={closeEdit}
                className="text-2xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>NAME</label>
                <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CATEGORY</label>
                <input name="category" value={form.category} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>ENGINE</label>
                <input name="engine" value={form.engine} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>TRANSMISSION</label>
                <input name="transmission" value={form.transmission} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>FUEL TYPE</label>
                <input name="fuelType" value={form.fuelType} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>SEATS</label>
                <input type="number" name="seats" value={form.seats} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>0-60 (SECONDS)</label>
                <input type="number" step="0.1" name="acceleration" value={form.acceleration} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>PRICE / DAY ($)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>RATING</label>
                <input type="number" step="0.1" max="5" name="rating" value={form.rating} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>NEW IMAGE (optional)</label>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} className={inputClass} />
              </div>
            </div>

            {preview && (
              <div className="h-40 w-full overflow-hidden rounded-xl bg-[#0a1020]">
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-2xl bg-sky-500 px-5 py-3 text-sm font-extrabold transition hover:bg-sky-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Vehicle"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Update;