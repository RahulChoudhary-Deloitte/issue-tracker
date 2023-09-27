import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  CreateIssue,
  CreateProject,
  Sidebar,
  Navbar,

  
} from './components'

import {
  ProjectDetails,
  Insights,
  IssueDetails
  }
   from './pages'
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
