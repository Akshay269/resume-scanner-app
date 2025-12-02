export default function StepPersonal({ register }) {
  return (
    <div className="space-y-4">
      <div>
        <label>Name</label>
        <input
          {...register("personal.name")}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          {...register("personal.email")}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          {...register("personal.phone")}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Summary</label>
        <textarea
          {...register("personal.summary")}
          className="w-full border p-2 rounded"
        ></textarea>
      </div>
    </div>
  );
}
