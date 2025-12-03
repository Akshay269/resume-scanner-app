import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-semibold text-blue-600">
        JobPortal
      </Link>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
