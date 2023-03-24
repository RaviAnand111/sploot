import React from "react";
import "./Card.css";

function Card({ imgSrc, title, description, redirectUrl }) {
  return (
    <div
      className="card-container"
      onClick={() => (window.location.href = redirectUrl)}
    >
      <img src={imgSrc} alt="img" className="card-img" />
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className="card-desc">{description}</p>
      </div>
    </div>
  );
}

export default Card;
