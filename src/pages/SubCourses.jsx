import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import helpline from "../assets/image/png/helpline.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { getSubCourseById } from "../admin/services/adminSubCourse.service";

const SubCoursesPage = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && name) {
      fetchSubCourses(id);
    }
  }, [id, name]);

  const fetchSubCourses = async (id) => {
    const response = await getSubCourseById(id);
    if (response.data.status) {
      setLoading(false);
      setData(response.data.data || []);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <div className=" noticeboard-section pt-0">
        <Container className="pb-5">
          <Row>
            <Col md={12}>
              <div className="bg-light border-bottom">
                <div className="px-3 pt-3 pb-0">
                  <Breadcrumb className="mb-0 small-text text-dark breadcrumb">
                    <Breadcrumb.Item href="#">
                      <FaHouse className="me-1" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#" className="text-dark">
                      Sub Courses
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#" className="text-dark">
                      {name}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
            </Col>
            <Col className="pe-md-5" md={8}>
              <div
                style={{
                  backgroundColor: "#fffbea",
                  padding: "0.6rem 1rem",
                  borderBottom: "3px solid #ffd700",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
                className="mb-4"
              >
                Sub Courses - {name}
              </div>
              {!loading && data?.length > 0 && (
                <>
                  {data?.map((course, index) => {
                    return (
                      <>
                        <div className="d-flex justify-content-between p-2 border-bottom border-dark">
                          <div>
                            <p className="mb-0 fs-6 fw-bold">
                              {name} ({course?.duration})
                            </p>
                            <p className="text-primary fw-semibold mb-3 fs-6">
                              {course?.heading}
                            </p>
                          </div>
                          <div>
                            <button
                              className="p-2 btn btn-sm btn text-white fs-6  fw-semibold rounded-2 bg_theme"
                              onClick={() => {
                                navigate(
                                  `/SubCourse/${course?._id}/${course?.heading}`
                                );
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
              {!loading && data?.length === 0 && <div>No Courses Yet!</div>}
            </Col>
            <Col className="" md={4}>
              <div className="card text-center p-4">
                <img
                  className="mx-auto"
                  width={100}
                  src={helpline}
                  alt="helpline"
                />
                <h4 className="mt-4 ff_p mb-0 fs_16">
                  Admission Helpline Numbers
                </h4>
                <p className=" ff_p mt-3">+91 9682636956</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SubCoursesPage;
