import AddNewNote from "@/components/_homePageComponents/AddNewNote";
import HomePageHeader from "@/components/_homePageComponents/HomePageHeader";
import NoteCard from "@/components/_homePageComponents/NoteCard";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HomePageHeader />

      <div className="p-5 gap-5">
        <div className="w-full mb-5">
          <AddNewNote />
        </div>

        <NoteCard />
      </div>
    </div>
  );
};

export default HomePage;
