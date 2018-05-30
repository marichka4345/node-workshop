import React, { Component, Fragment } from 'react';
import axios from 'axios';

import OnOffSwitcher from '../OnOffSwitcher/OnOffSwitcher';

class DeviceList extends Component {
  onUpdateStatus = async (id, isOn) => axios.post(`/api/device/${id}`, { isOn }).then(this.props.onUpdate);

  renderDevice = ({ _id, name, address, isOn }) => (
    <tr key={ _id }>
      <th scope="row">{ _id}</th>
      <td>{ name }</td>
      <td>{ address }</td>
      <td>
        <div className="btn-toolbar float-right" role="toolbar">
          <OnOffSwitcher item={ { _id, isOn } } onUpdateStatus={ this.onUpdateStatus } />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-warning" onClick={() => this.props.onDelete(_id)}>
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );

  render() {
    const devices = this.props.devices.map(device => this.renderDevice(device));

    return (
      <Fragment>
        <h2>Devices</h2>
        {
          devices.length > 0
          ? <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Device Name</th>
                <th scope="col">Device Address</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
                { devices }
            </tbody>
          </table>
          : <p>There are no devices yet</p>
        }
      </Fragment>
    );
  }
}

export default DeviceList;