import React, { Component } from "react";

import Game from "./components/Game/Game";

import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Game />
      </div>
    );
  }
}

export default App;
