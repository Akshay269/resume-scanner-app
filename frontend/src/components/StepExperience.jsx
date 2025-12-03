// src/components/StepExperience.jsx
import { useFieldArray } from "react-hook-form";
import ExperienceCard from "./ExperienceCard";

export default function StepExperience({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Experience</h2>

      {fields.length === 0 && (
        <p className="text-gray-500">No experience added yet.</p>
      )}

      {fields.map((item, index) => (
        <ExperienceCard
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
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Experience
      </button>
    </div>
  );
}
