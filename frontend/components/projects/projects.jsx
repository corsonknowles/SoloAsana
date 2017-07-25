import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';
import { ProjectItem } from './project_item';

class Project extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      projects: this.props.projects

    }
    this.logout = this.props.logout;
    this.currentUser = this.props.currentUser;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {

    return (
    <div>

      this.state.projects.map(project => (
        <ProjectItem
          key={ project.id }
          project={ project }
          />
      )
    );

      <label htmlFor="username" className="profile-label">USERNAME</label>
        <input type="text" name="username"
          value={this.state.username}
          onChange={this.handleChange}
          className="profile-input"
          placeholder="Watch me update in real time"
        />

      <label htmlFor="role" className="profile-label">ROLE </label>
        <input type="text" name="role"
          value={this.state.role}
          onChange={this.handleChange}
          className="profile-input"
          placeholder=""
        />

      <label htmlFor='department' className="profile-label">DEPARTMENT</label>
        <input type="text" name="department"
          value={this.state.department}
          onChange={this.handleChange}
          className="profile-input"
          placeholder=""
        />

      <label htmlFor="about" className="profile-label">ABOUT ME  </label>
        <input type="text" className="about" name="about"
          value={this.state.about}
          onChange={this.handleChange}
          className="profile-input"
          placeholder="At work I run dev ops. At home, I rescue kittens."
        />



    </div>

  )
  }
}

export default Project;
