require('normalize.css');
require('purecss');
require('styles/App.scss');

import React from 'react';
import Editor from './Editor';
import Toolbox, { TOOLS } from './Toolbox';

class AppComponent extends React.Component {
  state = {
    currentColor: '#000000',
    currentBgColor: '#FFFFFF',
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
      <div className="">
        <Editor color={this.state.currentTool === TOOLS.ERASER ? null : this.state.currentColor} bgColor={this.state.currentBgColor} />
        <Toolbox color={this.state.currentColor} bgColor={this.state.currentBgColor} onColorChanged={this.onColorChanged} onBgColorChanged={this.onBgColorChanged} onToolChanged={this.onToolChanged} />
      </div>
    );
  }
}

export default AppComponent;
