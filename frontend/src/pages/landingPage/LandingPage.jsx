import LandingPageHeader from "@/components/_landingPageComponents/LandingPageHeader";
import LandingPageHero from "@/components/_landingPageComponents/LandingPageHero";
import React from "react";

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <LandingPageHeader />

      <LandingPageHero />
    </div>
  );
};

export default LandingPage;
