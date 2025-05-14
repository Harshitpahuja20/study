import React, { useState } from "react";
import { Breadcrumb, Form } from "react-bootstrap";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import { addNews } from "../services/adminNews.service";

const AdminAddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) return toast.warning("News Heading is required!");
    if (!formData.shortDescription)
      return toast.warning("Short Description is required!");
    if (!editorState.getCurrentContent().hasText())
      return toast.warning("Description is required");

    setLoading(true);

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlDescription = draftToHtml(rawContentState);

    const submissionData = {
      heading: formData.title,
      shortDescription: formData.shortDescription,
      description: htmlDescription,
    };

    await addNews(submissionData)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          toast.success("Added Successfully");
          setFormData({
            title: "",
            shortDescription: "",
          });
          setEditorState("");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong!");
        console.log(`err : ${err?.message}`);
      });
  };

  return (
    <div className="p-2">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Add News
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">News Heading</Form.Label>
          <Form.Control
            placeholder="Heading"
            className="py-2"
            onChange={handleChange}
            name="title"
            value={formData.title}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">
            News Short Description
          </Form.Label>
          <Form.Control
            placeholder="Short Description"
            className="py-2"
            onChange={handleChange}
            name="shortDescription"
            value={formData.shortDescription}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold small">
            News Description
          </Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState} // Updating the editor state on change
            wrapperClassName="demo-wrapper border h-100 rounded-3" // Wrapper style
            editorClassName="demo-editor customHeight w-100 h-100 px-4" // Editor content style
            toolbar={{
              options: [
                "inline",
                "blockType",
                "list",
                "textAlign",
                "link",
                "history",
              ], // Available toolbar options
            }}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <button
            className="ms-auto px-4 py-2 text-white  fw-bold rounded-2 bg_theme mt-2 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {!loading ? "Add" : "Adding..."}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAddNews;
