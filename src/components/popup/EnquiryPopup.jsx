import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  FaFileAlt,
  FaHeart,
  FaMoneyCheckAlt,
  FaHeadset,
  FaGraduationCap,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { getMainCourses } from "../../admin/services/adminMainCourse.service";
import { getSubCourseById } from "../../admin/services/adminSubCourse.service";
import { toast } from "react-toastify";
import { studentQuery } from "../../services/contact.service";
import { useStudy } from "../../context/study.context";

const featureList = [
  { icon: <FaFileAlt size={32} color="#042641" />, label: "Brochure Details" },
  { icon: <FaHeart size={32} color="#042641" />, label: "Shortlist & Apply" },
  {
    icon: <FaMoneyCheckAlt size={32} color="#042641" />,
    label: "Check Detailed Fees",
  },
  { icon: <FaHeadset size={32} color="#042641" />, label: "24/7 Counselling" },
  {
    icon: <FaGraduationCap size={32} color="#042641" />,
    label: "Scholarships",
  },
  {
    icon: <FaCalendarAlt size={32} color="#042641" />,
    label: "Application Deadlines",
  },
];
const EnquiryPopupModal = ({ show, handleClose }) => {
  const { setIsEnquiryPopup } = useStudy();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    courseId: "",
    subjectId: "",
  });
  const [mainCourses, setMainCourses] = useState([]);
  const [subCourses, setSubCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    const response = await getMainCourses(1, {});
    if (response.data.status) {
      setMainCourses(response.data.data);
    }
  };

  const fetchSubCourses = async (id) => {
    const response = await getSubCourseById(id);
    if (response.data.status) {
      setSubCourses(response.data.data || []);
    } else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "courseId" && value) {
      fetchSubCourses(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName) return toast.warning("Full Name is required");
    if (!formData.phoneNumber) return toast.warning("phoneNumber Number is required");
    if (!formData.courseId) return toast.warning("Please select the course");
    if (!formData.subjectId)
      return toast.warning("Please select the subject course");

    setLoading(true);

    await studentQuery(formData)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status) {
          toast.success("Submitted Successfully");
          setIsEnquiryPopup(false);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Somthing went wrong!");
      });
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" className="ff_r" centered>
      <Modal.Body className="d-flex p-0 position-relative">
        <button
          onClick={handleClose}
          className="position-absolute top-0 end-0 m-1 me-2 border-0 bg-transparent"
          style={{ zIndex: 10 }}
          aria-label="Close"
        >
          <FaTimes size={20} color="#000" />
        </button>
        {/* Left Section */}
        <div className="left-section p-4 w-50">
          <h5 className="mb-4">How Shiksha Sangam helps you in</h5>
          <Row>
            {featureList.map((item, index) => (
              <Col key={index} xs={6} className="mb-4">
                <div className="feature-card py-4 text-center p-3">
                  <div className="mb-2">{item.icon}</div>
                  <div className="fw-medium">{item.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Right Section */}
        <div className="right-section p-4 w-50">
          <h5 className=" fw-bold border-bottom pb-2 mb-4 clr_theme ">
            Enquire Now
          </h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Full Name :</Form.Label>
              <Form.Control
                placeholder="Please enter your full name*"
                value={formData?.fullName}
                name="fullName"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">phoneNumber Number :</Form.Label>
              <Form.Control
                placeholder="Please enter your 10 digits valid phoneNumber number*"
                value={formData?.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Select Course :</Form.Label>
              <Form.Select name="courseId" onChange={handleChange}>
                <option value={""}>Choose Course</option>
                {mainCourses?.map((data) => {
                  return <option value={data?._id}>{data?.heading}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Select Subject :</Form.Label>
              <Form.Select name="subjectId" onChange={handleChange}>
                <option value={""}>Choose Course First</option>
                {subCourses?.map((data) => {
                  return <option value={data?._id}>{data?.heading}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <button
              className="w-100 w-100 py-2 text-white  fw-bold rounded-2 bg_theme mt-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Apply Now"}
            </button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EnquiryPopupModal;
