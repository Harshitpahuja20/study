import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import TopITIHeroSection from "../components/topitipage/TopITIHeroSection";

const TopITIPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Top ITI" page="Top ITI" />
      <TopITIHeroSection />
    </div>
  );
};

export default TopITIPage;
