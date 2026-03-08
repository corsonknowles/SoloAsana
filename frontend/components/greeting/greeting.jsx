import React from 'react';
import Modal from 'react-modal';
import PhotoUpload from '../photo_upload/photo_upload';
import TaskContainer from '../tasks/task_container';
import ProjectsContainer from '../projects/projects_container';
import { modalContentStyles } from '../../util/modal_styles';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    const currentUser = props.currentUser;
    const username = currentUser.username || "";
    const role = currentUser.role || "";
    const department = currentUser.department || "";
    const about = currentUser.about || "";
    const photo = currentUser.photo || "";

    this.state = {
      modalIsOpen: false,
      username,
      role,
      department,
      about,
      photo
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearErrors = this.props.clearErrors.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const val = target.value || "";
    this.setState({
      [name]: val
    });
  }

  handleSubmit() {
    const user = {
      ...this.props.currentUser,
      username: this.state.username,
      role: this.state.role,
      department: this.state.department,
      about: this.state.about,
    };

    this.props.updateUser(user);
    this.closeModal();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderErrors() {
    return(
      <div>
        <ul className="errors">
          {this.props.errors && this.props.errors.map( (error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="one-page-app">
        <section>
          <div className="projects-header">PROJECTS</div>
          <ProjectsContainer />
        </section>
        <div className="content-container">
          <header className="greeting-nav">
            <h3 className="nav-left">Welcome {this.state.username}</h3>
            <div className="form login">
              { this.renderErrors() }
            </div>
            <nav className="nav-right">
              <button className="gold" onClick={this.openModal}>Account</button>
              <button className="header-button gold" onClick={this.props.logout} >Log Out</button>
            </nav>
          </header>
          <div className="right-side-of-page">
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalContentStyles}
              contentLabel="User Profile"
            >
              <div className="form profile">
                <h2 className="profile-title">My Profile Settings</h2>
                <PhotoUpload currentUser={this.props.currentUser} updateUser={this.props.updateUser} />

                <label htmlFor="username" className="profile-label">USERNAME</label>
                <input type="text" name="username"
                  value={this.state.username}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder="Watch me update in real time"
                />

                <label htmlFor="role" className="profile-label">ROLE</label>
                <input type="text" name="role"
                  value={this.state.role}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder="Job Title"
                />

                <label htmlFor='department' className="profile-label">DEPARTMENT</label>
                <input type="text" name="department"
                  value={this.state.department}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder="Engineering"
                />

                <label htmlFor="about" className="profile-label">ABOUT ME</label>
                <input type="text" name="about"
                  value={this.state.about}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input about"
                  placeholder="At work I run dev ops. At home, I rescue kittens."
                />

                <button className="blue" onClick={this.handleSubmit}>
                  Update Profile
                </button>
              </div>
              <button className="close-modal" onClick={this.closeModal}>X</button>
            </Modal>
            <main className="tasks-area">
              <TaskContainer />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Greeting;
