import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-semibold">
        Resume Builder
      </Link>

      <div>
        <SignedOut>
          <Link
            to="/sign-in"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign In
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
