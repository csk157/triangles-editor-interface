require('bulma');
require('../styles/App.scss');

import React from 'react';
import Editor from './Editor';
import Toolbox, { TOOLS } from './Toolbox';

class AppComponent extends React.Component {
  state = {
    currentColor: '#000000',
    currentBgColor: '#FFFFFF',
    currentTool: TOOLS.FILL_TRIANGLE,
    showGrid: true,
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
  onSavePng = () => {
    const l = document.createElement('a');
    this.refs.editor.showGrid(false);
    l.href = this.refs.editor.getDataUrl();
    this.refs.editor.showGrid(this.state.showGrid);
    l.download = 'triangles.png';
    l.click();
  }
  onGridToggle = () => {
    this.setState({ showGrid: !this.state.showGrid });
    this.refs.editor.showGrid(!this.state.showGrid);
  }
  render() {
    return (
      <div>
        <Editor ref="editor"
          color={this.state.currentTool === TOOLS.ERASER ? null : this.state.currentColor}
          bgColor={this.state.currentBgColor} />
        <Toolbox
          selectedTool={this.state.currentTool}
          color={this.state.currentColor}
          bgColor={this.state.currentBgColor}
          grid={this.state.showGrid}
          onGridChanged={this.onGridToggle}
          onSavePng={this.onSavePng}
          onSaveSvg={this.onSaveSvg}
          onColorChanged={this.onColorChanged}
          onBgColorChanged={this.onBgColorChanged}
          onToolChanged={this.onToolChanged} />
      </div>
    );
  }
}

export default AppComponent;
