import React from "react";
import { Container } from "react-bootstrap";

const AboutContentSection = () => {
  const handleDownload = () => {
    fetch(`${process.env.REACT_APP_API_URL}/prospectus/admission-form.pdf`)
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "admission-form.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(err => console.error("Download failed:", err));
  };

  return (
    <div className="py-5 ff_r">
      <Container>
        <div className="d-flex align-items-center gap-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className=" fw-bold mb-0">
            About JBS Institute of Skill Education – Online
          </h5>
        </div>
        <p className=" mb-0 ff_p mt-2">
          JBS Institute of Skill Education – Online is an innovative platform
          launched by JBS to empower students, professionals, and job-seekers
          through flexible, career-focused education. We recognize the
          importance of continuous learning in today’s rapidly evolving world.
          Our mission is to bridge the gap between ambition and achievement by
          offering high-quality, accessible online and offline programs that
          meet current industry demands.
        </p>
        <div className="d-flex mt-4 align-items-center gap-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className=" fw-bold mb-0">Courses and Learning Opportunities</h5>
        </div>
        <p className=" mb-0 ff_p mt-2">
          JBS Institute Online aims to support over 1 million learners annually
          through a diverse catalog of more than 2,500 online and offline
          programs. These include diplomas, certificates, and
          university-affiliated courses. Our programs are available in
          collaboration with reputed Indian institutions and industry
          professionals. Key areas include Digital Marketing, Artificial
          Intelligence, Machine Learning, Cybersecurity, Cloud Computing, Web &
          App Development, Data Science, Computer Applications, Financial
          Management, Product & Operations, Beauty and Wellness, Yoga and
          Naturopathy, Nursery Teacher Training (NTT), and more.
        </p>
        <div className="d-flex mt-4 align-items-center gap-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className=" fw-bold mb-0">
            Student Reviews and Community Feedback
          </h5>
        </div>
        <p className=" mb-0 ff_p mt-2">
          Student experiences are central to our mission. With over 1 lakh
          verified student reviews from across India, learners regularly share
          their feedback on courses, faculty, placement support, and digital
          infrastructure. These honest reviews help new students make informed
          decisions and also guide us in improving our offerings continually.
        </p>
        <div className="d-flex mt-4 align-items-center gap-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className=" fw-bold mb-0">Campus Ambassador Program</h5>
        </div>
        <p className=" mb-0 ff_p mt-2">
          The JBS Campus Ambassador Program provides an exciting opportunity for
          college students to represent JBS on their campuses. Ambassadors act
          as the voice and face of JBS, guiding their peers and spreading
          awareness about various career and educational opportunities. They
          also get the chance to develop leadership, communication, and
          networking skills while earning certificates and exclusive rewards.
        </p>
        <div className="d-flex mt-4 align-items-center gap-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className=" fw-bold mb-0">
            Empowering Futures, One Skill at a Time
          </h5>
        </div>
        <p className=" mb-0 ff_p mt-2">
          Whether you're a working professional seeking career advancement, a
          student preparing for the future, or someone looking to start a new
          journey, JBS Institute of Skill Education is your trusted partner in
          learning and growth. We are committed to equipping every learner with
          skills that truly matter in the real world.
        </p>
        <div className="d-flex mt-4 align-items-center gap-3">
          {/* <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span> */}
          <h5 className=" fw-bold mb-0 text-decoration-underline">
            Download Prospectus
          </h5>
        </div>
        <div
          className="d-flex align-items-center p-3 shadow-sm border-1 bg-white mt-3 cursor-pointer"
          style={{
            borderRadius: "12px",
            maxWidth: "500px",
            gap: "15px",
          }}
          onClick={handleDownload}
        >
          {/* Icon */}
          <div style={{ flexShrink: 0 }}>
            <img
              src="https://img.icons8.com/ios-filled/50/document--v1.png"
              alt="Document Icon"
              width="32"
            />
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "40px",
              backgroundColor: "#ddd",
            }}
          ></div>

          {/* Text Content */}
          <div>
            <div
              style={{
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: "14px",
                color: "#333",
              }}
            >
              ADMISSON FORM
            </div>
            <div
              style={{
                fontWeight: "700",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              <span style={{ color: "#f9b233" }}>DOWNLOAD </span>
              <span style={{ color: "#5f259f" }}>PROSPECTUS NOW!</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutContentSection;
