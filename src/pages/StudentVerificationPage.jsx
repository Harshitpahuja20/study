import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import StudentHero from "../components/studentverificationPage/StudentHero";

const StudentVerificationPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Student Verification" page="Student Verification" />
      <StudentHero />
    </div>
  );
};

export default StudentVerificationPage;
