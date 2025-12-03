// src/components/StepProjects.jsx

import { useFieldArray } from "react-hook-form";
import ProjectCard from "./ProjectCard";

export default function StepProjects({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Projects</h2>

      {fields.length === 0 && (
        <p className="text-gray-500">No projects added yet.</p>
      )}

      {fields.map((item, index) => (
        <ProjectCard
          key={item.id}
          index={index}
          register={register}
          remove={remove}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            description: "",
            techStackString: "",
          })
        }
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Project
      </button>
    </div>
  );
}
