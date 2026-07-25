import { useState } from "react";
import { registerUser, loginUser } from "../lib/auth";

export default function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "register" && password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setBusy(true);
    const result =
      mode === "login" ? await loginUser(username, password) : await registerUser(username, password);
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAuthed(result.username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="ledger-card w-full max-w-sm p-6">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl">The Kitchen Ledger</h1>
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink2 mt-1">
            {mode === "login" ? "Sign in to your ledger" : "Open a new ledger"}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="font-mono text-[11px] tracking-widest uppercase text-ink2 block mb-1">
              Username
            </label>
            <input
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full font-mono text-sm bg-card border border-line rounded-sm px-3 py-2 focus:outline-none focus:border-stamp"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] tracking-widest uppercase text-ink2 block mb-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-mono text-sm bg-card border border-line rounded-sm px-3 py-2 focus:outline-none focus:border-stamp"
            />
          </div>
          {mode === "register" && (
            <div>
              <label className="font-mono text-[11px] tracking-widest uppercase text-ink2 block mb-1">
                Confirm password
              </label>
              <input
                required
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full font-mono text-sm bg-card border border-line rounded-sm px-3 py-2 focus:outline-none focus:border-stamp"
              />
            </div>
          )}

          {error && <p className="font-mono text-xs text-stamp">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="stamp bg-ink text-paper hover:bg-stamp transition-colors w-full py-2.5 disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
          className="font-mono text-[11px] text-ink2 hover:text-stamp underline underline-offset-2 mt-4 w-full text-center"
        >
          {mode === "login" ? "Need an account? Register" : "Already have an account? Sign in"}
        </button>

        <p className="font-mono text-[10px] text-ink2 text-center mt-5 pt-4 border-t border-dashed border-line">
          Stored only in this browser — no server, no sync across devices.
        </p>
      </div>
    </div>
  );
}
