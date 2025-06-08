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
import AdminPlaces from "./admin/pages/AdminPlaces";
import AdminFranchiseRequests from "./admin/pages/AdminFranchiseRequests";
import AdminContactQueries from "./admin/pages/AdminContactQueries";

import PopupModal from "./components/common/PopupModal";
import { useEffect, useState } from "react";
import AdminAddNews from "./admin/pages/AdminAddNews";
import AdminViewNews from "./admin/pages/AdminViewNews";
import AdminAddFranchise from "./admin/pages/AdminAddFranchise";
import AdminViewFranchise from "./admin/pages/AdminViewFranchise";
import AdminViewSingleFranchise from "./admin/pages/AdminViewSingleFranchise";
import FranchiseLayout from "./franchise/layout/layout";
import FranchiseDashobard from "./franchise/pages/FranchiseDashboard";
import "react-quill/dist/quill.snow.css";
import AddInstitute from "./admin/pages/AddInstitute";
import AdminViewInstitutes from "./admin/pages/ViewInstitutes";
import DetailsPage from "./pages/DetailsPage";
import AddMainCourse from "./admin/pages/AddMainCourse";
import AddSubCourse from "./admin/pages/AddSubCourse";
import AddStudent from "./admin/pages/AddStudent";
import AdminViewStudents from "./admin/pages/ViewStudents";
import AdminViewSubCourses from "./admin/pages/AdminViewSubCourses";
import AddVocationalCourse from "./admin/pages/AddVocationalCourse";
import ViewVocationalCourse from "./admin/pages/ViewVocationalCourse";
import AdminVocationalCourseSubject from "./admin/pages/AdminVocationalCourseSubject";
import StudentDetailsCard from "./admin/pages/ViewSingleStudent";
import AdminStudentRequests from "./admin/pages/AdminStudentRequests";
import FranchiseViewStudents from "./franchise/pages/ViewStudents";
import FranchiseStudentDetailsCard from "./franchise/pages/ViewSingleStudent";
import AddFranchiseStudent from "./franchise/pages/AddStudent";
import AddFranchiseVocationalCourse from "./franchise/pages/AddVocationalCourse";
import ViewFranchiseVocationalCourse from "./franchise/pages/ViewVocationalCourse";
import FranchiseSubjectForm from "./franchise/pages/AdminVocationalCourseSubject";
import AddOtherDashboard from "./admin/pages/AddOtherDashboard";
import AdminStreamAttach from "./admin/pages/AdminStreamAttach";
import AdminAddMarks from "./admin/pages/AdminAddMarks";
import AdminResults from "./admin/pages/AdminResults";
import ViewSingleStudentMarks from "./admin/pages/ViewSingleStudentMarks";

function App() {
  const { isEnquiryPopup, setIsEnquiryPopup, currentUser } = useStudy();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const franchisetoken = localStorage.getItem("franchisetoken");

  // Admin private route that checks for either token or admin role
  const AdminPrivateRoute = ({ children }) => {
    if (token || (currentUser && currentUser.role === "admin")) {
      return children;
    }
    return <Navigate to="/" />;
  };

  // Franchise private route that checks for either franchise token or franchise role
  const FranchisePrivateRoute = ({ children }) => {
    if (franchisetoken || (currentUser && currentUser.role === "franchise")) {
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

      {!(
        location.pathname.includes("/admin") ||
        location.pathname.includes("/franchise")
      ) && <TopToBottom />}
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/enrollment" element={<StudentVerificationPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/category" element={<CourseCategoriesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/top-university" element={<TopUniversityPage />} />
        <Route path="/top-iti" element={<TopITIPage />} />
        <Route path="/top-college" element={<TopCollegePage />} />
        <Route path="/apply-franchise" element={<ApplyFranchisePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/details/:name/:id" element={<DetailsPage />} />
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

        <Route
          path="/my-account"
          element={
            franchisetoken ||
            (currentUser && currentUser.role === "franchise") ? (
              <Navigate to="/franchise/dashboard" />
            ) : (
              <FranchiseLoginPage />
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
          <Route path="dashboard/other" element={<AddOtherDashboard />} />
          <Route path="streams" element={<AdminStreams />} />
          <Route path="streams/attach/:id" element={<AdminStreamAttach />} />
          <Route path="places" element={<AdminPlaces />} />
          <Route path="studentRequests" element={<AdminStudentRequests />} />
          <Route
            path="franchiseRequests"
            element={<AdminFranchiseRequests />}
          />
          <Route path="contactQuerys" element={<AdminContactQueries />} />
          <Route path="news/add" element={<AdminAddNews />} />
          <Route path="news/view" element={<AdminViewNews />} />
          <Route path="student/add" element={<AddStudent />} />
          <Route path="student/view/:id" element={<StudentDetailsCard />} />
          <Route
            path="student/marks/:studentId/:courseId"
            element={<AdminAddMarks />}
          />
          <Route path="students/view" element={<AdminViewStudents />} />
          <Route path="course/main" element={<AddMainCourse />} />
          <Route path="course/sub/add/:id" element={<AddSubCourse />} />
          <Route path="course/sub" element={<AdminViewSubCourses />} />
          <Route path="franchise/add" element={<AdminAddFranchise />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="results/:id" element={<ViewSingleStudentMarks />} />
          <Route
            path="vocationalCourse/add"
            element={<AddVocationalCourse />}
          />
          <Route
            path="vocationalCourse/view"
            element={<ViewVocationalCourse />}
          />
          <Route
            path="vocationalCourse/subject/details"
            element={<AdminVocationalCourseSubject />}
          />
          <Route path="franchise/view" element={<AdminViewFranchise />} />
          <Route
            path="franchise/view/:id"
            element={<AdminViewSingleFranchise />}
          />
          <Route path="university/add" element={<AddInstitute />} />
          <Route
            path="university/view"
            element={<AdminViewInstitutes role={"University"} />}
          />
          <Route
            path="college/view"
            element={<AdminViewInstitutes role={"Collage"} />}
          />
          <Route
            path="iti/view"
            element={<AdminViewInstitutes role={"ITI"} />}
          />
          <Route path="*" element={<Navigate to={"dashboard"} />} />
        </Route>

        {/* Protected Franchise Routes */}
        <Route
          path="/franchise/*"
          element={
            <FranchisePrivateRoute>
              <FranchiseLayout />
            </FranchisePrivateRoute>
          }
        >
          <Route path="dashboard" element={<FranchiseDashobard />} />
          <Route
            path="vocationalCourse/add"
            element={<AddFranchiseVocationalCourse />}
          />
          <Route
            path="vocationalCourse/view"
            element={<ViewFranchiseVocationalCourse />}
          />
          <Route
            path="vocationalCourse/subject/details"
            element={<FranchiseSubjectForm />}
          />

          <Route path="students/add" element={<AddFranchiseStudent />} />
          <Route
            path="student/view/:id"
            element={<FranchiseStudentDetailsCard />}
          />
          <Route path="students/view" element={<FranchiseViewStudents />} />
          <Route path="*" element={<Navigate to={"dashboard"} />} />
        </Route>
      </Routes>

      {/* Optional Footer */}
      {!(
        location.pathname.includes("/admin") ||
        location.pathname.includes("/franchise")
      ) && <Footer />}
    </>
  );
}

export default App;
