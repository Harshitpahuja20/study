import { Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <>
      <TopToBottom />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/enrollment" element={<StudentVerificationPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/my-account" element={<FranchiseLoginPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/category" element={<CourseCategoriesPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
