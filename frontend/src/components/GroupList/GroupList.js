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
    axios.post(`/api/group/${id}`, { isOn }).then(() => {
      this.props.refreshGroups();
      this.props.refreshDevices();
    });
  };

  renderGroup = (group) => (
    <tr key={ group._id }>
      <td>{ group.name }</td>
      <td>{ group.devices.map(device => <p key={ device._id }>{device.name}</p>) }</td>
      <td>
        <div className="btn-toolbar float-left" role="toolbar">
          <button type="button" className="btn btn-outline-secondary" onClick={ () => this.showModal(group) }>Add/remove device</button>
        </div>
        <div className="btn-toolbar float-right" role="toolbar">
          <OnOffSwitcher item={ { _id: group._id, isOn: group.isOn }} onUpdateStatus={ this.onUpdateStatus } />
        </div>
      </td>
    </tr>
  );

  renderModal = () => (
      <Modal>
        <div className="modal-content">
          <span className="modal-close" onClick={ this.closeModal }>Close &times;</span>
          <p>Devices</p>
          <div className="list-group">
            {
              this.props.devices.map(device => <DeviceItem
                  key={ device._id }
                  group={ this.state.activeGroup }
                  {...device} />)
            }
          </div>
        </div>
      </Modal>
  );

  render() {
    const { isModalVisible } = this.state;

    const groups = this.props.groups.map(group => this.renderGroup(group));
    const modal = this.renderModal();

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

          { isModalVisible ? modal : null }
        </Fragment>
      );
  }
}