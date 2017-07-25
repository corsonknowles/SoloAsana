import React from 'react';
import merge from 'lodash/merge';

class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {


    return (
      <li className="project-list-item">
        <div className="project-header">
          <h3><a >{title}</a></h3>
          <button>
            test
          </button>
        </div>
      </li>
    );
  }
}

export default ProjectListItem;
