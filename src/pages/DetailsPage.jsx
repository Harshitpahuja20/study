import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import helpline from "../assets/image/png/helpline.png";
import { useNavigate, useParams } from "react-router-dom";
import { useStudy } from "../context/study.context";
import { BsCheckSquare, BsHouseFill } from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import UniversityCard from "../components/topuniversitypage/UniversityCard";
import { getAbsoluteUrl } from "../services/common.service";

const DetailsPage = () => {
  const navigate = useNavigate()
  const { name, id } = useParams();
  const [selectedData, setSelectedData] = useState({});
  const { getInstitutes, universities, iti, collages, getAllNews, news } =
    useStudy();
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  useEffect(() => {
    if (id && name) {
      if (name === "University") {
        if (universities?.loading) {
          getInstitutes("University");
        } else {
          const found =
            universities?.data?.find((item) => item._id === id) || null;
          setSelectedData(found);
        }
      } else if (name === "ITI") {
        if (iti?.loading) {
          getInstitutes("ITI");
        } else {
          const found = iti?.data?.find((item) => item._id === id) || null;
          setSelectedData(found);
        }
      } else if (name === "Collage") {
        if (collages?.loading) {
          getInstitutes("Collage");
        } else {
          const found = collages?.data?.find((item) => item._id === id) || null;
          setSelectedData(found);
        }
      } else if (name === "news") {
        if (news?.loading) {
          getAllNews();
        } else {
          const found = news?.data?.find((item) => item._id === id) || null;
          setSelectedData(found);
        }
      }
    }
  }, [id, name, universities, iti, collages, news]);

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
                      {name}
                    </Breadcrumb.Item>
                   {name !== "news" && <Breadcrumb.Item active>
                      {name === "news"
                      ? ""
                      : selectedData?.instituteName}
                    </Breadcrumb.Item>}
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
                {name === "news"
                      ? selectedData?.heading 
                      : selectedData?.instituteName}
              </div>
              {selectedData !== null && (
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
                    className="htmlRender prose max-w-none"
                  />
                </>
              )}
              {selectedData !== null &&
                selectedData?.mainCourses?.length > 0 && (
                  <>
                    <div className="mb-4">
                      <div
                        className="px-3 py-2 text-white fw-bold"
                        style={{
                          backgroundColor: "#3a3a3a",
                          fontSize: "1.1rem",
                        }}
                      >
                        {selectedData?.instituteName} - Courses Offered{" "}
                        {currentYear} - {nextYear}
                      </div>

                      {selectedData?.mainCourses.map((item) => {
                        return (
                          <div className="cursor-pointer mt-3 px-2 d-flex align-items-center fs-6" onClick={()=>{
                            navigate(`/SubCourses/${item?._id}/${item?.heading}`)}}>
                            <BsCheckSquare className="text-danger me-2" />
                            <span className="fs-6">{item?.heading} ({item?.shortName})</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
            </Col>
            <Col className="" md={4}>
            {name !== "news" && <UniversityCard title={selectedData?.instituteName} logo={getAbsoluteUrl(selectedData?.instituteLogo)} />}
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

export default DetailsPage;
