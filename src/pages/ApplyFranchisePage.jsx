import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { franchiseRequest } from "../services/franchise.service";

const ApplyFranchisePage = () => {

   const [formData, setFormData] = useState({
      instituteName: "",
      directorName: "",
      state: "",
      city: "",
      address: "",
      phoneNumber: "",
      email: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isEmail = emailRegex.test(formData.email || "");
      
      if (!formData.instituteName.trim()) return toast.warning("Institute Name is required!");
      if (!formData.directorName.trim()) return toast.warning("Director Name is required!");
      if (!formData.state.trim()) return toast.warning("State is required!");
      if (!formData.city.trim()) return toast.warning("City is required!");
      if (!formData.address.trim()) return toast.warning("Address is required!");
      if (!formData.phoneNumber || formData.phoneNumber.length < 10)
        return toast.warning("Please enter a valid Phone Number!");
      if (!formData.email || !isEmail)
        return toast.warning("Please enter a valid Email!");      
  
      await franchiseRequest(formData)
        .then((res) => {
          if (res.data.status) {
            setFormData({
              instituteName: "",
              directorName: "",
              state: "",
              city: "",
              address: "",
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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  return (
    <div className="py-md-5 py-4 min-vh-100 bg_theme ">
      <Container>
        <Row className=" justify-content-between">
          <Col md={5}>
            <h4 className=" text-white ff_r mb-0">
              Register Franchise & Get It
            </h4>
            <p className="mt-md-4 mt-3 fw-normal text-white ff_r mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              tempora autem quod ducimus nam, nemo vero. Rem, eius. Quidem qui
              tenetur expedita excepturi, accusamus quaerat!
            </p>
          </Col>
          <Col md={6} className="mt-5 mt-md-0">
            <p className="mb-0 ff_r text-white">Create Free account to get</p>
            <h4 className="mb-0 ff_r text-white mt-2">
              Apply For Business Partner
            </h4>
            <div className="div mb-3">
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Institute Name*"
                name="instituteName"
                onChange={handleChange}
                value={formData.instituteName}
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Director Name*"
                name="directorName"
                onChange={handleChange}
                value={formData.directorName}
              />
              <input
                type="number"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Mobile No*"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
              <input
                type="email"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Email*"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="State*"
                name="state"
                onChange={handleChange}
                value={formData.state}
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="City*"
                name="city"
                onChange={handleChange}
                value={formData.city}
              />
              <input
                type="text"
                className="w-100 p-2 py-3 text-white bg-transparent border-bottom border-end-0 border-start-0 border-top-0 mt-3 text-white"
                placeholder="Your Address*"
                name="address"
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div>
              <button className="btn border border-light px-4 py-2 text-white mt-4 fs-6 rounded rounded-5" onClick={handleSubmit}>
                APPLY FRANCHISE
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplyFranchisePage;
