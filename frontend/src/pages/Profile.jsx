import React from "react";
import Navebar from "../Component/Navebar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <Navebar />

      <div className="flex items-center justify-between p-5">
        <h1>Profile</h1>

        <button
          onClick={() => navigate("/CreateExplore")}
          className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Create Your Car
        </button>
      </div>
    </div>
  );
}

export default Profile;