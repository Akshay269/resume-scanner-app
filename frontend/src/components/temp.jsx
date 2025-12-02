import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function DebugToken() {
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      console.log("User:", user);
      console.log("Token:", await getToken());
    })();
  }, []);

  return null;
}
