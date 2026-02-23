import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      const details = err?.response?.data?.errors;
      if (Array.isArray(details) && details.length) {
        setError(details.map((item) => item.message).join(", "));
      } else {
        setError(err?.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900"
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gram Panchayat Login</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Admin/Officer secure access</p>

        <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
        <input
          required
          type="email"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:bg-slate-800 dark:text-white"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />

        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
        <input
          required
          type="password"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:bg-slate-800 dark:text-white"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
