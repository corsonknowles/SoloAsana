import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';
import PhotoUploadContainer from '../photo_upload/photo_upload_container';
import TaskContainer from '../tasks/task_container';
import ProjectsContainer from '../projects/projects_container';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%',
    maxWidth              : '575px',
    minWidth              : '500px',
    maxHeight             : '585px',
    height                : '80%',
    display               : 'flex',
    justifyContent        : 'center',
    alignItems            : 'center',
    color                 : '#49505b',
    fontWeight            : 'bold',
    pointerEvents         : 'auto',
    borderRadius          : '10px'
  }
};

class Greeting extends React.Component {

  constructor(props) {
    super(props)

    // let props = this.props;
    let currentUser = props.currentUser;
    let username = currentUser.username || "";
    let role = currentUser.role || "";
    let department = currentUser.department || "";
    let about = currentUser.about || "";
    let photo = currentUser.photo || "";

    this.state = {
      modalIsOpen: false,
      photoModalIsOpen: false,
      uploadedFileCloudinaryUrl: '',
      username,
      role,
      department,
      about,
      photo
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
    if( !event ) event = window.event;
    const target = event.target;
    const name = target.name;
    let val = target.value || "";
    this.setState({
      [name]: val
    });
  }

  handleSubmit(event, user){
    if( !event ) event = window.event;
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
      <div className="one-page-app">

        <section>
          <div className="projects-header">PROJECTS</div>
          <ProjectsContainer />
        </section>

        <div className="content-container">
          <header className="greeting-nav">
            <h3 className="nav-left">Welcome {this.state.username}</h3>
            <nav className="nav-right">
              <button className="gold" onClick={this.openModal}>Account</button>
              <button className="header-button gold" onClick={this.logout} >Log Out</button>
            </nav>
          </header>

          <div className="right-side-of-page">

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="User Profile"
              >
              <div className="form profile">

                <h2 className="profile-title">My Profile Settings</h2>

                <PhotoUploadContainer />

                <label htmlFor="username" className="profile-label">USERNAME</label>
                <input type="text" name="username"
                  value={this.state.username}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder="Watch me update in real time"
                  />

                <label htmlFor="role" className="profile-label">ROLE </label>
                <input type="text" name="role"
                  value={this.state.role}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder=""
                  />

                <label htmlFor='department' className="profile-label">DEPARTMENT</label>
                <input type="text" name="department"
                  value={this.state.department}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder=""
                  />

                <label htmlFor="about" className="profile-label">ABOUT ME  </label>
                <input type="text" className="about" name="about"
                  value={this.state.about}
                  onChange={(event) => this.handleChange(event)}
                  className="profile-input"
                  placeholder="At work I run dev ops. At home, I rescue kittens."
                  />

                <button className="blue" onClick={(event) => this.handleSubmit(event)}>
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
    )}
  }
  export default Greeting;
