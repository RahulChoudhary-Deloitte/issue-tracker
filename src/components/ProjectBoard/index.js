import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ProjectCard from "../ProjectCard";
import Button from "@clayui/button";
import DropDown from "@clayui/drop-down";
import projectApi from "../apis/projectApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  setProjects,
  setSelectProject,
  setTeamMembers,
} from "../../store/slices/projectSlice";
import {
  mapSectionNameToStatus,
  mapStatusToSectionName,
  optionsType,
  upDateIssue,
  priorityOptions,
  sectionNames,
  optionsAssignee,
  filterItems
} from "../../utility/projectUtils";
import NoProject from "./NoProject";



const ProjectBoard = () => {

  const dispatch = useDispatch();
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const projects = useSelector(getAllProject).allProject;
  const selectedProject = useSelector(getAllProject).selectedProject;
  const [assignees, setAssignees] = useState([]);
  const [items, setItems] = useState([]);
  const totalProject = projects.length;
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await projectApi.get(`/project`).catch((err) => {
        console.log(err);
      });
      dispatch(setProjects(response.data));
      dispatch(setSelectProject(response.data[0]));
    };

    fetchProjects();
  }, []);


  useEffect(() => {
    const fetchAssignee = async () => {
      if (
        selectedProject &&
        selectedProject.projectOwner &&
        selectedProject.projectOwner.teamName
      ) {
        const response = await projectApi
          .get(`/user?teamName=${selectedProject.projectOwner.teamName}`)
          .catch((err) => {
            console.log(err);
          });
        setAssignees(response.data);
        dispatch(setTeamMembers(response.data));
      }
    };
    fetchAssignee();
  }, [selectedProject]);


  useEffect(() => {
    if (selectedProject) {
      const fetchCardData = async () => {
        const response = await projectApi
          .get(`/issue?projectID=${selectedProject.projectID}`)
          .catch((err) => {
            console.log(err);
          });
        const cardDataWithSection = response.data.map(async (item) => ({
          ...item,
          section: await mapSectionNameToStatus(item.status),
        }));
        const updatedItems = await Promise.all(cardDataWithSection);
        setItems(updatedItems);
      };
      fetchCardData();
    }
  }, [selectedProject]);
    console.log("PP   ",items[0])
  const typeOptions = optionsType(projects)

  const assigneeOptions = optionsAssignee(assignees)
  
  const handleSelectProject = (value) => {
    const newSelectProject = projects.filter(
      (project) => project.projectID === value
    );
    dispatch(setSelectProject(newSelectProject[0]));
  };


  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item.id);
  };

  const onDragOver = (e, section) => {
    e.preventDefault();
  };

  const onDrop = (e, section) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        item.section = section;
        const newStatus = mapStatusToSectionName(item.section);
        upDateIssue(itemId, newStatus);
      }
      return item;
    });
    setItems(updatedItems);
  };

  const renderItemsInSection = (section) => {
    const filteredItems = filterItems(items,selectedAssignee,selectedPriority);

    return filteredItems
      .filter((item) => item.section === section)
      .map((item) => (
        <ProjectCard key={item.id} item={item} onDragStart={onDragStart} />
      ));
  };

  return (
    <div>
      {totalProject < 1 ? (
       <NoProject/>
      ) : (
        <>
          <div className="project-borad-header">
            <h1 className="project-details-heading">Project Details</h1>
            <Link
              className="link"
              to={`/insights/${selectedProject.projectID}`}
            >
              VIEW INSIGHTS
            </Link>
          </div>
          <div className="search-project">
            <div className="select-project">
              <label htmlFor="Project Name">Project Name</label>
              <DropDown
                trigger={
                  <Button className="find-project">
                    <div>
                      <div>{selectedProject.projectName}</div> <div>v</div>
                    </div>
                  </Button>
                }
                menuElementAttrs={{ className: "dropdown-menu" }}
              >
                <DropDown.Search placeholder="Type to filter" />

                <DropDown.ItemList items={typeOptions}>
                  {(item, index) => (
                    <DropDown.Item
                      key={item.value}
                      onClick={() => handleSelectProject(item.value)}
                    >
                      {item.label}
                    </DropDown.Item>
                  )}
                </DropDown.ItemList>
              </DropDown>
            </div>
            <div className="project-owner select-project">
              <label htmlFor="Project Owner">Project Owner</label>
              <Button className="find-project">
                <div>
                  <div>{selectedProject.projectOwner.name}</div>{" "}
                </div>
              </Button>
            </div>
          </div>
          <p className="start-end-date">
            {" "}
            Start Date : 31-01-22 <span> | </span> End Date : 31-04-22
          </p>
          <div className="filter-btn">
            <div className="select-project">
              <DropDown
                trigger={
                  <Button className="find-project">
                    <div>
                      <div>{selectedAssignee || "Select Assignee"}</div>{" "}
                      <div>v</div>
                    </div>
                  </Button>
                }
                menuElementAttrs={{ className: "dropdown-menu" }}
              >
                <DropDown.Search placeholder="Type to filter" />

                <DropDown.ItemList items={assigneeOptions}>
                  {(item, index) => (
                    <DropDown.Item
                      key={index}
                      onClick={() => setSelectedAssignee(item.label)}
                    >
                      {item.label}
                    </DropDown.Item>
                  )}
                </DropDown.ItemList>
              </DropDown>
              <label htmlFor="Filter Assignee">Filter Assignee</label>
            </div>
            <div className="select-project">
              <DropDown
                trigger={
                  <Button className="find-project">
                    <div>
                      <div>{selectedPriority || "Select Priority"}</div>{" "}
                      <div>v</div>
                    </div>
                  </Button>
                }
                menuElementAttrs={{ className: "dropdown-menu" }}
              >
                <DropDown.Search placeholder="Type to filter" />

                <DropDown.ItemList items={priorityOptions}>
                  {(item, index) => (
                    <DropDown.Item
                      key={index}
                      onClick={() => setSelectedPriority(item.value)}
                    >
                      {item.label}
                    </DropDown.Item>
                  )}
                </DropDown.ItemList>
              </DropDown>
              <label htmlFor="Filter Priority">Filter Priority</label>
            </div>
          </div>
          <div className="project-details-container">
            <div className="sections-container">
              {sectionNames.map((sectionName) => (
                <div
                  key={sectionName}
                  className="section"
                  onDragOver={(e) => onDragOver(e, sectionName)}
                  onDrop={(e) => onDrop(e, sectionName)}
                >
                  <h2>{sectionName.toUpperCase()}</h2>
                  {renderItemsInSection(sectionName)}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectBoard;
