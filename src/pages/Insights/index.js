import React from "react";
// import StatusBar from "../components/StatusBar";
// import  from "../components/TotalIssues";
import {TotalIssues,StatusBar} from '../../components'
import { useParams } from 'react-router-dom';
import { useState ,useEffect} from "react";
import projectApi from "../../components/apis/projectApi";
import { useSelector } from "react-redux";
import {
  getAllProject,
} from "../../store/slices/projectSlice";
import './insights.scss'




const Insights = () => {
  const { id } = useParams();
  
  const teamMembers = useSelector(getAllProject).teamMembers
  const projects   = useSelector(getAllProject).allProject

  const selectedProject = projects.find((project) => project.projectID === id);

  const [items, setItems] = useState([]);
  let todoCount = 0;
  let developmentCount = 0;
  let testingCount = 0;
  let completedCount = 0;


  useEffect(() => {
    if (id) {
      const fetchCardData = async () => {
        const response = await projectApi
          .get(`/issue?projectID=${id}`)
          .catch((err) => {
            console.log(err);
          });
       
        setItems(response.data);
       
      };
      fetchCardData();
    }
  }, [id]);


  for (const item of items) {
    switch ((item.status)) {
      
      case 1:
        todoCount++;
        break;
      case 2:
        developmentCount++;
        break;
      case 3:
        testingCount++;
        break;
      case 4:
        completedCount++;
        break;
      default:
        break;
    }
  }

  const teamMemberElements = teamMembers
    .filter((member) => member.id !== selectedProject.projectOwner.id)
    .map((member) => (
      <div className="member-info" key={member.id}>
        <div className="img">
          <img
            src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=2048x2048&w=is&k=20&c=lDJRQWb0FtKq9R8biMKvGGZVqn0sVGlUHDPoxR83nWc=" 
            alt={member.name}
          />
          <div className="nenber-name">
            <h1>{member.name}</h1>
            <p>{member.desination}</p>
          </div>
        </div>
        <p>Team Member</p>
      </div>
    ));
  
  return (
    <div className="insights">
      <div className="left">
        <div className="header">
          <div className="title">
            <h1>HU 22.0 React Track</h1>
          </div>
          <p>Total Number of Issues: {items.length}</p>
            <p className="hr"></p>
          <div className="issues-details">
      <TotalIssues title="TO DO" count={todoCount} className="todo" />
      <TotalIssues title="DEVELOPMENT" count={developmentCount} className="development" />
      <TotalIssues title="TESTING" count={testingCount} className="testing" />
      <TotalIssues title="COMPLETED" count={completedCount} className="completed" />
    </div>
        </div>
        <div className="status-bar">
          <h3>Status Bar</h3>
          <div>
          <StatusBar todo={todoCount} testing={testingCount} development={developmentCount} completed={completedCount} />
          </div>
          <div className="status-sign">
            <div>
                <div className="todo" ></div> TODO
            </div>
            <div>
                <div className="development"></div> DEVELOPMENT
            </div>
            <div>
                <div className="testing"></div> TESTING
            </div>
            <div>
                <div className="completed"></div> COMPLETED
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <h1>Team Members</h1>
        <p>{teamMembers.length} member</p>
        <div>
            <div className="member-info">
                <div className="img">
                <img src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=2048x2048&w=is&k=20&c=lDJRQWb0FtKq9R8biMKvGGZVqn0sVGlUHDPoxR83nWc=" alt="" />
                <div className="nenber-name">
                    <h1>{selectedProject?.projectOwner?.name}</h1>
                    <p>{selectedProject?.projectOwner?.desination} </p>
                </div>
                </div>
                <p>Owner</p>
            </div>
            <hr />
            <div>{teamMemberElements}</div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
