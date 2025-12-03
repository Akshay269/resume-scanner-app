// src/components/EducationCard.jsx

export default function EducationCard({ index, register, remove }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mt-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="font-semibold">Institution</label>
          <input
            {...register(`education.${index}.institution`)}
            className="w-full border p-2 rounded"
            placeholder="College / University"
          />
        </div>

        <div>
          <label className="font-semibold">Degree</label>
          <input
            {...register(`education.${index}.degree`)}
            className="w-full border p-2 rounded"
            placeholder="Degree (e.g. B.Tech)"
          />
        </div>

        <div>
          <label className="font-semibold">Start Year</label>
          <input
            {...register(`education.${index}.startYear`)}
            className="w-full border p-2 rounded"
            placeholder="e.g. 2020"
          />
        </div>

        <div>
          <label className="font-semibold">End Year</label>
          <input
            {...register(`education.${index}.endYear`)}
            className="w-full border p-2 rounded"
            placeholder="e.g. 2024"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="mt-3 px-3 py-2 bg-red-500 text-white rounded"
      >
        Remove Education
      </button>
    </div>
  );
}
