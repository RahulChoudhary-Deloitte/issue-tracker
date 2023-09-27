import React from 'react'
import {Link} from 'react-router-dom'
import image from "../../assets/project-board.png";

const NoProject = () => {
  return (
    <div className="project-board">
          <h2>Welcome to Tracker</h2>
          <p>
            Seems like you haven't created any projects yet.{" "}
            <Link to="/create-project">Click here</Link> to onboard a new
            project.
          </p>
          <div className="board-image">
            <img src={image} alt="project-board" />
          </div>
        </div>
  )
}

export default NoProject
