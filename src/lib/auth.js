// Lightweight, browser-only "auth". There is no server: usernames and
// passwords live in this browser's localStorage. Good enough to let a
// few people share one computer with separate meal plans — not real
// security, since anyone with devtools access to this browser could
// read the stored data.

const USERS_KEY = "kl.users";

function readUsers() {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Not cryptographic — just avoids storing raw passwords in plain text
// in localStorage. Do not reuse this pattern for anything real.
async function hash(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function registerUser(username, password) {
  const clean = username.trim().toLowerCase();
  if (!clean || !password) return { ok: false, error: "Enter a username and password." };
  const users = readUsers();
  if (users.some((u) => u.username === clean)) {
    return { ok: false, error: "That username is already taken." };
  }
  const passwordHash = await hash(password);
  users.push({ username: clean, passwordHash });
  writeUsers(users);
  return { ok: true, username: clean };
}

export async function loginUser(username, password) {
  const clean = username.trim().toLowerCase();
  const users = readUsers();
  const user = users.find((u) => u.username === clean);
  if (!user) return { ok: false, error: "No account with that username." };
  const passwordHash = await hash(password);
  if (passwordHash !== user.passwordHash) {
    return { ok: false, error: "Incorrect password." };
  }
  return { ok: true, username: clean };
}
