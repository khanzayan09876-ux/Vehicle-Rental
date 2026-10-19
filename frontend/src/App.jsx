
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import ExploreFleet from "./pages/ExploreFleet";
// import PriceEstimator from "./pages/PriceEstimator";
// import Mybooking from "./pages/Mybooking";
// import Fleetadmin from "./pages/Fleetadmin";
// import CreateExplore from "./pages/CreateExplore";
// import Detail from "./pages/Detail";
// import Profile from "./pages/Profile";
// import Rentnow from "./pages/Rentnow";
// import Update from "./pages/Update";
// import Admain from "./pages/Admain";

// import Sidebar from "./Component/Sidebar";

// // Auth Layout — Sidebar ke baghair
// function AuthLayout({ children }) {
//   return (
//     <div className="min-h-screen w-full bg-[#050b1c]">
//       <main className="min-h-screen w-full">
//         {children}
//       </main>
//     </div>
//   );
// }

// // Dashboard Layout — Sidebar ke saath, Footer ke baghair
// function DashboardLayout({ children }) {
//   return (
//     <div className="min-h-screen w-full bg-[#050b1c]">
//       <Sidebar />

//       <main className="ml-64 flex min-h-screen w-[calc(100%-16rem)] flex-col">
//         <div className="flex-1">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* HOME */}
//         <Route
//           path="/"
//           element={
//             <AuthLayout>
//               <ExploreFleet />
//             </AuthLayout>
//           }
//         />

//         {/* REGISTRATION */}
//         <Route
//           path="/Registration"
//           element={
//             <AuthLayout>
//               <Registration />
//             </AuthLayout>
//           }
//         />

//         {/* LOGIN */}
//         <Route
//           path="/login"
//           element={
//             <AuthLayout>
//               <Login />
//             </AuthLayout>
//           }
//         />

//         {/* PROFILE — NO SIDEBAR */}
//         <Route
//           path="/Profile"
//           element={
//             <AuthLayout>
//               <Profile />
//             </AuthLayout>
//           }
//         />

//         {/* RENT NOW — NO SIDEBAR */}
//         <Route
//           path="/Rentnow"
//           element={
//             <AuthLayout>
//               <Rentnow />
//             </AuthLayout>
//           }
//         />

//         {/* UPDATE — NO SIDEBAR */}
//         <Route
//           path="/Update"
//           element={
//             <AuthLayout>
//               <Update />
//             </AuthLayout>
//           }
//         />

//         {/* ADMAIN — NO SIDEBAR */}
//         <Route
//           path="/Admain"
//           element={
//             <AuthLayout>
//               <Admain />
//             </AuthLayout>
//           }
//         />

//         {/* EXPLORE FLEET */}
//         <Route
//           path="/ExploreFleet"
//           element={
//             <DashboardLayout>
//               <ExploreFleet />
//             </DashboardLayout>
//           }
//         />

//         {/* PRICE ESTIMATOR */}
//         <Route
//           path="/PriceEstimator"
//           element={
//             <DashboardLayout>
//               <PriceEstimator />
//             </DashboardLayout>
//           }
//         />

//         {/* MY BOOKING */}
//         <Route
//           path="/Mybooking"
//           element={
//             <DashboardLayout>
//               <Mybooking />
//             </DashboardLayout>
//           }
//         />

//         {/* DETAIL */}
//         <Route
//           path="/Detail"
//           element={
//             <DashboardLayout>
//               <Detail />
//             </DashboardLayout>
//           }
//         />

//         {/* FLEET ADMIN */}
//         <Route
//           path="/Fleetadmin"
//           element={
//             <DashboardLayout>
//               <Fleetadmin />
//             </DashboardLayout>
//           }
//         />

//         {/* CREATE EXPLORE */}
//         <Route
//           path="/CreateExplore"
//           element={
//             <DashboardLayout>
//               <CreateExplore />
//             </DashboardLayout>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ExploreFleet from "./pages/ExploreFleet";
import PriceEstimator from "./pages/PriceEstimator";
import Mybooking from "./pages/Mybooking";
import Fleetadmin from "./pages/Fleetadmin";
import CreateExplore from "./pages/CreateExplore";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Rentnow from "./pages/Rentnow";
import Update from "./pages/Update";
import Admain from "./pages/Admain";

import Sidebar from "./Component/Sidebar";
import Footer from "./Component/Footer";

// Auth Layout — Sidebar ke baghair
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#050b1c]">
      <main className="min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}

// Dashboard Layout — Sidebar ke saath
// showFooter={true} dene par hi Footer dikhega
function DashboardLayout({ children, showFooter = false }) {
  return (
    <div className="min-h-screen w-full bg-[#050b1c]">
      <Sidebar />

      <main className="ml-64 flex min-h-screen w-[calc(100%-16rem)] flex-col">
        <div className="flex-1">
          {children}
        </div>

        {showFooter && <Footer />}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <ExploreFleet />
            </AuthLayout>
          }
        />

        {/* REGISTRATION */}
        <Route
          path="/Registration"
          element={
            <AuthLayout>
              <Registration />
            </AuthLayout>
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* PROFILE — NO SIDEBAR */}
        <Route
          path="/Profile"
          element={
            <AuthLayout>
              <Profile />
            </AuthLayout>
          }
        />

        {/* RENT NOW — NO SIDEBAR */}
        <Route
          path="/Rentnow"
          element={
            <AuthLayout>
              <Rentnow />
            </AuthLayout>
          }
        />

        {/* UPDATE — NO SIDEBAR */}
        <Route
          path="/Update"
          element={
            <AuthLayout>
              <Update />
            </AuthLayout>
          }
        />

        {/* ADMAIN — NO SIDEBAR */}
        <Route
          path="/Admain"
          element={
            <AuthLayout>
              <Admain />
            </AuthLayout>
          }
        />

        {/* EXPLORE FLEET — FOOTER ✔ */}
        <Route
          path="/ExploreFleet"
          element={
            <DashboardLayout showFooter>
              <ExploreFleet />
            </DashboardLayout>
          }
        />

        {/* PRICE ESTIMATOR — FOOTER ✔ */}
        <Route
          path="/PriceEstimator"
          element={
            <DashboardLayout showFooter>
              <PriceEstimator />
            </DashboardLayout>
          }
        />

        {/* MY BOOKING — FOOTER ✔ */}
        <Route
          path="/Mybooking"
          element={
            <DashboardLayout showFooter>
              <Mybooking />
            </DashboardLayout>
          }
        />

        {/* DETAIL — NO FOOTER */}
        <Route
          path="/Detail"
          element={
            <DashboardLayout>
              <Detail />
            </DashboardLayout>
          }
        />

        {/* FLEET ADMIN — NO FOOTER */}
        <Route
          path="/Fleetadmin"
          element={
            <DashboardLayout>
              <Fleetadmin />
            </DashboardLayout>
          }
        />

        {/* CREATE EXPLORE — NO FOOTER */}
        <Route
          path="/CreateExplore"
          element={
            <DashboardLayout>
              <CreateExplore />
            </DashboardLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;