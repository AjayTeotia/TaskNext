import { useState } from "react";
import { toast } from "sonner";

function useDeleteNote() {
  const [loading, setLoading] = useState(false);

  const deleteNote = async (noteId) => {
    setLoading(true);

    //  console.log(noteId);

    try {
      const res = await fetch(`api/note/delete-note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("taskNext-token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Note deleted successfully");
      return true;
    } catch (error) {
      console.log("ERROR WHILE DELETING NOTE: ", error);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteNote, loading };
}

export default useDeleteNote;
