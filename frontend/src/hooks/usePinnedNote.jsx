import { useState } from "react";
import { toast } from "sonner";

function usePinnedNote() {
  const [loading, setLoading] = useState(false);

  const pinNote = async (noteId, isPinned) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("taskNext-token");
      if (!token) {
        throw new Error("User not logged in: token not found");
      }

      const res = await fetch(`api/note/is-pinned-note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPinned }), // Include the new pinned state
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Note pinned successfully");
      return true;
    } catch (error) {
      console.log("ERROR WHILE PINNING NOTE: ", error);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { pinNote, loading };
}

export default usePinnedNote;
