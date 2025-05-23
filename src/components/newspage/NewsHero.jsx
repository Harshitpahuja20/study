import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useStudy } from "../../context/study.context";
import { useNavigate } from "react-router-dom";

const NewsHero = () => {
   const navigate = useNavigate()
  const { news, getAllNews } = useStudy();
    const { data, loading } = news;
  
    useEffect(() => {
      if (loading) {
        getAllNews();
      }
    }, []);

    function getFormattedDate(date) {
      const today = new Date(date);
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const yyyy = today.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

  return (
    <div className="py-5">
      <Container className="py-4">
        <h4 className=" ff_p mb-0 fw-bold">Latest News.</h4>
        { data?.length > 0 && <p className=" ff_p mb-0 mt-1">
        Exciting job openings – apply now and take the next step in your career!
        </p>}
        <Row>
          {
            data?.length !== 0 && !loading ? data?.map((res) => {
              return <Col lg={3} md={4} sm={6} className="mt-4 col-12">
              <div className="card p-3 py-4 rounded-1" onClick={()=>navigate(`/details/news/${res?._id}`)}>
                <div>
                  <span className="bg_theme px-3 py-1 rounded-1 text-white ff_p">
                    Date : {getFormattedDate(res?.createdAt)}
                  </span>
                  <h6 className=" ff_p fw-semibold mt-4 ">
                    {res?.heading}
                  </h6>
                  <p className=" ff_p mt-2 mb-0">
                    {res?.shortDescription}
                  </p>
                </div>
              </div>
            </Col>
            }) : data?.length === 0 && !loading ? <>No News Currently!</> : <></>
          }
        </Row>
      </Container>
    </div>
  );
};

export default NewsHero;
