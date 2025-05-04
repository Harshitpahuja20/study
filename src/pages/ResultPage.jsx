import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import ResultHero from "../components/resultpage/ResultHero";

const ResultPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BannerSection
        title="Student Result
"
        page="Student Result
"
      />
      <ResultHero />
    </div>
  );
};

export default ResultPage;
