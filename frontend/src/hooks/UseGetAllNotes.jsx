import React, { useState } from "react";
import { toast } from "sonner";

function useGetAllNotes() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("taskNext-token");
      if (!token) {
        throw new Error("User not logged in: token not found");
      }

      const res = await fetch("api/note/get-all-notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("All notes fetched successfully");
      setNotes(data.notes); 
    } catch (error) {
      console.log("Error while getting all notes: ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { getAllNotes, loading, notes }; 
}

export default useGetAllNotes;
