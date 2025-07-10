import React from "react";
import whatsaapIcon from "../../assets/image/png/whatsapp.png";
import callIcon from "../../assets/image/png/telephone.png";

const TopToBottom = () => {
  const phoneNumber = "+919682636956"; // no hyphen
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "345678",
        }}
      >
        <div className="d-flex flex-column">
          <a href={`tel:${phoneNumber}`} target="_blank" rel="noopener noreferrer">
            <img width={40} height={40} src={callIcon} alt="Call Us" />
          </a>
          <a
            className="mt-2"
            href={`https://wa.me/${phoneNumber.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width={40} height={40} src={whatsaapIcon} alt="WhatsApp Us" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopToBottom;
