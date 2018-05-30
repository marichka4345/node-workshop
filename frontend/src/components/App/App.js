import React, { Component } from 'react';
import axios from 'axios';

import  DeviceList  from '../DeviceList/DeviceList';
import DeviceForm from '../DeviceForm/DeviceForm';
import GroupList from '../GroupList/GroupList';
import GroupForm from '../GroupForm/GroupForm';
import ActionHistory from '../ActionHistory/ActionHistory';
import Loader from '../Loader/Loader';

import './App.css';

const FETCH_URL = {
  devices: '/api/device',
  groups: '/api/group',
  logs: '/api/log'
};

export default class App extends Component {
  state = {
    devices: [],
    groups: [],
    logs: [],
    deviceListIsLoading: true,
    groupListIsLoading: true
  };

  componentDidMount() {
    this.refreshDevices();
    this.refreshGroups();
    this.refreshLogs();
  }

  refreshItems = (isLoadingIndicator, items) => {
    this.setState({ [isLoadingIndicator]: true });

    axios.get(FETCH_URL[items])
        .then(({ data }) => this.setState({
          [items]: data,
          [isLoadingIndicator]: false
        }));
  };

  refreshDevices = () =>  {
    this.refreshItems('deviceListIsLoading', 'devices');
    this.refreshLogs();
  };
  refreshGroups = () =>  this.refreshItems('groupListIsLoading', 'groups');
  refreshLogs = () => this.refreshItems('logsAreLoading', 'logs')

  deleteDevice = (id) => axios.delete(`/api/device/${id}`).then(this.refreshDevices);
  deleteGroup = (id) => axios.delete(`/api/group/${id}`).then(this.refreshGroups);
  
  render() {
    const {
      deviceListIsLoading, groupListIsLoading,
      devices, groups, logs
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

        <ActionHistory logs={ logs } />
      </div>
    );
  }
}
