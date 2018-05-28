import React, { Component, Fragment } from 'react';

class DeviceList extends Component {
    renderDevice(index) {
        const device = this.props.devices[index];
        let offBtnClassName;
        let onBtnClassName;

        if(device.isOn) {
            offBtnClassName = 'btn btn-outline-secondary';
            onBtnClassName = 'btn btn-outline-primary active';
        } else {
            offBtnClassName = 'btn btn-otline-primary active';
            onBtnClassName = 'btn btn-outline-secondary';
        }

        return (
            <tr key={ index + 1 }>
                <th scope="row">{device.id}</th>
                <td>{device.name}</td>
                <td>{device.address}</td>
                <td>
                    <div className="btn-toolbar float-right" role="toolbar">
                        <div className="btn-group mr-2" role="group">
                            <button type="button" className={onBtnClassName} onClick={() => this.onUpdateStatus(device.id, true)}>On</button>
                            <button type="button" className={offBtnClassName} onClick={ () => this.onUpdateStatus(device.id, false) }>Off</button>
                        </div>
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