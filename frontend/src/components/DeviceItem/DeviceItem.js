import React, { Component } from 'react';
import axios from 'axios';

import './deviceItem.css';

export default class DeviceItem extends Component {
  state = {
    group: {}
  };

  componentWillMount() {
    this.setState({
      group: this.props.group
    })
  }

  addRemoveGroupDevice = () => {
    const { _id: id } = this.props;
    const { group } = this.state;

    this.setState({
      isButtonDisabled: true
    });

    axios.put(`/api/group/${group._id}`, JSON.stringify({ id }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => { 
      this.refreshGroup(group); 
      this.setState({
        isButtonDisabled: false
      });
    });
  };

  refreshGroup = (group) => {
    axios.get(`/api/group/${group._id}`)
      .then(res => this.setState({
        group: res.data
      }));
  }

  isDeviceInGroup = (id) => {
    const groupDevices = this.state.group.devices;

    const foundDevice = groupDevices.find(device => device._id === id);
    return !!foundDevice;
  }

  render() {
    const { name, _id: id } = this.props;
    const { isButtonDisabled }= this.state;

    return (<div className="list-group-item device-item">
      <span>{ name }</span>
      <div className="float-right">
        <button className="btn btn-outline-primary" disabled={ isButtonDisabled }>
        {
          this.isDeviceInGroup(id)
          ? <span onClick={ this.addRemoveGroupDevice }>Remove</span>
          : <span onClick={ this.addRemoveGroupDevice }>Add</span>
        }
        </button> 
      </div>
    </div>);
  }
}