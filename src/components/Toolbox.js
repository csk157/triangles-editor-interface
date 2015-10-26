import React from 'react';
import ColorPicker from 'react-color';

export const TOOLS = {
  FILL_TRIANGLE: 'fill-triangle',
  FILL_RECTANGLE: 'fill-rectangle',
  ERASER: 'erase-triangle',
};

class ToolboxComponent extends React.Component {
  static propTypes = {
    selectedTool: React.PropTypes.string,
    onColorChanged: React.PropTypes.func,
    onBgColorChanged: React.PropTypes.func,
    onToolChanged: React.PropTypes.func,
    onSavePng: React.PropTypes.func,
    onSaveSvg: React.PropTypes.func,
  }
  static defaultProps = {
    selectedTool: TOOLS.FILL_TRIANGLE,
  }
  state = {}
  handleToolClickedFn(tool) {
    return (e) => {
      e.preventDefault();
      this.props.onToolChanged(tool);
    };
  }
  render() {
    return (
      <div className="toolbox">
        <button className={`fill-triangle-btn ${this.props.selectedTool === TOOLS.FILL_TRIANGLE ? 'selected' : ''}`}
          onClick={this.handleToolClickedFn(TOOLS.FILL_TRIANGLE)}>
          Fill Triangle
        </button>
        <button className={`fill-rectangle-btn ${this.props.selectedTool === TOOLS.FILL_RECTANGLE ? 'selected' : ''}`}
          onClick={this.handleToolClickedFn(TOOLS.FILL_RECTANGLE)}>
          Fill Rectangle
        </button>
        <button className={`erase-triangle-btn ${this.props.selectedTool === TOOLS.ERASER ? 'selected' : ''}`}
          onClick={this.handleToolClickedFn(TOOLS.ERASER)}>
          Eraser
        </button>
        <ColorPicker type="sketch" onChange={this.props.onColorChanged} />
        <ColorPicker type="sketch" onChange={this.props.onBgColorChanged} />
        <button className="save-png-btn"
          onClick={this.props.onSavePng}>
          Save as PNG
        </button>
        <button className="save-svg-btn"
          onClick={this.props.onSaveSvg}>
          Save as SVG
        </button>
      </div>
    );
  }
}

export default ToolboxComponent;
