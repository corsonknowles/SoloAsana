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
      email: this.props.currentUser.email

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

  handleSubmit(type, user){
    return () => {
      if (user === undefined) {
        user = this.state;
      }
      this.props.processForm(user, type);
    };
  }

  // renderErrors(){
  //   return(
  //     <ul className="errors">
  //       {this.props.errors.map( (error, i) => (
  //         <li key={`error-${i}`}>
  //           {error}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

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

          <h2>My Profile Settings</h2>
          <br />

          <label className="profile-label"> EMAIL ADDRESS<br />
            <input type="text" name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="login-input"
              placeholder="format like: &nbsp; recruiter.inquiries@soloasana.com"
               />
          </label>

          <br />
          <label className="profile-label"> USERNAME <br />
            <input type="text" name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="profile-input"
              placeholder="6 characters or more"
            />
          </label>
          <label className="profile-label"> ROLE <br />
            <input type="text" name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="profile-input"
              placeholder="6 characters or more"
            />
          </label>
          <label className="profile-label"> DEPARTMENT <br />
            <input type="text" name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="profile-input"
              placeholder="6 characters or more"
            />
          </label>
          <label className="profile-label"> ABOUT ME <br />
            <input type="text" name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="profile-input"
              placeholder="At work I run dev ops. At home, you'll find me watching murder mysteries and talking my cat off the ledge. Metaphorically."
            />
          </label>

          <br />
          <button className="blue right" onClick={this.handleSubmit('signup')}>
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
