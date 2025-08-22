import React from "react";
import { useStudy } from "../../context/study.context";

const UniversityCard = ({ title, logo }) => {
  const { setIsEnquiryPopup } = useStudy();

  // ✅ Get dynamic years
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <div className="university-card mx-auto mb-4 bg-white p-3 rounded">
      <div className="card-body text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="University Logo"
          className="mb-3"
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />

        {/* Title */}
        <h5 className="fw-bold text-primary">{title}</h5>

        {/* Subtitle with dynamic years */}
        <p className="bg-dark text-white py-2 mb-3">
          Admission Open For All Courses {currentYear}-{nextYear.toString().slice(-2)}
        </p>

        {/* Static Button */}
        <button
          className="btn btn-warning text-white fw-bold px-4"
          onClick={() => setIsEnquiryPopup(true)}
        >
          ✔ APPLY NOW
        </button>
      </div>
    </div>
  );
};

export default UniversityCard;
