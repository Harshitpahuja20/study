import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import ContactUsHero from "../components/contactuspage/ContactUsHero";
import DirectorSection from "../components/contactuspage/director";

const ContactUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Contact Us" page="Contact Us" />
      <DirectorSection/>
      <ContactUsHero />
    </div>
  );
};

export default ContactUsPage;
