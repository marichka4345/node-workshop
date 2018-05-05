import  List  from './List';
import Form from './Form';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    devices: []
  };

  refreshDevices = () =>  {
    fetch('/api/device')
            .then(res => res.json())
            .then((res) => this.setState({ devices: res }));
  }

  deleteDevice = (id) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`/api/device/${id}`, {
      method: 'DELETE',
      headers: myHeaders
    }).then(this.refreshDevices);
  }

  componentDidMount() {
    this.refreshDevices();
  }
  
  render() {
    return (
      <div className="App">
        <List devices={this.state.devices} onDelete={this.deleteDevice} onUpdate={this.refreshDevices}/>
        <Form onAdd={this.refreshDevices} />
      </div>
    );
  }
}

export default App;
