import React from "react";
import "./index.css";

const Features = ({ src, alt, title, text }) => (
  <div className="feature-item">
    <img className="feature-icon" src={src} alt={alt} />
    <h3 className="feature-item-title">{title}</h3>
    <p>{text}</p>
  </div>
);

export default Features;