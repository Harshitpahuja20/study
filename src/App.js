import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import "./index.css";
import AdminLayout from "./admin/layout/layout";
import { ToastContainer } from "react-toastify";
import EnquiryPopupModal from "./components/popup/EnquiryPopup";
import { useStudy } from "./context/study.context";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashobard from "./admin/pages/AdminDashobard";
import AdminStreams from "./admin/pages/AdminStreams";

import PopupModal from "./components/common/PopupModal";
import { useEffect, useState } from "react";
function App() {
  const { isEnquiryPopup, setIsEnquiryPopup, currentUser } = useStudy();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const AdminPrivateRoute = ({ children }) => {
    if (token || (currentUser && currentUser.role === "admin")) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <>
      {isEnquiryPopup && (
        <EnquiryPopupModal
          show={isEnquiryPopup}
          handleClose={() => setIsEnquiryPopup(false)}
        />
      )}

      {location.pathname !== "/admin/login" && <TopToBottom />}
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
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

        {/* Admin Login with redirect if already logged in */}
        <Route
          path="/admin/login"
          element={
            token || (currentUser && currentUser.role === "admin") ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin />
            )
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashobard />} />
          <Route path="streams" element={<AdminStreams />} />
          <Route path="places" element={<AdminDashobard />} />
          <Route path="studentRequests" element={<AdminDashobard />} />
          <Route path="franchiseRequests" element={<AdminDashobard />} />
          <Route path="contactQuery" element={<AdminDashobard />} />
          <Route path="*" element={<Navigate to={"dashboard"} />} />
        </Route>
      </Routes>

      {/* {location.pathname !== "/admin/login" && <Footer />} */}
    </>
  );
}

export default App;
