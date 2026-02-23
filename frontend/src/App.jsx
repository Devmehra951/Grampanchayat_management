import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Festivals from "./pages/Festivals.jsx";
import Donations from "./pages/Donations.jsx";
import Development from "./pages/Development.jsx";
import Complaints from "./pages/Complaints.jsx";
import Users from "./pages/Users.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ShellLayout from "./routes/ShellLayout.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<ShellLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/development" element={<Development />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
