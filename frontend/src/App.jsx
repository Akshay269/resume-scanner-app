import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadResume from "./pages/UploadResume";
import MultiStepForm from "./pages/MultiStepForm";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
     <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Jobs - Protected */}
        <Route
          path="/jobs"
          element={
            <SignedIn>
              <Jobs />
            </SignedIn>
          }
        />

        {/* Form - Protected */}
        <Route
          path="/form/:jobId"
          element={
            <SignedIn>
              <MultiStepForm />
            </SignedIn>
          }
        />

        {/* Redirect unauth access */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
