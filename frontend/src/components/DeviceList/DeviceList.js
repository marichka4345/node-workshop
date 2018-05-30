import React, { Component, Fragment } from 'react';

import OnOffSwitcher from '../OnOffSwitcher/OnOffSwitcher';

class DeviceList extends Component {
    renderDevice(index) {
        const device = this.props.devices[index];

        return (
            <tr key={ index + 1 }>
                <th scope="row">{device._id}</th>
                <td>{device.name}</td>
                <td>{device.address}</td>
                <td>
                    <div className="btn-toolbar float-right" role="toolbar">
                        <OnOffSwitcher device={ device } onUpdateStatus={ this.onUpdateStatus } />
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-outline-warning" onClick={() => this.props.onDelete(device.id)}>Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    onUpdateStatus = async (id, isOn) => {
        await fetch(`/api/device/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { isOn })
        }).then(this.props.onUpdate);
    }

    render() {
        const devices = this.props.devices.map((device, index) => this.renderDevice(index));

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