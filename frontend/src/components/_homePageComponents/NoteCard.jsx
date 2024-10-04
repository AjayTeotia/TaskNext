import React, { useEffect, useState } from "react";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { DeleteIcon, PinIcon, RefreshCwIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import useDeleteNote from "@/hooks/useDeleteNote";
import usePinnedNote from "@/hooks/usePinnedNote";
import EditNote from "./EditNote";

const NoteCard = () => {
  const { getAllNotes, loading, notes, triggerRefresh } = useGetAllNotes();
  const { deleteNote } = useDeleteNote();
  const { pinNote } = usePinnedNote();

  // State to manage pinned notes
  const [pinnedNotes, setPinnedNotes] = useState({});

  const handleDelete = async (noteId) => {
    try {
      const success = await deleteNote(noteId);
      if (success) {
        triggerRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePin = async (noteId) => {
    try {
      const isPinned = !pinnedNotes[noteId];
      const success = await pinNote(noteId, isPinned);
      if (success) {
        setPinnedNotes((prev) => ({
          ...prev,
          [noteId]: isPinned,
        }));
        triggerRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl md:text-2xl my-5">Your Notes</h2>
        <Button
          className="flex items-center gap-2 text-base"
          onClick={triggerRefresh}
        >
          <RefreshCwIcon />
          <p>Refresh</p>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-[130px] w-full rounded-xl mb-5"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.length === 0 ? (
            <p className="text-center border-2 shadow-lg rounded-xl w-full p-3">
              No notes available
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="border-2 shadow-lg rounded-xl w-full p-3 mb-4"
              >
                <PinIcon
                  onClick={() => handlePin(note._id)}
                  className={`float-right hover:cursor-pointer hover:scale-110 ${
                    pinnedNotes[note._id] ? "text-blue-500" : ""
                  }`}
                />
                <h2 className="text-lg font-bold my-2 text-[#005C97]">
                  {note.title}
                </h2>
                <h2 className="font-bold my-2 text-md text-muted-foreground">
                  {note.content}
                </h2>
                <h2 className="font-bold text-xs my-5 text-muted-foreground">
                  Created At: {new Date(note.createdAt).toLocaleString()}
                </h2>
                <div className="flex items-center float-right -mt-5 gap-1">
                  <EditNote note={note} triggerRefresh={triggerRefresh} />
                  <DeleteIcon
                    onClick={() => handleDelete(note._id)}
                    className="hover:text-red-500 hover:cursor-pointer hover:scale-110"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
