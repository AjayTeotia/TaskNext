import { useState } from "react";
import { toast } from "sonner";

function useAddNewNote() {
  const [loading, setLoading] = useState(false);

  const handleInputError = ({ title, content }) => {
    if (!title || !content) {
      toast.error("PLEASE FILL ALL FIELDS");
      return false;
    }

    return true;
  };

  const addNewNote = async ({ title, content }) => {
    const isValid = handleInputError({ title, content });
    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("taskNext-token");
      if (!token) {
        throw new Error("User not logged in: token not found");
      }

      const user = JSON.parse(localStorage.getItem("taskNext-user"));
      if (!user) {
        throw new Error("User not logged in: user not found");
      }

      const res = await fetch("api/note/create-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, userId: user._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "An error occurred");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (res.ok) {
        toast.success("NOTE ADDED SUCCESSFULLY");
        return true;
      }

      return false;
    } catch (error) {
      console.log("ERROR WHILE ADDING NEW NOTE: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { addNewNote, loading };
}

export default useAddNewNote;
