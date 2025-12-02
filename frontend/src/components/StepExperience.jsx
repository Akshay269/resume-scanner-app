export default function StepExperience({ register }) {
  return (
    <div>
      <label>Experience</label>
      <textarea
        {...register("experience")}
        className="w-full border p-2 rounded"
        placeholder="Describe experience here..."
      ></textarea>
    </div>
  );
}
