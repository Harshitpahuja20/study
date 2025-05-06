import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import TopCollegeHero from "../components/topcollegepage/TopCollegeHero";

const TopCollegePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Top Colleges" page="Top Colleges" />
      <TopCollegeHero />
    </div>
  );
};

export default TopCollegePage;
