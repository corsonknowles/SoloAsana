import React from 'react';
import ReactDOM from 'react-dom';


class Tasks extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

    }
    this.currentUser = this.props.currentUser;

    this.handleChange = this.handleChange.bind(this);

  }


  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });

  }


  render() {

    return (
    <div>
      This is my placeholder task.
      Replace this with a placeholder form
      Or better yet a real form. 

    </div>

  )
  }
}

export default Tasks;
