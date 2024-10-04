import { useState } from "react";
import { toast } from "sonner";

function useEditNote() {
  const [loading, setLoading] = useState(false);

  const editNote = async (noteId, title, content) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("taskNext-token");
      if (!token) {
        throw new Error("User not logged in: token not found");
      }

      const res = await fetch(`api/note/edit-note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Note edited successfully");
      return true;
    } catch (error) {
      console.log("ERROR WHILE EDITING NOTE: ", error);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { editNote, loading };
}

export default useEditNote;
