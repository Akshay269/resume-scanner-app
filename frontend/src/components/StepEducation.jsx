// src/components/StepEducation.jsx

import { useFieldArray } from "react-hook-form";
import EducationCard from "./EducationCard";

export default function StepEducation({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Education</h2>

      {fields.length === 0 && (
        <p className="text-gray-500">No education added yet.</p>
      )}

      {fields.map((item, index) => (
        <EducationCard
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
            institution: "",
            degree: "",
            startYear: "",
            endYear: "",
          })
        }
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Education
      </button>
    </div>
  );
}
