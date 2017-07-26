import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';

class TaskItem extends React.Component {
  constructor(props) {
    super (props)

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
        placeholder text
      </div>
    )
  }

}

export default TaskItem;
