import React, { Component } from 'react';
import axios from 'axios';

import './deviceForm.css';

class DeviceForm extends Component {
    state = {
      ipValue: '',
      nameValue: ''
    };

    submit = (event) => {
      event.preventDefault();
      const data = this.state;
      axios.post('/api/device', data).then(() => { this.props.onAdd(); });
    };

    render() {
        return (
        <form className="form-inline add-item-form">
        <div className="form-group mb-2">
            <label htmlFor="deviceName" className="sr-only">Device Name</label>
            <input
                type="text"
                className="form-control"
                id="deviceName"
                placeholder="Device Name"
                value={ this.state.nameValue }
                onChange={ ({ target }) => this.setState({ nameValue: target.value })} />
        </div>
        <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="deviceAddress" className="sr-only">IP Address</label>
            <input
                type="text"
                className="form-control"
                id="deviceAddress"
                placeholder="IP Address"
                value={ this.state.ipValue }
                onChange={ ({ target }) => this.setState({ ipValue: target.value }) } />
        </div>
        <button type="submit" className="btn btn-primary mb-2" onClick={this.submit}>Add Device</button>
        </form>
        );
    }
}

export default DeviceForm;
