import AddNewNote from "@/components/_homePageComponents/AddNewNote";
import HomePageHeader from "@/components/_homePageComponents/HomePageHeader";
import NoteCard from "@/components/_homePageComponents/NoteCard";
import useGetAllNotes from "@/hooks/UseGetAllNotes";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HomePageHeader />

      <div className="p-5 gap-5 container mx-auto">
        <div className="w-full mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AddNewNote />
        </div>

        <hr />

        <NoteCard />
      </div>
    </div>
  );
};

export default HomePage;
