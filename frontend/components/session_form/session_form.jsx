import React from 'react';

class SessionForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: "",
			username: "Awesome User"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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

							<br />
							<br />
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
					</div>
				</div>
			</div>
		);
	}

}

export default SessionForm;
