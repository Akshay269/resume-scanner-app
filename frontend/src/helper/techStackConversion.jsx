// Convert backend → react-hook-form compatible fields
export const convertProjectsForUI = (projects) => {
  if (!Array.isArray(projects)) return [];

  return projects.map((p) => ({
    ...p,
    techStackString: Array.isArray(p.techStack)
      ? p.techStack.join(", ")
      : "",
  }));
};

// Convert UI → backend format before saving
export const convertProjectsForSave = (projects) => {
  if (!Array.isArray(projects)) return [];

  return projects.map((p) => ({
    name: p.name,
    description: p.description,
    techStack: p.techStackString
      ? p.techStackString.split(",").map((t) => t.trim())
      : [],
  }));
};
