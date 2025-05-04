import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import NewsHero from "../components/newspage/NewsHero";

const NewsPage = () => {
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="News" page="News" />
      <NewsHero />
    </div>
  );
};

export default NewsPage;
