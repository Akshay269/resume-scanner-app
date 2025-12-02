export default function StepSkills({ register }) {
  return (
    <div>
      <label>Skills (comma separated)</label>
      <input
        {...register("skills")}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
