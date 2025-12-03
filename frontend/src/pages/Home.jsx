import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-20 text-center">
      <h1 className="text-5xl font-bold text-gray-800">Welcome to JobPortal</h1>
      <p className="mt-4 text-gray-600 text-lg">Find your next job easily</p>

      <SignedOut>
        <p className="mt-6 text-gray-700">Please sign in to view job listings</p>
      </SignedOut>

      <SignedIn>
        <Link
          to="/jobs"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Go to Jobs
        </Link>
      </SignedIn>
    </div>
  );
}
