import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { toast } from "sonner";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true); // Start loading state
    try {
      const res = await fetch("api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setAuthUser(null);
        toast.success("Logged out successfully"); // Simplified message

        // Clear user data from localStorage
        localStorage.removeItem("taskNext-user");
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return { logout, loading };
}

export default useLogout;
