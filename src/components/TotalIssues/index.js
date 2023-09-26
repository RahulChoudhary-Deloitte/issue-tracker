import React from "react";
import './style.scss'
const TotalIssues = ({ title, count, className }) => {
  return (
    <div className={`total-issues`}>
      <div className="title">{title}</div>
      <h1 className={`${className}`}>{count}</h1>
    </div>
  );
};

export default TotalIssues;
