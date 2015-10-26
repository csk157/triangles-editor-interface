require('normalize.css');
require('styles/App.css');

import React from 'react';
import Editor from './Editor';
import Toolbox, { TOOLS } from './Toolbox';

const yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  state = {
    currentColor: '#000000',
    currentBgColor: 'transparent',
    currentTool: TOOLS.FILL_TRIANGLE,
  }
  onColorChanged = (color) => {
    this.setState({ currentColor: '#' + color.hex });
  }
  onBgColorChanged = (color) => {
    this.setState({ currentBgColor: '#' + color.hex });
  }
  onToolChanged = (tool) => {
    this.setState({ currentTool: tool });
  }
  render() {
    return (
      <div className="index">
        <Editor color={this.state.currentTool === TOOLS.ERASER ? null : this.state.currentColor} bgColor={this.state.currentBgColor} />
        <Toolbox color={this.state.currentColor} bgColor={this.state.currentBgColor} onColorChanged={this.onColorChanged} onBgColorChanged={this.onBgColorChanged} onToolChanged={this.onToolChanged} />
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

export default AppComponent;
