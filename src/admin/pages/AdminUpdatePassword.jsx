import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { updatePassword } from "../../services/auth.service";
import { useStudy } from "../../context/study.context";

const AdminUpdatePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { handleLogOut } = useStudy();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { currentPassword, newPassword } = formData;

    if (!currentPassword || !newPassword) {
      return toast.warning("Please fill in all fields!");
    }

    if (currentPassword !== newPassword) {
      return toast.warning("Passwords are not same! check again!");
    }

    if (newPassword.length < 6) {
      return toast.warning("New password must be at least 6 characters.");
    }

    try {
      const response = await updatePassword({ password: newPassword });
      if(response.data.status){
        handleLogOut()
        navigate("/admin/login")
        return toast.success("Password Updated! Please login again.");
      }else{
        return toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <div className="py-5 w-100">
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col md={12} lg={10}>
              <div className="card p-4">
                <h4 className="clr_theme fw-bold mb-0 ff_p">Change Password</h4>

                <p className="mb-0 ff_p mt-1">
                  Enter your current and new password to update.
                </p>

                <div className="d-flex mt-4 ff_p flex-column">
                  <label>New Password</label>
                  <input
                    className="mt-2 py-2 px-3"
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    value={formData.currentPassword}
                  />
                </div>

                <div className="d-flex mt-3 ff_p flex-column">
                  <label>Confirm Password</label>
                  <input
                    className="mt-2 py-2 px-3"
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    value={formData.newPassword}
                  />
                </div>

                <button
                  className="bg_theme w-100 py-2 text-white ff_p border-0 mt-4"
                  onClick={handleSubmit}
                >
                  Change Password
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminUpdatePassword;
