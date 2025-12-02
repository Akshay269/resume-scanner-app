export function normalizeResume(data) {
  const safe = (v, fallback = "") => (v ? v : fallback);

  return {
    name: safe(data.name),
    email: safe(data.email),
    phone: safe(data.phone),
    summary: safe(data.summary),
    skills: data.skills || [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    projects: Array.isArray(data.projects) ? data.projects : []
  };
}
