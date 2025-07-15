import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/image/png/bg.jpg";
import { useStudy } from "../../context/study.context";
import { getAbsoluteUrl } from "../../services/common.service";
import ViewModal from "../../admin/components/popup/ViewModal";
import { useNavigate } from "react-router-dom";

const CourseCategoriesHero = () => {
  const navigate = useNavigate()
  const { streams } = useStudy();
  const [selectedData, setSelectedData] = useState(null);

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
                <Col
                  lg={3}
                  mb={4}
                  sm={6}
                  className="mt-4 col-12 cursor-pointer"
                  onClick={() => setSelectedData(stream)}
                >
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
      <ViewModal
        show={selectedData !== null}
        handleClose={() => setSelectedData(null)}
        content={
          <>
            {selectedData?.mainCourse?.length === 0 ? (
              <p className="text-center fw-semibold fs-6 mt-3">
                No Courses Added!
              </p>
            ) : (
              <>
                {selectedData?.mainCourse?.map((course, index) => {
                  return (
                    <>
                    <div className="d-flex justify-content-between p-2 border-bottom">
                      <div>
                        <p className="mb-0 fs-6">
                          {course?.shortName} - {course?.heading}
                        </p>
                        <p className="text-primary fw-semibold mb-3 fs-6">
                          {course?.heading}
                        </p>
                      </div>
                      <div>
                        <button className="p-2 btn btn-sm btn text-white fs-6  fw-semibold rounded-2 bg_theme" onClick={()=>{
                          navigate(`/SubCourses/${course?._id}/${course?.heading}`)
                        }}>
                          View Details
                        </button>
                      </div>
                    </div></>
                  );
                })}
              </>
            )}
          </>
        }
        title={selectedData && `${selectedData?.title} Courses`}
      />
    </div>
  );
};

{
  /* <p className="fs-6 mb-2"><span className="fw-semibold">{index + 1}.</span> {course?.heading} ({course?.shortName})</p> */
}

export default CourseCategoriesHero;
