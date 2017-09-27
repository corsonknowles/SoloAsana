import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { withRouter, Link, NavLink } from 'react-router-dom';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '52%',
    maxWidth              : '500px',
    minWidth              : '470px',
    maxHeight             : '455px',
    minHeight             : '425px',
    height                : '52%',
    display               : 'flex',
    justifyContent        : 'center',
    alignItems            : 'center',
    color                 : '#49505b',
    fontWeight            : 'bold',
    pointerEvents         : 'auto',
    borderRadius          : '10px'
  }
};

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      modalIsOpen: false,
      pending: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.launchDemo = this.launchDemo.bind(this);

    this.clearErrors = this.props.clearErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors()
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/')
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const val = target.value
    this.setState({
      [name]: val
    });
  }

  handleSubmit(type, user){
    return (event) => {
      if (user === undefined) {
        user = this.state;
        user.username = "Awesome User";
      }
      // user["location"] = [user["location"]];
      this.props.processForm(user, type);
    };
  }

  renderErrors(){
    return(
      <div>
        <ul className="errors">

          {this.props.errors.map( (error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </div>
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

  launchDemo(event) {
    event.preventDefault();
    this.openModal();
    setTimeout(() => this.handleDemoLogin(event), 1000);
  }

  handleDemoLogin(event) {
    this.setState({pending: true});
    this.setState({'username': '', 'password': ''});

    let password = "secure";
    let email = "awesome.user@example.com";
    for (let i = 0; i < email.length; i++) {
      setTimeout(() => this.setState({
        email: email.slice(0, i + 1)}), (i * 50));
    }

    for (let j = 0; j < password.length; j++) {
      setTimeout(() => this.setState({ password: password.slice(0, j + 1) }), ((j + 24) * 50));
    }

    const user = {
      password: "secure",
      email: "awesome.user@example.com"
    };

    setTimeout(this.handleSubmit("login", user), 1550);
  }

  disableButtons() {
    this.state.pending = true;
  }

  render() {

    return (
      <div>
        <header>
          <nav className="nav-left">
            <Link to="/">
              <img src='https://res.cloudinary.com/cloudfunded/image/upload/c_scale,w_140/v1500505306/solo_logo_jukva4.png' />
            </Link>
          </nav>

          <nav className="nav-right">

            <div className='hire-me'>
              <a className='hire-me' href='https://github.com/corsonknowles'>GitHub</a><br />
              <a className='hire-me' href='http://linkedin.com/in/davidcorsonknowles/'>LinkedIn</a><br />
              <a className='hire-me' href='mailto:recruiter.inquiries@soloasana.com'>Contact</a><br />
            </div>

            <div className="nav-buttons">
              <button onClick={this.openModal}>Register to Get Started</button>
              <button className='white' onClick={this.openModal}>Log In</button>
            </div>

          </nav>
        </header>

        <main className="login-page">
          <h1 className="login-call-to-action">
            Move work forward
          </h1>

          <h3 className="login-tagline">
            Solo is the easiest way to track your tasks—
            <br />and get results.
          </h3>

          <div className="login-form-container">

            <button className="white demo" onClick={(event) => this.launchDemo(event)}>Check Out the DEMO Account</button>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Login Form"
              >

              <div className="form login">
                { this.renderErrors() }
                <h2>Register or Log In</h2>

                <button disabled={!!(this.state.pending)} onClick={ (event) => this.handleDemoLogin(event)}>
                  Demo User
                </button>

                <div className="login-box">
                  <label htmlFor="email" className="login-label">EMAIL ADDRESS</label>

                  <input type="text" name="email" id="email"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event)}
                    className="login-input"
                    placeholder="recruiter.inquiries@soloasana.com"
                    disabled={!!(this.state.pending)}
                    />

                  <label htmlFor="password" className="login-label">PASSWORD</label>

                  <input type="password" name="password" id="password"
                    value={this.state.password}
                    onChange={(event) => this.handleChange(event)}
                    className="login-input"
                    placeholder="6 characters or more"
                    disabled={!!(this.state.pending)}
                    />
                </div>

                <div>
                  <button className="white" disabled={!!(this.state.pending)} onClick={this.handleSubmit('signup')}>
                    Register
                  </button>

                  <button disabled={!!(this.state.pending)} onClick={this.handleSubmit('login')}>
                    Log In
                  </button>
                </div>

              </div>

              <button className="close-modal" onClick={this.closeModal}>X</button>

            </Modal>

          </div>
        </main>
      </div>
    );
  }
}

export default SessionForm;
