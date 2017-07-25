import React from 'react';

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
