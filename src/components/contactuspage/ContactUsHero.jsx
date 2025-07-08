import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { contactUs } from "../../services/contact.service";

const ContactUsHero = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    comment: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailRegex.test(formData.email || "");
    if (!formData.fullName) return toast.warning("Full Name is required!");
    if (!formData.phoneNumber || formData.phoneNumber.length < 10)
      return toast.warning("Please Enter a valid Phone Number!");
    if (!formData.email || !isEmail)
      return toast.warning("Please Enter a valid Email!");
    if (!formData.subject) return toast.warning("Subject is required!");
    if (!formData.comment) return toast.warning("Comment is required!");

    await contactUs(formData)
      .then((res) => {
        if (res.data.status) {
          setFormData({
            fullName: "",
            subject: "",
            comment: "",
            phoneNumber: "",
            email: "",
          });
          return toast.success("Request Submitted!");
        } else {
          return toast.error("Something went wrong! Please try again later");
        }
      })
      .catch((err) => {
        console.error(`err in contact us ${err?.message}`);
        return toast.error("Something went wrong! Please try again later");
      });
  };

  return (
    <div className="py-5 ff_p">
      <Container className="py-md-4">
        <Row className=" align-items-center">
          <Col className="pe-md-5" md={6}>
            <h4 className="fw-bold mb-0 ">Feel Free To Contact Us</h4>
            <p className=" mb-0 mt-1">
              Have questions or need guidance? Feel free to reach out to us anytime—our team is always here to assist you with the right information and support. Your success is our priority, and we’re just a call or message away! We expertly handle all import-export documentation and formalities, ensuring your shipment reaches any international destination safely and without delay.
            </p>
            <div className="mt-4">
              <h6 className="fw-bold mb-0 ">Postal Address :</h6>
              <p className=" mb-0 mt-1">Chadwal ,Kathua, Jammu, 184144</p>
            </div>
            <div className="border w-100 my-4"></div>
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Phone :</h6>
                <p className=" mb-0 mt-1">+91 9682636956</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Email :</h6>
                <p className=" mb-0 mt-1">jbsinstitute02@gmail.com</p>
              </Col>
            </Row>
            <div className="border w-100 my-4"></div>
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Website :</h6>
                <p className=" mb-0 mt-1">{window.location.origin}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-0 ">Social Media :</h6>
                <p className=" mb-0 mt-1">
                  Instagram - jbs_institute_7054
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <Row>
              <Col className="mt-4" md={6}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={handleChange}
                  value={formData?.fullName}
                />
              </Col>
              <Col className="mt-4" md={6}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="number"
                  placeholder="Enter Your Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData?.phoneNumber}
                />
              </Col>
              <Col className="mt-4" md={12}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  onChange={handleChange}
                  value={formData?.email}
                />
              </Col>
              <Col className="mt-4" md={12}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  onChange={handleChange}
                  value={formData?.subject}
                />
              </Col>
              <Col className="mt-4" md={12}>
                <textarea
                  name="comment"
                  id="w3review"
                  rows="4"
                  placeholder="Enter Your Comment"
                  className="py-3 px-4 customInput rounded-2 w-100"
                  onChange={handleChange}
                  value={formData?.comment}
                ></textarea>
              </Col>
            </Row>
            <div className="d-flex justify-content-start">
              <button
                className=" rounded-2 bg_theme w-100 py-3 text-white ff_p border-0 mt-4"
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUsHero;
