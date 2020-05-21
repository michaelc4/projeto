import React, { Component } from 'react';
import './App.css';
import Usuarios from './components/usuarios';

class App extends Component {

  state = {
    usuarios: []
  }

  componentDidMount() {
    fetch('http://192.168.92.1:8080/projeto/usuario')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ usuarios: data })
      })
      .catch(console.log)
  }

  render() {
    return (
      <Usuarios usuarios={this.state.usuarios} />
    );
  }
}

export default App;
