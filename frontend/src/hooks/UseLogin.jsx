import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { toast } from "sonner";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleError = ({ username, password }) => {
    if (!username || !password) {
      toast.error("PLEASE FILL ALL FIELDS");
      return false;
    }

    if (password.length < 6) {
      toast.error("PASSWORD LENGTH MUST BE AT LEAST 6 CHARACTERS");
      return false;
    }

    return true;
  };

  const login = async ({ username, password }) => {
    const isValid = handleError({ username, password });

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (res.ok) {
        toast.success("LOGGED IN SUCCESSFULLY");

        localStorage.setItem("taskNext-user", JSON.stringify(data.user));
        localStorage.setItem("taskNext-token", JSON.stringify(data.token));
        setAuthUser(data);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}

export default useLogin;
