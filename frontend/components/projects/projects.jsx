import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';
import { ProjectItem } from './project_item';

class Projects extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {

      projects: this.props.projects

    }

    this.currentUser = this.props.currentUser;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }

  componentWillMount () {
    this.props.fetchProjects(1)
    setTimeout(() => console.log("this.props in willMount", this.props), 2000);
  }

  componentWillReceiveProps (nextProps) {
    console.log("will receive props");
    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    }
  }

  componentWillUnmount() { this.props.clearErrors()};

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    // let editField = this.state.projects[event.target.key];
    this.setState({
      [this.state.projects[event.target.key][name]]: event.target.value
    });

  }

  handleSubmit(user){

    return () => {
      let projects = this.state.projects;
      //need to pick out the individual project or bulk update all projects
      this.props.updateProject(project);

    };
  }

  renderErrors(){
    return(

      <ul className="errors">
        {this.props.errors.map( (error, i) => (
          <li className="eachError" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }



  render() {

    // console.log("state.projects", this.state.projects);
    //
    // console.log("this.state", this.state);
    // console.log("this.props", this.props);
    if (!this.state.projects[1]) {
      this.state.projects = { [1]: {name: "" } }
    }

    console.log(this.state.projects);
    return (

    <div>

      {Object.keys(this.state.projects).map( (projectID) => (
          <input
            type="text"
            name={projectID}
            key={projectID}
            value={this.state.projects[projectID].name}
            onChange={this.handleChange}
            className="sidebar-item-row"
            placeholder="Should be a project input field"
          />
        )
      )}

    </div>

  )
  }
}

export default Projects;
