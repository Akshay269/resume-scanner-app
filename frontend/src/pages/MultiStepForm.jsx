// import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStepStore } from "../store/stepStore";
import { useApi } from "../api/axios";
import { useEffect, useState } from "react";

import StepPersonal from "../components/StepPersonal";
import StepSkills from "../components/StepSkills";
import StepExperience from "../components/StepExperience";
import StepEducation from "../components/StepEducation";
import StepProjects from "../components/StepProjects";

import {
  convertProjectsForUI,
  convertProjectsForSave,
} from "../helper/techStackConversion";

const steps = [
  StepPersonal,
  StepSkills,
  StepExperience,
  StepEducation,
  StepProjects,
];

export default function MultiStepForm() {
  const api = useApi();
  // const location = useLocation();

  const { currentStep, setStep, setFormData } = useStepStore();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, getValues, control, reset } = useForm();

  const CurrentStepComponent = steps[currentStep - 1];

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formDataObj = new FormData();
      formDataObj.append("resume", file);

      const res = await api.post("/resume/upload", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", res);

      const parsed = res.data?.data; // the object you showed

      // ----  PREP PROCESSING ----

      // Convert projects techStack into techStackString (UI field)
      if (parsed.projects) {
        parsed.projects = parsed.projects.map((p) => ({
          ...p,
          techStackString: Array.isArray(p.techStack)
            ? p.techStack.join(", ")
            : "",
        }));
      }

      // Convert skills from array → correct for UI
      if (Array.isArray(parsed.skills)) {
        parsed.skills = parsed.skills.map((s) => s.trim());
      }

      // ---- 🔥 UPDATE ZUSTAND ----
      setFormData(parsed);

      // ---- 🔥 HYDRATE FORM ----
      console.log("RESETTING WITH:", parsed);
      reset(parsed);

      alert("Resume data extracted!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Resume upload failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDraft = async () => {
      const res = await api.get("/profile/draft");
      if (res.data) {
        // 🔥 Convert projects for UI

        const form = res.data.formData;

        if (form.projects) {
          form.projects = convertProjectsForUI(form.projects);
        }

        setFormData(form);

        const step = Number(res.data.currentStep);
        if (step >= 1 && step <= steps.length) {
          setStep(step);
        } else {
          console.warn("Invalid step in draft, resetting to 1");
          setStep(1);
        }

        reset(form);
        // Object.entries(res.data.formData).forEach(([section, values]) => {
        //   Object.entries(values).forEach(([key, val]) => {
        //     setValue(`${section}.${key}`, val);
        //   });
        // });
      }
    };
    loadDraft();
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length) setStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  const saveDraft = async () => {
    const values = getValues();
    console.log("he", values);

    if (values.projects) {
      values.projects = convertProjectsForSave(values.projects);
    }

    setFormData(values);

    await api.post("/profile/save-draft", {
      currentStep,
      formData: values,
    });

    alert("Draft saved!");
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
        <p className="mb-6 text-gray-600">
          Step {currentStep} of {steps.length}
        </p>

        <form onSubmit={handleSubmit(nextStep)}>
          <CurrentStepComponent
            register={register}
            control={control}
            onFileUpload={handleResumeUpload}
          />

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Back
              </button>
            )}

            <button
              type="button"
              onClick={saveDraft}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save as Draft
            </button>

            {currentStep < steps.length ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Finish
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
