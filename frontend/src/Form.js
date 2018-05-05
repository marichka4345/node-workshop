import React, { Component } from 'react';

class Form extends Component {
    state = {ipValue: '', nameValue: ''};

    submit = (event) => {
        const data = this.state;
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('/api/device', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        }).then((res) => { this.props.onAdd(); });
    }
    handleIpChange = (event) => {
        this.setState({ipValue: event.target.value});
    }
    handleNameChange = (event) => {
        this.setState({nameValue: event.target.value});
    }
    render() {
        return (
            <form className="form-inline">
                <div className="form-group mb-2">
                    <label htmlFor="deviceName" className="sr-only">Device Name</label>
                    <input type="text" className="form-control" id="deviceName" placeholder="Device Name"
                    value={this.state.nameValue} onChange={this.handleNameChange} />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="deviceAddress" className="sr-only">IP Address</label>
                    <input type="text" className="form-control" id="deviceAddress" placeholder="IP Address"
                    value={this.state.ipValue} onChange={this.handleIpChange} />
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={this.submit}>Add Device</button>
            </form>
        );
    }
}

export default Form;
