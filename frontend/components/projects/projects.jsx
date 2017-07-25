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

      projects: this.props.project

    }

    this.currentUser = this.props.currentUser;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }

  componentWillUnmount() { this.props.clearErrors()};

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });

  }

  handleSubmit(user){

    return () => {
      let user = this.currentUser;
      user.username = this.state.username;
      user.role = this.state.role;
      user.department = this.state.department;
      user.about = this.state.about;

      this.props.updateUser(user);
      this.closeModal()
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

    return (
    <div>



      <label htmlFor="project" className="project-label"></label>
        <input type="text" name="project"
          value={this.state.projects}
          onChange={this.handleChange}
          className="sidebar-item-row"
          placeholder="Should be a project input field"
        />

    </div>

  )
  }
}

export default Projects;
