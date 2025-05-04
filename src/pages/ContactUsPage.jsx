import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import ContactUsHero from "../components/contactuspage/ContactUsHero";

const ContactUsPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Contact Us" page="Contact Us" />
      <ContactUsHero />
    </div>
  );
};

export default ContactUsPage;
