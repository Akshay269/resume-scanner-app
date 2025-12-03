import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { useApi } from "../api/axios";

import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const api = useApi();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await api.get("/jobs/alljobs");
        setJobs(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    loadJobs();
  }, []);

  const handleApply = (jobId) => {
    navigate(`/form/${jobId}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Available Jobs</h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job._id}
            to={`/form/${job._id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <p className="text-gray-600">{job.companyName}</p>
            <button
              onClick={() => handleApply(job._id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Apply Now
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
