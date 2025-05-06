import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import NewsHero from "../components/newspage/NewsHero";

const NewsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="News" page="News" />
      <NewsHero />
    </div>
  );
};

export default NewsPage;
