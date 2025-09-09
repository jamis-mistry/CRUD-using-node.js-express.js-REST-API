import React from "react";

const BreedCard = ({ name, image, description }) => (
  <div className="breed-card" style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "250px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "8px",
    textAlign: "center"
  }}>
    <img
      src={image}
      alt={name}
      style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }}
    />
    <h3 style={{ margin: "12px 0 8px" }}>{name}</h3>
    <p style={{ fontSize: "0.95em", color: "#555" }}>{description}</p>
  </div>
);

export default BreedCard;