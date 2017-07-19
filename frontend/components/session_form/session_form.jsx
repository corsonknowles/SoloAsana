import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom'


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


class SessionForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: "",
			username: "Awesome User",
			modalIsOpen: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.handleDemoLogin = this.handleDemoLogin.bind(this);
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

	handleDemoLogin(event) {

	  event.preventDefault();

    this.disableButtons();

    this.setState({'username': '', 'password': ''});

		let password = "secure";
	  let email = "awesome.user@example.com";
	  for (let i = 0; i < email.length; i++) {
	    setTimeout(() => this.setState({
	      email: email.slice(0, i + 1)}), (i * 50));
	  }
	  for (let j = 0; j < password.length; j++) {
	    setTimeout(() => this.setState({
	      password: password.slice(0, j + 1)}), ((j + 24) * 50));
	  }
	  const user = {
			password: "secure",
	    email: "awesome.user@example.com"
	  };

	  setTimeout(this.handleSubmit("login", user), 1550);
	}

  disableButtons() {
    $("#login-form :button").prop("disabled", true);
  }

	render() {

		return (
			<div>
				<nav>
            <div className="nav-left">
              <Link to="/">
              <img src='http://res.cloudinary.com/cloudfunded/image/upload/c_scale,w_140/v1500505306/solo_logo_jukva4.png' />
              </Link>
            </div>
          <div className="nav-right">
  					<a className='hire-me' href='https://github.com/corsonknowles'>GitHub &nbsp;</a>
  					<a className='hire-me' href='http://linkedin.com/in/davidcorsonknowles/'>LinkedIn &nbsp;</a>
            <button onClick={this.openModal}>Get a Demo for FREE</button>
  					<button className='white' onClick={this.openModal}>Log In</button>
          </div>
				</nav>
				<div className="login-page">
					<h1 className="login-call-to-action">
						Move work forward<br />
        </h1>

					<h3 className="login-tagline">
						Asana is the easiest way for teams to track their work
						<br />—and get results.
					</h3>

					<div className="login-form-container">

							<button onClick={this.openModal}>Get a Demo for FREE</button>
			        <Modal
			          isOpen={this.state.modalIsOpen}
			          onAfterOpen={this.afterOpenModal}
			          onRequestClose={this.closeModal}
			          style={customStyles}
			          contentLabel="Example Modal"
			        >

								<div className="login-form">
									{ this.renderErrors() }
									<h2>Log In</h2>
									<br />
									<button onClick={ (event) => this.handleDemoLogin(event)}>
										Demo User
									</button>
									<br />
									<label className="signup-label"> EMAIL ADDRESS<br />
										<input type="text" name="email"
											value={this.state.email}
											onChange={this.handleChange}
											className="login-input"
											placeholder="email@company.com"
											 />
									</label>

									<br />
									<label className="signup-label"> PASSWORD<br />
										<input type="password" name="password"
											value={this.state.password}
											onChange={this.handleChange}
											className="login-input"
											placeholder="6 characters or more"
										/>
									</label>

									<br />
                  <button className="white" onClick={this.handleSubmit('signup')}>
										Sign Up
									</button>

                  <button onClick={this.handleSubmit('login')}>
										Log In
									</button>

								</div>

			          <button className="close-modal" onClick={this.closeModal}>X</button>

			        </Modal>

					</div>
				</div>
			</div>
		);
	}
}

export default SessionForm;
