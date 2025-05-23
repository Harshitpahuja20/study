import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import { Col, Container, Row } from "react-bootstrap";
import helpline from "../assets/image/png/helpline.png";
import { useParams } from "react-router-dom";
import { useStudy } from "../context/study.context";

const DetailsPage = () => {
  const { name, id } = useParams();
  const [selectedData, setSelectedData] = useState({});
  const { getInstitutes, universities, iti, collages, getAllNews, news } =
    useStudy();

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
          alert("found" + found);
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
      <div className=" noticeboard-section">
        <Container className="pb-5 pt-2">
          <Row>
            <Col className="mt-4 pe-0 pe-md-5" md={8}>
              {selectedData !== null && (
                <>
                  <h4 className=" ff_p fw-bold fs_18 mb-0">
                    {id === "news"
                      ? selectedData?.heading
                      : selectedData?.instituteName}
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedData?.description,
                    }}
                  />
                </>
              )}
            </Col>
            <Col className="mt-4" md={4}>
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
