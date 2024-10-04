import React, { useEffect } from "react";
import useGetAllNotes from "@/hooks/useGetAllNotes";
import { DeleteIcon, PencilIcon, PinIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const NoteCard = () => {
  const { getAllNotes, loading, notes, triggerRefresh } = useGetAllNotes();

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl md:text-2xl my-5">Your Notes</h2>
        <Button onClick={triggerRefresh}>Refresh</Button>
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
                key={note.id}
                className="border-2 shadow-lg rounded-xl w-full p-3 mb-4"
              >
                <PinIcon className="float-right hover:text-blue-500 hover:cursor-pointer hover:scale-110" />
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
                  <PencilIcon className="hover:text-green-500 hover:cursor-pointer hover:scale-110" />
                  <DeleteIcon className="hover:text-red-500 hover:cursor-pointer hover:scale-110" />
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
