import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Modal from '../Modal/Modal';
import DeviceItem from '../DeviceItem/DeviceItem';
import OnOffSwitcher from '../OnOffSwitcher/OnOffSwitcher';

export default class GroupList extends Component {
  state = {
    isModalVisible: false
  };

  showModal = (group) => this.setState({
    isModalVisible: true,
    activeGroup: group
  });

  closeModal = () => {
    this.setState({
      isModalVisible: false
    });

    this.props.refreshGroups();
  };

  onUpdateStatus = async (id, isOn) => {
    axios.post(`/api/group/${id}`, JSON.stringify({ isOn }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => { 
      this.props.refreshGroups();
      this.props.refreshDevices();
    });
}

  renderGroup(index) {
    const group = this.props.groups[index];

    return (
      <tr key={ index + 1 }>
        <td>{ group.name }</td>
        <td>{ group.devices.map(device => <p key={ device._id }>{device.name}</p>) }</td>
        <td>
          <div className="btn-toolbar float-left" role="toolbar">
            <button type="button" className="btn btn-outline-secondary" onClick={ () => this.showModal(group) }>Add/remove device</button>
          </div>
          <div className="btn-toolbar float-right" role="toolbar">
            <OnOffSwitcher device={ group } onUpdateStatus={ this.onUpdateStatus } />
          </div>
        </td>
      </tr>
    );
  }

  render() {
    const { isModalVisible, activeGroup } = this.state;
    const { devices } = this.props;
    const groups = this.props.groups.map((group, index) => this.renderGroup(index));

      return (
        <Fragment>
          <h2>Device Groups</h2>
          {
            groups.length > 0
            ? <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Group Name</th>
                  <th scope="col">Devices</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                  { groups }
              </tbody>
            </table>
            : <p>There are no groups yet</p>
          }

          {
            isModalVisible
            ? <Modal>
                <div className="modal-content">
                  <span className="modal-close" onClick={ this.closeModal }>Close &times;</span>
                  <p>Devices</p>
                  <div className="list-group">
                  {
                    devices.map(device => <DeviceItem
                      key={device.id}
                      {...device} 
                      group={ activeGroup } />)
                  }
                  </div>
                </div>
              </Modal>
            : null
          }
        </Fragment>
      );
  }
}