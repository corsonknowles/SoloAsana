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
		maxWidth							: '500px',
		maxHeight							: '455px',
		height								: '50%',
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
    }
    this.logout = this.props.logout;
    this.currentUser = this.props.currentUser;

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
         <button className="header-button" onClick={this.logout} >Log Out</button>
      </nav>
    </div>

  )
  }
}

export default Greeting;
