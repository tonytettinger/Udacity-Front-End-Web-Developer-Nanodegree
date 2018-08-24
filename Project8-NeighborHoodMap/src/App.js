import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <iframe
      width = "600"
      height = "450"
      frameborder = "0"
      style = "border:0"
      src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCQxUvYPmq2t3cMSz0ulVZ4Wu4ZJwImNjA &
        q = Space + Needle, Seattle + WA " allowfullscreen> <
        /iframe>
    );
  }
}

export default App;
