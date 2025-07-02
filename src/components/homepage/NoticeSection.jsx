import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import noticeImg from "../../assets/image/png/noticeImg.jpg";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../../context/study.context";

const Arrow = ({ className, style, onClick, direction }) => (
  <div
    className={`custom-arrow d-md-flex d-none ${direction}`}
    onClick={onClick}
  >
    {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
  </div>
);

const NoticeBoardSlider = () => {
  const navigate = useNavigate();
  const { setIsEnquiryPopup } = useStudy();

  function getCurrentSession() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 0-based index

    // Assuming session starts in April (typical in schools/fiscal years in many countries)
    const startYear = month >= 4 ? year : year - 1;
    const endYear = startYear + 1;

    return `${startYear}-${endYear}`;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const notices = [
    {
      img: noticeImg,
      title: `Register Your Franchise Today!`,
      buttonText: "Apply Franchise",
      func: () => {
        navigate("/apply-franchise");
      },
    },
    {
      img: noticeImg,
      title: `Admission Start For Session ${getCurrentSession()}`,
      buttonText: "Apply Now",
      func: () => {
        setIsEnquiryPopup(true);
      },
    },
    {
      img: noticeImg,
      title: "Step into Success!",
      buttonText: "Center Login",
      func: () => {
        navigate("/apply-franchise");
      },
    },
    {
      img: noticeImg,
      title: `New Batch Started for ${getCurrentSession()}`,
      buttonText: "Apply Now",
      func: () => {
        setIsEnquiryPopup(true);
      },
    },
  ];

  return (
    <div className="noticeboard-section ff_p py-5">
      <Container>
        <p className="section-subtitle mb-0 ff_p clr_theme">
          जेबीएस इंस्टीट्यूट ऑफ स्किल एजुकेशन
        </p>
        <h2 className="section-title mt-2">Notice Board</h2>
        <Slider {...settings}>
          {notices.map((notice, index) => (
            <div className="notice-card" key={index}>
              <div className="card-content text-start">
                <img src={notice.img} alt="Notice" />
                <h4>{notice.title}</h4>
                <button onClick={() => notice.func()}>
                  {notice.buttonText}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default NoticeBoardSlider;
