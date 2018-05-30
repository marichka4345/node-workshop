import React, { Component } from 'react';
import axios from 'axios';

import  DeviceList  from '../DeviceList/DeviceList';
import DeviceForm from '../DeviceForm/DeviceForm';
import GroupList from '../GroupList/GroupList';
import GroupForm from '../GroupForm/GroupForm';
import Loader from '../Loader/Loader';

import './App.css';

const FETCH_URL = {
  devices: '/api/device',
  groups: '/api/group'
};

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

  refreshItems = (isLoadingIndicator, items) => {
    this.setState({ [isLoadingIndicator]: true });

    axios.get(FETCH_URL[items])
        .then(({ data }) => this.setState({
          [items]: data,
          [isLoadingIndicator]: false
        }));
  };

  refreshDevices = () =>  this.refreshItems('deviceListIsLoading', 'devices');
  refreshGroups = () =>  this.refreshItems('groupListIsLoading', 'groups');

  deleteDevice = (id) => axios.delete(`/api/device/${id}`).then(this.refreshDevices);
  deleteGroup = (id) => axios.delete(`/api/group/${id}`).then(this.refreshGroups);
  
  render() {
    const {
      deviceListIsLoading, groupListIsLoading,
      devices, groups
    } = this.state;

    return (
      <div className="App">
        <DeviceForm onAdd={ this.refreshDevices } />
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
          : <GroupList
              groups={ groups }
              devices={ devices }
              onDelete={ this.deleteGroup }
              refreshGroups={ this.refreshGroups }
              refreshDevices={ this.refreshDevices }/>
        }
      </div>
    );
  }
}
