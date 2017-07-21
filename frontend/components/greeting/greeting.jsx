import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
		width									: '50%',
		maxWidth							: '575px',
    minWidth              : '500px',
		maxHeight							: '585px',
		height								: '80%',
		display								: 'flex',
		justifyContent				: 'center',
		alignItems						: 'center',
		color									: '#49505b',
		fontWeight						:	'bold',
		pointerEvents	        : 'auto',
		borderRadius					: '10px'

  }
};

class Greeting extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      modalIsOpen: false,
      username: this.props.currentUser.username,
      role: this.props.currentUser.role,
      department: this.props.currentUser.department,
      about: this.props.currentUser.about,
      photo: this.props.currentUser.photo

    }
    this.logout = this.props.logout;
    this.currentUser = this.props.currentUser;
    // this.username = this.currentUser.username;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

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
      user.role = this.state.role;
      user.department = this.state.department;
      user.about = this.state.about;
      user.photo = this.state.photo;

      this.props.updateUser(user);
      this.closeModal()
    };
  }

  renderErrors(){
    return(
      <ul className="errors">
        {this.props.errors.map( (error, i) => (
          <li key={`error-${i}`}>
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
      <nav>
         <h3>Welcome Awesome User</h3>
         <button onClick={this.openModal}>Account</button>

         <button className="header-button" onClick={this.logout} >Log Out</button>
      </nav>
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="User Profile"
        >
        <div className="profile-form">

          <h2 className="profile-title">My Profile Settings</h2>
          <br />

          <br />
          <label className="profile-label">&nbsp;&nbsp; USERNAME <br />
            <input type="text" name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="profile-input"
              placeholder="Awesome User"
            />
          </label>
          <label className="profile-label">&nbsp;&nbsp; ROLE <br />
            <input type="text" name="role"
              value={this.state.role}
              onChange={this.handleChange}
              className="profile-input"
              placeholder=""
            />
          </label>
          <label className="profile-label">&nbsp;&nbsp; DEPARTMENT <br />
            <input type="text" name="department"
              value={this.state.department}
              onChange={this.handleChange}
              className="profile-input"
              placeholder=""
            />
          </label>
          <label className="profile-label">&nbsp;&nbsp; ABOUT ME <br />
            <input type="text" className="about" name="about"
              value={this.state.about}
              onChange={this.handleChange}
              className="profile-input"
              placeholder="At work I run dev ops. At home, I rescue kittens."
            />
          </label>

          <br />
          <button className="blue" onClick={this.handleSubmit()}>
            Update Profile
          </button>


        </div>

        <button className="close-modal" onClick={this.closeModal}>X</button>

      </Modal>


      </div>

      <section>
        Progress
      </section>
    </div>

  )
  }
}

export default Greeting;
