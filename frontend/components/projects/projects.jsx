import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import merge from 'lodash/merge';

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.projects
    }

    this.currentUser = this.props.currentUser;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillMount () {
    const newProject = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    }

    this.props.fetchProjects()
  }

  componentWillReceiveProps (nextProps) {
    const newProject2 = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    }

    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    } else if (Object.keys(nextProps.projects).length === 0) {
      this.props.createProject(newProject2)
    };

    // TODO solve this with routing or create a way for it to work in DidMount
    // let firstProject = this.props.projects[0].id;
    // console.log(this.props.match.params.id);
    // console.log((this.props.match.params.id));
    // if (this.props.match.params.id) {
    //   let firstProject = 108;
    //   let projectURL = `/projects/${firstProject}`;
    //   return (
    //     <Redirect to={projectURL} />
    //   );
    // }

  }

  // componentDidMount () {
  //   this.currentUser.latest_project =
  // }

  // componentWillMount () {
  //   // let firstProject = this.props.projects[0].id;
  //   if (!!this.props.match.params.id) {
  //
  //     let firstProject = 111;
  //     let projectURL = `/projects/${firstProject}`;
  //     return (
  //       <Redirect to={projectURL} />
  //     );
  //   }
  //   console.log("did mount");
  //   console.log(this.props.match.params.id);
  //   console.log(!this.props.match.params.id);
  // }

  handleKeyDown (projectID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'Enter' || keyCode === 13) {
        const newProject = {
          name: "",
          team_id: 1,
          user_id: this.currentUser.id
        }
        // set a new project in the database
        this.props.createProject(newProject);

        let nextItem = stepToNextItem(i)
        if (nextItem) {
          nextItem.focus();
        }
      } else {
        const target = event.target;
        const value = target.value;
        const empty = (value.length === 0);

        const deleteKeys = (
          key === 'Delete' ||
          key === 'Backspace' ||
          keyCode === 8 ||
          keyCode === 46
        );
        const mustBeOneProject = (Object.keys(this.props.projects).length > 1);
        if (empty && mustBeOneProject && deleteKeys) {
          event.preventDefault();
          this.props.destroyProject(`project${String(parseInt(i))}`);
          this.props.history.push('/');

          let previousItem = stepToPreviousItem(i);
          if (previousItem) {
            previousItem.focus();
          } else {
            // this will focus on the last remaining project if all previous projects are deleted
            let nextItem = stepToNextItem(i);
            if (nextItem) {
              nextItem.focus();
            }
          }
        }
      }
    }
  }

  handleKeyUp (projectID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      const value = event.target.value;
      const project = this.props.projects[projectID];
      project.name = value;

      if (key === 'ArrowUp' || keyCode === 38) {
        event.preventDefault();
        let previousItem = stepToPreviousItem(i)
        if (previousItem) {
          previousItem.focus();
        }
      } else if (key === 'ArrowDown' || keyCode === 40) {
        event.preventDefault();
        let nextItem = stepToNextItem(i)
        if (nextItem) {
          nextItem.focus();
        }
      } else {
        this.props.updateProject(project);
      }
    }
  }

  stepToNextItem(i) {
    return document.getElementById(`project${String(parseInt(i) + 1)}`)
  }

  stepToPreviousItem(i) {
    return document.getElementById(`project${String(parseInt(i) - 1)}`)
  }

  render() {
    return (
      <div className="sidebar-container">
        {Object.keys(this.props.projects).map( (projectID, i) => (
          <NavLink tabIndex="-1" className={`sidebar-nav-link sidebar-item-row`} to={`/projects/${projectID}`} key={`Link${projectID}`}>
            <input
              type="text"
              name={`project${projectID}`}
              id={`project${i}`}
              key={`project${projectID}`}
              defaultValue={this.props.projects[projectID].name}
              className="sidebar-item-row"
              placeholder="_________________________"
              onKeyUp={this.handleKeyUp(projectID, i)}
              onKeyDown={this.handleKeyDown(projectID, i)}
            />
          </NavLink>
          )
        )}
        <div className="spacer"></div>
        <div className="project-help-text">
          &#9166; Enter Adds a New Project
        </div>
        <div className="project-help-text">
          &#9003; Delete Removes an Empty Project
        </div>
        <div className="project-help-text">
          Saving Changes is Automatic
        </div>
      </div>
    )
  }
}

export default withRouter(Projects);
