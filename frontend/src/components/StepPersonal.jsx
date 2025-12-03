export default function StepPersonal({ register, onFileUpload }) {
  return (
    <div className="space-y-6">

      {/* 🔥 File Upload Section */}
      <div>
        <label className="font-semibold">Upload Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          className="w-full border p-2 rounded"
          onChange={onFileUpload}
        />
      </div>

      {/* Personal Fields */}
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
