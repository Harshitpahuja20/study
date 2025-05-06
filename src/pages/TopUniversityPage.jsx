import React, { useEffect } from "react";
import UniversityHeroSection from "../components/topuniversitypage/UniversityHeroSection";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";

const TopUniversityPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Top Universities" page="Top Universities" />
      <UniversityHeroSection />
    </div>
  );
};

export default TopUniversityPage;
