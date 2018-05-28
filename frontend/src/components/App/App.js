import React, { Component } from 'react';

import  DeviceList  from '../DeviceList/DeviceList';
import DeviceForm from '../DeviceForm/DeviceForm';
import GroupList from '../GroupList/GroupList';
import GroupForm from '../GroupForm/GroupForm';
import Loader from '../Loader/Loader';

import './App.css';

export default class App extends Component {
  state = {
    devices: [],
    groups: [],
    deviceListIsLoading: true,
    groupListIsLoading: true
  };

  componentDidMount() {
    this.refreshDevices();
    this.refreshGroups();
  }

  refreshDevices = () =>  {
    this.setState({ deviceListIsLoading: true });

    fetch('/api/device')
      .then(res => res.json())
      .then((res) => this.setState({
        devices: res,
        deviceListIsLoading: false
      }));
  };

  refreshGroups = () =>  {
    this.setState({ groupListIsLoading: true });

    fetch('/api/group')
      .then(res => res.json())
      .then(res => this.setState({
        groups: res,
        groupListIsLoading: false
      }));
  };

  deleteDevice = (id) => {
    let requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json');

    fetch(`/api/device/${id}`, {
      method: 'DELETE',
      headers: requestHeaders
    }).then(this.refreshDevices);
  };
  
  render() {
    const { deviceListIsLoading, groupListIsLoading, devices, groups } = this.state;
    return (
      <div className="App">
        <DeviceForm onAdd={this.refreshDevices} />
        {
          deviceListIsLoading
          ? <Loader />
          : <DeviceList
            devices={ devices }
            onDelete={ this.deleteDevice }
            onUpdate={ this.refreshDevices }/>
        }

        <GroupForm onAdd={ this.refreshGroups } />
        {
          groupListIsLoading
          ? <Loader />
          : <GroupList groups={ groups } devices={ devices } />
        }
      </div>
    );
  }
}
