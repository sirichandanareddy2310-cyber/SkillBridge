import client from "./client";

// Returns [{ roleId, title, matchScore, summary }]
export function getRecommendations() {
  return client.get("/recommendations").then((r) => r.data);
}

// Returns { role, haveSkills: [], gapSkills: [] }
export function getSkillGap(roleId) {
  return client.get(`/roles/${roleId}/skill-gap`).then((r) => r.data);
}

// Returns [{ topic, description, resourceUrl }]
export function getRoadmap(roleId) {
  return client.get(`/roles/${roleId}/roadmap`).then((r) => r.data);
}
