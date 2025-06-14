import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import StudentHero from "../components/studentverificationPage/StudentHero";

const StudentVerificationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Student Verification" page="Student Verification" />
      <StudentHero />
    </div>
  );
};

export default StudentVerificationPage;
