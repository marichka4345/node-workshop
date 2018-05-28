import React, { Component, Fragment } from 'react';

import Modal from '../Modal/Modal';
import DeviceItem from '../DeviceItem/DeviceItem';

export default class GroupList extends Component {
  state = {
    isModalVisible: false
  };

  showModal = (group) => {
    this.setState({
      isModalVisible: true,
      activeGroup: group
    });
  };

  renderGroup(index) {
    const group = this.props.groups[index];

    return (
      <tr key={ index + 1 }>
        <td>{ group.name }</td>
        <td>{ group.devices.map(device => <p>{device.name}</p>) }</td>
        <td>
          <div className="btn-toolbar float-left" role="toolbar">
            <button type="button" className="btn btn-outline-secondary" onClick={ () => this.showModal(group) }>Add/remove device</button>
          </div>
          <div className="btn-toolbar float-right" role="toolbar">
            <div className="btn-group mr-2" role="group">
              <button type="button">On</button>
              <button type="button">Off</button>
            </div>
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