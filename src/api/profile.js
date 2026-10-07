const PROFILE_KEY = "skillbridge_profile";

export function getProfile() {
  const saved = localStorage.getItem(PROFILE_KEY);

  if (saved) {
    return Promise.resolve(JSON.parse(saved));
  }

  return Promise.resolve({
    education: "",
    skills: [],
    projects: [],
    interests: [],
  });
}

export function saveProfile(payload) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(payload));

  return Promise.resolve(payload);
}