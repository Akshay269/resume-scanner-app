import { useState,  } from "react";
import { useApi } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const api = useApi();


  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreviewName(f ? f.name : "");
  };
  const uploadResume = async () => {
    if (!file) return alert("Please select a file to upload.");
    const form = new FormData();
    form.append("resume", file);

    setLoading(true);
    try {
      const res = await api.post("/resume/upload", form);
      setLoading(false);

      setParsedData(res.data.prefilledData);

      // redirect to multi-step form
      navigate("/form", { state: { prefill: res.data.prefilledData } });
    } catch (error) {
      console.error(error);
      alert("Error uploading resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">Upload Your Resume</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {/* File Input */}
        <label className="block mb-3 font-medium">Choose Resume (PDF):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4"
        />

        {previewName && (
          <p className="text-sm text-gray-600 mb-4">
            Selected File: <span className="font-semibold">{previewName}</span>
          </p>
        )}

        {/* Upload Button */}
        <button
          disabled={!file || loading}
          onClick={uploadResume}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Parsing Resume..." : "Upload & Continue"}
        </button>

        {/* Show Parsed Resume Data */}
        {parsedData && (
          <div className="mt-6 bg-gray-100 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">
              Extracted Resume Data:
            </h2>
            <pre className="text-sm">{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
