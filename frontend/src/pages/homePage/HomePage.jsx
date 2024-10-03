import AddNewNote from "@/components/_homePageComponents/AddNewNote";
import HomePageHeader from "@/components/_homePageComponents/HomePageHeader";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HomePageHeader />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 my-8 p-5">
        <AddNewNote />
     
      </div>
    </div>
  );
};

export default HomePage;
