// src/components/ProjectCard.jsx

export default function ProjectCard({ index, register, remove }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mt-4">

      <div>
        <label className="font-semibold">Project Name</label>
        <input
          {...register(`projects.${index}.name`)}
          className="w-full border p-2 rounded"
          placeholder="Project name"
        />
      </div>

      <div className="mt-4">
        <label className="font-semibold">Description</label>
        <textarea
          {...register(`projects.${index}.description`)}
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="Explain what you built"
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="font-semibold">Tech Stack (comma separated)</label>
        <input
          {...register(`projects.${index}.techStackString`)}
          className="w-full border p-2 rounded"
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="mt-3 px-3 py-2 bg-red-500 text-white rounded"
      >
        Remove Project
      </button>

    </div>
  );
}
