import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadResume from "./pages/UploadResume";
import MultiStepForm from "./pages/MultiStepForm";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import DebugToken from "./components/temp";

export default function App() {
  return (
    <BrowserRouter>
    <DebugToken />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route path="/" element={<UploadResume />} />
          <Route path="/form" element={<MultiStepForm />} />
        </Routes>
      </SignedIn>
    </BrowserRouter>
  );
}
