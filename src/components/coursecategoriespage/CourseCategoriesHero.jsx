import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/image/png/bg.jpg";
import { useStudy } from "../../context/study.context";
import { getAbsoluteUrl } from "../../services/common.service";

const CourseCategoriesHero = () => {
  const { streams } = useStudy();

  console.log(streams);

  return (
    <div className="py-5">
      <Container>
        <h4 className=" ff_p mb-0 fw-bold">Explore our Categories.</h4>
        <p className=" ff_p mb-0 mt-1">
        Find different topics to learn what you like and grow your skills.
        </p>
        <Row>
          {streams?.length > 0 ? (
            streams?.map((stream) => {
              let image = getAbsoluteUrl(stream?.image);
              return (
                <Col lg={3} mb={4} sm={6} className="mt-4 col-12">
                  <div
                    className="hero-section w-100 rounded-3 py-5 ff_p d-flex align-items-center justify-content-center text-white"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      minHeight: "180px",
                      position: "relative",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#000000b6",
                        position: "absolute",
                        borderRadius: "8px",
                        zIndex: 1,
                      }}
                    ></div>
                    <div style={{ zIndex: 10 }}>
                      <h5 className="mb-0 ff_p  text-center">
                        {stream?.title}
                      </h5>
                      <p className="mb-0 fs_12 ff_p mt-1 text-center">
                        Explore our all course.
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <div className="text-center mt-5">No categories found!</div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CourseCategoriesHero;
