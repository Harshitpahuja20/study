import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import CourseCategoriesHero from "../components/coursecategoriespage/CourseCategoriesHero";

const CourseCategoriesPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Course Categories" page="Course Categories" />
      <CourseCategoriesHero />
    </div>
  );
};

export default CourseCategoriesPage;
