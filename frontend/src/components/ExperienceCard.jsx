// src/components/ExperienceCard.jsx
export default function ExperienceCard({ index, register, remove }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mt-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="font-semibold">Company</label>
          <input
            {...register(`experience.${index}.company`)}
            className="w-full border p-2 rounded"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="font-semibold">Position</label>
          <input
            {...register(`experience.${index}.position`)}
            className="w-full border p-2 rounded"
            placeholder="Job Title"
          />
        </div>

        <div>
          <label className="font-semibold">Start Date</label>
          <input
            {...register(`experience.${index}.startDate`)}
            className="w-full border p-2 rounded"
            placeholder="e.g. Jan 2022"
          />
        </div>

        <div>
          <label className="font-semibold">End Date</label>
          <input
            {...register(`experience.${index}.endDate`)}
            className="w-full border p-2 rounded"
            placeholder="e.g. Present"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="font-semibold">Description</label>
        <textarea
          {...register(`experience.${index}.description`)}
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="Describe your role and responsibilities"
        />
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="mt-3 px-3 py-2 bg-red-500 text-white rounded"
      >
        Remove Experience
      </button>
    </div>
  );
}
