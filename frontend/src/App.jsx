import { Routes, Route } from "react-router-dom";
import AppShell from "./layouts/AppShell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Festivals from "./pages/Festivals.jsx";
import Donations from "./pages/Donations.jsx";
import Development from "./pages/Development.jsx";
import Complaints from "./pages/Complaints.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/development" element={<Development />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </AppShell>
  );
}
