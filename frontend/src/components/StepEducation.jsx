export default function StepEducation({ register }) {
  return (
    <div>
      <label>Education</label>
      <textarea
        {...register("education")}
        className="w-full border p-2 rounded"
      ></textarea>
    </div>
  );
}
