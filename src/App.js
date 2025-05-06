import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer";
import TopToBottom from "./components/common/TopToBottom";
import AboutUsPage from "./pages/AboutUsPage";
import StudentVerificationPage from "./pages/StudentVerificationPage";
import ResultPage from "./pages/ResultPage";
import FranchiseLoginPage from "./pages/FranchiseLoginPage";
import ContactUsPage from "./pages/ContactUsPage";
import CourseCategoriesPage from "./pages/CourseCategoriesPage";
import NewsPage from "./pages/NewsPage";
import TopUniversityPage from "./pages/TopUniversityPage";
import TopITIPage from "./pages/TopITIPage";
import TopCollegePage from "./pages/TopCollegePage";
import ApplyFranchisePage from "./pages/ApplyFranchisePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/apply-franchise" && <TopToBottom />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/enrollment" element={<StudentVerificationPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/my-account" element={<FranchiseLoginPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/category" element={<CourseCategoriesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/top-university" element={<TopUniversityPage />} />
        <Route path="/top-iti" element={<TopITIPage />} />
        <Route path="/top-college" element={<TopCollegePage />} />
        <Route path="/apply-franchise" element={<ApplyFranchisePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
      </Routes>
      {location.pathname !== "/apply-franchise" && <Footer />}
    </>
  );
}

export default App;
