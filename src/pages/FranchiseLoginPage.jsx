import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import FranchiseLoginHero from "../components/franchiseloginpage/FranchiseLoginHero";
import BannerSection from "../components/common/BannerSection";

const FranchiseLoginPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="My Account" page="My Account" />
      <FranchiseLoginHero />
    </div>
  );
};

export default FranchiseLoginPage;
