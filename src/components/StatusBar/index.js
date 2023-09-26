import React from "react";
import "./style.scss";


const StatusBar = ({ todo, testing, development, completed }) => {
  const total = todo + testing + development + completed;
  const todoWidth = (todo / total) * 100 + "%";
  const testingWidth = (testing / total) * 100 + "%";
  const developmentWidth = (development / total) * 100 + "%";
  const completedWidth = (completed / total) * 100 + "%";

  return (
    <div className="status-bar-box">
      <div className="status todo" style={{ width: todoWidth }}>
       
      </div>
      <div className="status testing" style={{ width: testingWidth }}>
        
      </div>
      <div className="status development" style={{ width: developmentWidth }}>
        
      </div>
      <div className="status completed" style={{ width: completedWidth }}>
      
      </div>
    </div>
  );
};

export default StatusBar;
