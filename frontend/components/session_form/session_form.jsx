import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;
		this.setState({
			[name]: event.target.value
		});
	}

	handleSubmit(type){
		return () => {
			const user = this.state;
			this.props.processForm(user, type);
		};
	}

	renderErrors(){
		return(
			<ul>
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
		this.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	render() {

		return (
			<div>
				{ this.renderErrors() }
				<div className="login-page">
					<div className="login-call-to-action">
						Move work forward<br />
					</div>

					<div className="login-tagline">
						Asana is the easiest way for teams to track their work
						<br />—and get results.
					</div>

					<div className="login-form-container">

							<button onClick={this.openModal}>Demo Login</button>
			        <Modal
			          isOpen={this.state.modalIsOpen}
			          onAfterOpen={this.afterOpenModal}
			          onRequestClose={this.closeModal}
			          style={customStyles}
			          contentLabel="Example Modal"
			        >

								<div className="login-form">
									<br />
									<label> Email:
										<input type="text" name="email"
											value={this.state.email}
											onChange={this.handleChange}
											className="login-input" />
									</label>

									<br />
									<label> Password:
										<input type="password" name="password"
											value={this.state.password}
											onChange={this.handleChange}
											className="login-input" />
									</label>

									<br />
									<button onClick={this.handleSubmit('login')}>
										Log In
									</button>
									<button onClick={this.handleSubmit('signup')}>
										Sign Up
									</button>
								</div>


			          <button onClick={this.closeModal}>close</button>
			          <form>
			            <input />
			          </form>
			        </Modal>



					</div>
				</div>
			</div>
		);
	}

}

export default SessionForm;
