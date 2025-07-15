import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import helpline from "../assets/image/png/helpline.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { getsubCourseById } from "../admin/services/adminSubCourse.service";

const SubCoursePage = () => {
  const navigate = useNavigate()
  const { name, id } = useParams();
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && name) {
      fetchSubCourses(id);
    }
  }, [id, name]);

  const fetchSubCourses = async (id) => {
    const response = await getsubCourseById(id);
    if (response.data.status) {
      setLoading(false);
      setSelectedData(response.data.data || []);
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
                          Sub Course
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
                    Sub Course - {name}
                  </div>
                  {!loading && selectedData !== null && (
                    <>
                      <h4 className=" ff_p fw-bold fs_18 mb-0">
                        {name === "news"
                          ? "" 
                          : selectedData?.instituteName}
                      </h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedData?.description,
                        }}
                        className="htmlRender"
                      />
                    </>
                  )}
                  {!loading && selectedData?.length === 0 && 
                    <div>No Details!</div>
                  }
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

export default SubCoursePage;
