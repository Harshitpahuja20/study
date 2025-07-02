import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentResult } from "../../services/student.service";
import { getAbsoluteUrl } from "../../services/common.service";

const ResultHero = () => {
  const [formData, setFormData] = useState({
    enrollmentId: "",
    duration: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.enrollmentId || !formData.duration) {
      toast.warning("Please fill out both fields before submitting.");
      return;
    }

    await studentResult(formData)
      .then(async (res) => {
        if (res.data.status) {
          setFormData({
            enrollmentId: "",
            duration: "",
          });
          setResult(res?.data?.data);
          toast.success("Student Result Fetched Successfully!");
        } else {
          return toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.error(`err in contact us ${err?.message}`);
        return toast.error("Something went wrong! Please try again later");
      });
  };

  const renderTableRows = () => {
    let totalTheoryMarks = 0;
    let totalPracticalMarks = 0;
    let totalMaxTheoryMarks = 0;
    let totalMaxPracticalMarks = 0;

    const rows = result?.studentMarks?.marks?.map(
      ({
        _id,
        subjectName,
        theoryMarks,
        practicalMarks,
        theoryMax,
        practicalMax,
        theoryMin,
        practicalMin,
      }) => {
        const theory = parseInt(theoryMarks) || 0;
        const practical = parseInt(practicalMarks) || 0;
        const maxTheory = parseInt(theoryMax) || 0;
        const maxPractical = parseInt(practicalMax) || 0;

        totalTheoryMarks += theory; // Accumulate obtained theory marks
        totalPracticalMarks += practical; // Accumulate obtained practical marks
        totalMaxTheoryMarks += maxTheory; // Accumulate max theory marks
        totalMaxPracticalMarks += maxPractical; // Accumulate max practical marks

        return (
          <tr key={_id}>
            <td>{subjectName}</td>
            <td>{theoryMax}</td>
            <td>{practicalMax}</td>
            <td>{theoryMin}</td>
            <td>{practicalMin}</td>
            <td>{theoryMarks}</td>
            <td>{practicalMarks}</td>
          </tr>
        );
      }
    );

    const grandTotal = totalMaxTheoryMarks + totalMaxPracticalMarks; // Grand total of max marks
    const obtainedMarks = totalTheoryMarks + totalPracticalMarks; // Total obtained marks
    const percentage = grandTotal > 0 ? (obtainedMarks / grandTotal) * 100 : 0; // Calculate percentage

    // Add a footer row with the total obtained marks for theory and practical
    rows.push(
      <tr key="footer-obtained">
        <td colSpan="5">
          <strong>Total Obtained Marks</strong>
        </td>
        <td>
          <strong>{totalTheoryMarks}</strong>
        </td>
        <td>
          <strong>{totalPracticalMarks}</strong>
        </td>
      </tr>
    );

    // Add a grand total row with the total max marks for theory and practical (correcting the previous error)
    rows.push(
      <tr key="grand-total">
        <td colSpan="5">
          <strong>Grand Total</strong>
        </td>
        <td colSpan="2">
          <strong>{totalTheoryMarks + totalPracticalMarks}</strong>
        </td>
      </tr>
    );

    // Add a row for the percentage
    rows.push(
      <tr key="percentage">
        <td colSpan="5">
          <strong>Percentage</strong>
        </td>
        <td colSpan="2">
          <strong>{percentage.toFixed(2)}%</strong>
        </td>
      </tr>
    );

    return rows;
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`; // format required by input[type="date"]
  };

  return (
    <div className="py-5">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={5}>
            <div className="card p-4">
              <h4 className="clr_theme fw-bold mb-0 ff_p">Student Result</h4>
              <p className="mb-0 ff_p mt-1">
                Check your all details before submit
              </p>

              <div className="d-flex mt-4 ff_p flex-column">
                <label htmlFor="enrollmentId">Enrollment Number</label>
                <input
                  name="enrollmentId"
                  value={formData.enrollmentId}
                  onChange={handleChange}
                  className="mt-2 py-2 px-3"
                  type="text"
                />
              </div>

              <div className="d-flex mt-3 ff_p flex-column">
                <label htmlFor="mode">Choose Mode</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-2 py-2 px-3"
                >
                  <option value="">-- Choose Mode --</option>
                  <option value="3 MONTH">3 MONTHS</option>
                  <option value="6 MONTH">6 MONTHS</option>
                  <option value="1 YEAR">1 YEAR</option>
                  <option value="2 YEAR">2 YEAR</option>
                  <option value="3 YEAR">3 YEAR</option>
                  <option value="4 YEAR">4 YEAR</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="bg_theme w-100 py-2 text-white ff_p border-0 mt-4"
              >
                View Result
              </button>
            </div>
          </Col>
        </Row>
        {result && result !== null && (
          <>
            <Row className="mt-4 border p-3">
              <Col md={4}>
                <img
                  src={getAbsoluteUrl(result?.student?.image)} // replace with actual image URL or base64
                  alt="Student"
                  className="img-thumbnail"
                  style={{ width: "100%", height: "auto" , padding : "1rem" , marginBottom : "10px" , maxWidth:"230px" }}
                />
              </Col>
              <Col md={8}>
                <p>
                  <strong>Enrollment No.</strong> :{" "}
                  {result?.student?.enrollmentId}
                </p>
                <p>
                  <strong>Student Name</strong> : {result?.student?.studentName}
                </p>
                <p>
                  <strong>Date Of Birth</strong> :{" "}
                  {formatDateToYYYYMMDD(result?.student?.dob)}
                </p>
                <p>
                  <strong>Father Name</strong> : {result?.student?.fatherName}
                </p>
                <p>
                  <strong>Course Name</strong> : {result?.student?.course?.name}
                </p>
                <p>
                  <strong>Year</strong> : {result?.student?.course?.duration}
                </p>
              </Col>
            </Row>
            <Row className="mt-5">
              <Table
                bordered
                hover
                responsive
                className="text-center align-middle"
              >
                <thead className="table-dark">
                  <tr>
                    <th rowSpan="2">Subject</th>
                    <th colSpan="2">Max Marks</th>
                    <th colSpan="2">Min Marks</th>
                    <th colSpan="2">Obtained Marks</th>{" "}
                    {/* Changed for clarity */}
                  </tr>
                  <tr>
                    <th>Theory</th>
                    <th>Practical</th>
                    <th>Theory</th>
                    <th>Practical</th>
                    <th>Theory</th>
                    <th>Practical</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </Table>
            </Row>
          </>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default ResultHero;
