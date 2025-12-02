import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStepStore } from "../store/stepStore";
import { useApi } from "../api/axios";
import { useEffect } from "react";

import StepPersonal from "../components/StepPersonal";
import StepSkills from "../components/StepSkills";
import StepExperience from "../components/StepExperience";
import StepEducation from "../components/StepEducation";
import StepProjects from "../components/StepProjects";
// console.log("StepPersonal:", StepPersonal);
// console.log("StepSkills:", StepSkills);
// console.log("StepExperience:", StepExperience);
// console.log("StepEducation:", StepEducation);
// console.log("StepProjects:", StepProjects);
const steps = [
  StepPersonal,
  StepSkills,
  StepExperience,
  StepEducation,
  StepProjects,
];

export default function MultiStepForm() {
  const api = useApi();
  const location = useLocation();

  const { currentStep, setStep, formData, setFormData } = useStepStore();

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: formData,
  });

  const CurrentStepComponent = steps[currentStep - 1];

  //Prefill from UploadResume
  useEffect(() => {
    if (location.state?.prefill) {
      const prefill = location.state.prefill;
      setFormData({ personal: prefill });
      Object.keys(prefill).forEach((key) => {
        if (key in formData.personal) {
          setValue(`personal.${key}`, prefill[key]);
        }
      });
    }
  }, []);

  useEffect(() => {
    const loadDraft = async () => {
      const res = await api.get("/profile/draft");
      if (res.data) {
        setFormData(res.data.formData);
        const step = Number(res.data.currentStep);
        if (step >= 1 && step <= steps.length) {
          setStep(step);
        } else {
          console.warn("Invalid step in draft, resetting to 1");
          setStep(1);
        }

        Object.entries(res.data.formData).forEach(([section, values]) => {
          Object.entries(values).forEach(([key, val]) => {
            setValue(`${section}.${key}`, val);
          });
        });
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
    setFormData(values);

    await api.post("/profile/save-draft", {
      currentStep,
      formData: values,
    });

    alert("Draft saved!");
  };

  console.log("Rendering step:", CurrentStepComponent?.name);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
      <p className="mb-6 text-gray-600">
        Step {currentStep} of {steps.length}
      </p>

      <form onSubmit={handleSubmit(nextStep)}>
        <CurrentStepComponent register={register} />

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
  );
}
