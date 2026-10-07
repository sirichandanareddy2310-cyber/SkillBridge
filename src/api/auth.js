const USER_KEY = "skillbridge_user";

export function signup(payload) {
  localStorage.setItem(USER_KEY, JSON.stringify(payload));

  return Promise.resolve(payload);
}

export function login(email, password) {
  const saved = localStorage.getItem(USER_KEY);

  if (!saved) {
    return Promise.reject(new Error("No account found"));
  }

  const user = JSON.parse(saved);

  if (user.email !== email || user.password !== password) {
    return Promise.reject(new Error("Invalid email or password"));
  }

  return Promise.resolve(user);
}

export function fetchCurrentUser() {
  const saved = localStorage.getItem(USER_KEY);

  if (!saved) {
    return Promise.reject(new Error("Not logged in"));
  }

  return Promise.resolve(JSON.parse(saved));
}