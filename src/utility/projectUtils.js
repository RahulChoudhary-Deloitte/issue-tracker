import projectApi from "../components/apis/projectApi";


export function mapSectionNameToStatus(sectionName) {
  switch (sectionName) {
    case 1:
      return "todo";
    case 2:
      return "development";
    case 3:
      return "testing";
    case 4:
      return "completed";
    default:
      return "unknown"; 
  }
  }
  
  export function mapStatusToSectionName(status) {
    switch (status) {
      case "todo":
        return 1;
      case "development":
        return 2;
      case "testing":
        return 3;
      case "completed":
        return 4;
      default:
        return "unknown"; 
    }
  }
  
  export function mapPriority(priorityNumber) {
    switch (priorityNumber) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Unknown";
    }
    
  }
  
export function optionsType(projects){
  const typeOptions = projects.map((project) => ({
    label: project.projectName,
    value: project.projectID,
  }));
  return typeOptions
}


export  async function upDateIssue(id,issueStatus){
  const updatedIssue = { status: issueStatus };
  const res = await projectApi
    .put(`/issue/${id}`, updatedIssue)
    .catch((err) => {
      console.log(err);
    });
}

export const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export const sectionNames = ["todo", "development", "testing", "completed"];

export function optionsAssignee(assignees){
  const Options = assignees.map((assignee) => ({
    label: assignee.name,
    value: assignee.id,
  }));
  return Options
}


export   const filterItems = (items,selectedAssignee,selectedPriority) => {
  let filteredItems = items;

  if (selectedAssignee) {
    filteredItems = filteredItems.filter((item) => {
      return item.assignee.name === selectedAssignee;
    });
  }

  if (selectedPriority) {
    filteredItems = filteredItems.filter((item) => {
      return mapPriority(item.priority).toLowerCase() === selectedPriority;
    });
  }

  return filteredItems;
};

