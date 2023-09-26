import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateProject from './components/CreateProject';
import CreateIssue from './components/CreateIssue';
import Sidebar from './components/Sidebar';
import ProjectDetails from './pages/ProjectDetails';
import Navbar from './components/Navbar';
import IssueDetails from './pages/IssueDetails';
import Insights from './pages/Insights';

function Dashboard() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={ProjectDetails} />
            <Route exact path="/create-project" component={CreateProject} />
            <Route exact path="/create-issue" component={CreateIssue} />
            <Route exact path="/issue-details/:id" component={IssueDetails} />
            <Route exact path="/insights/:id" component={Insights} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
