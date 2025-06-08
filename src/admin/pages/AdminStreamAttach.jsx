import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStudy } from "../../context/study.context";
import { toast } from "react-toastify";
import { updateStreamAttachemnt } from "../services/adminStreams.service";

const AdminStreamAttach = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { universities, getInstitutes } = useStudy();
  const { data, loading } = universities;
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      getInstitutes("University");
    }
  }, []);

  useEffect(() => {
    if (location.state.university) {
      setSelected(location.state.university);
    }
  }, []);

  const handleCheckboxChange = (id) => {
    setSelected(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((itemId) => itemId !== id) // unselect
          : [...prevSelected, id] // select
    );
  };

  const handleUpdate = async () => {
    try {
      if (!selected.length)
        return toast.warning("You must select atleast one university");
      const data = {
        streamId: id,
        University: selected,
      };
      setIsLoading(true);
      await updateStreamAttachemnt(data).then((res) => {
        setIsLoading(false);
        if (res?.data?.status) {
          toast.success("Attached Sucessfully");
          navigate("/admin/streams")
        } else {
          toast.error(res?.data?.message);
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.log(`Error : ${error?.message}`);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Attach University</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="mt-4 rounded">
        <Row className="gap-2">
          {data?.map((item) => {
            return (
              <span class="form-check w-auto" onClick={() => handleCheckboxChange(item._id)}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={item?._id}
                  id="item._id"
                  checked={selected?.includes(item?._id)}
                />
                <label class="form-check-label" for="flexCheckChecked">
                  {item?.instituteName}
                </label>
              </span>
            );
          })}
        </Row>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="ms-auto px-4 py-2 text-white fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
            disabled={isLoading}
            onClick={handleUpdate}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </Container>
    </>
  );
};

export default AdminStreamAttach;
