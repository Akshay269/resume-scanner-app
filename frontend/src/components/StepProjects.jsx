export default function StepProjects({ register }) {
  return (
    <div>
      <label>Projects</label>
      <textarea
        {...register("projects")}
        className="w-full border p-2 rounded"
      ></textarea>
    </div>
  );
}
