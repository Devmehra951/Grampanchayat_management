import { Outlet } from "react-router-dom";
import AppShell from "../layouts/AppShell.jsx";

export default function ShellLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
