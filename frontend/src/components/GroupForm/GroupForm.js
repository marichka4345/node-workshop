import React, { Component } from 'react';
import axios from 'axios';

import './groupForm.css';

export default class GroupForm extends Component {
  state = { name: '' };

  submit = (event) => {
    event.preventDefault();

    const data = this.state;
    axios.post('/api/group', data).then(() => { this.props.onAdd(); });
  };

  render() {
    const { name } = this.state;

      return (
          <form className="form-inline add-item-form">
              <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="groupName" className="sr-only">Group Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="groupName"
                    placeholder="Group Name"
                    value={ name }
                    onChange={ ({ target }) => this.setState({ name: target.value }) } />
              </div>
              <button type="submit" className="btn btn-primary mb-2" onClick={ this.submit }>Add Group</button>
          </form>
      );
  }
}
