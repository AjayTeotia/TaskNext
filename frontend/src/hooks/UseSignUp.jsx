import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { toast } from "sonner";

function useSignUp() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleInputError = ({ fullName, username, password }) => {
    if (!fullName || !username || !password) {
      toast.error("PLEASE FILL ALL FIELDS");
      return false;
    }

    if (password.length < 6) {
      toast.error("PASSWORD LENGTH MUST BE AT LEAST 6 CHARACTERS");
      return false;
    }

    return true;
  };

  const signup = async ({ fullName, username, password }) => {
    const isValid = handleInputError({
      fullName,
      username,
      password,
    });

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "An error occurred");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("SIGNUP SUCCESSFULLY");

      localStorage.setItem("taskNext-user", JSON.stringify(data));
      localStorage.setItem("taskNext-token", JSON.stringify(data.token));

      setAuthUser(data);

      //console.log(data);
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
}

export default useSignUp;
