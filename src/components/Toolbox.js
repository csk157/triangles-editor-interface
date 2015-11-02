import React from 'react';
import ColorPicker from 'react-color';

export const TOOLS = {
  FILL_TRIANGLE: 'fill-triangle',
  FILL_RECTANGLE: 'fill-rectangle',
  ERASER: 'erase-triangle',
};

class ToolboxComponent extends React.Component {
  static propTypes = {
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,
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
  state = {
    fillColorPickerCollapsed: false,
    bgColorPickerCollapsed: true,
  }
  handleToolClickedFn(tool) {
    return (e) => {
      e.preventDefault();
      this.props.onToolChanged(tool);
    };
  }
  handleToggleFillColorPicker = () => {
    this.setState({fillColorPickerCollapsed: !this.state.fillColorPickerCollapsed});
  }
  handleToggleBgColorPicker = () => {
    this.setState({bgColorPickerCollapsed: !this.state.bgColorPickerCollapsed});
  }
  renderColorCircle(color) {
    return <i className="color-circle" style={{backgroundColor: color}}></i>;
  }
  renderCollapseChevron(collapsed) {
    return <i className={`fa fa-angle-${collapsed ? 'right' : 'down'}`}></i>;
  }
  renderFillColorPicker() {
    const wrapperClass = `fill-color-picker ${this.state.fillColorPickerCollapsed ? 'hidden' : ''}`;
    return (
      <div>
        <h3 onClick={this.handleToggleFillColorPicker} className="cursor-pointer noselect fill-color-picker-title">
          {this.renderColorCircle(this.props.color)} Fill color {this.renderCollapseChevron(this.state.fillColorPickerCollapsed)}
        </h3>
        <div className={wrapperClass}>
          <ColorPicker type="chrome" color={this.props.color} onChange={this.props.onColorChanged} />
        </div>
      </div>);
  }
  renderBgColorPicker() {
    const wrapperClass = `bg-color-picker ${this.state.bgColorPickerCollapsed ? 'hidden' : ''}`;
    return (
      <div>
        <h3 onClick={this.handleToggleBgColorPicker} className="cursor-pointer noselect bg-color-picker-title">
          {this.renderColorCircle(this.props.bgColor)} Background color {this.renderCollapseChevron(this.state.bgColorPickerCollapsed)}
        </h3>
        <div className={wrapperClass}>
          <ColorPicker type="chrome" color={this.props.bgColor} onChange={this.props.onBgColorChanged} />
        </div>
      </div>);
  }
  render() {
    return (
      <div className="toolbox">
        <div className="tools">
          <button className={`fill-triangle-btn ${this.props.selectedTool === TOOLS.FILL_TRIANGLE ? 'selected' : ''} pure-button`}
            onClick={this.handleToolClickedFn(TOOLS.FILL_TRIANGLE)}
            title="Fill triangles one by one">
            <i className="fa fa-pencil"></i>
          </button>
          <button className={`fill-rectangle-btn ${this.props.selectedTool === TOOLS.FILL_RECTANGLE ? 'selected' : ''} pure-button`}
            onClick={this.handleToolClickedFn(TOOLS.FILL_RECTANGLE)}
            title="Fill as rectangles">
            <i className="fa fa-paint-brush"></i>
          </button>
          <button className={`erase-triangle-btn ${this.props.selectedTool === TOOLS.ERASER ? 'selected' : ''} pure-button`}
            onClick={this.handleToolClickedFn(TOOLS.ERASER)}
            title="Erase triangles one by one">
            <i className="fa fa-eraser"></i>
          </button>
        </div>

        {this.renderFillColorPicker()}
        {this.renderBgColorPicker()}

        <div className="save-options">
          <button className="save-png-btn pure-button block-button"
            onClick={this.props.onSavePng}>
            <i className="fa fa-photo"></i> Save as PNG
          </button>
          <button className="save-svg-btn pure-button block-button"
            onClick={this.props.onSaveSvg}>
            <i className="fa fa-object-ungroup"></i> Save as SVG
          </button>
        </div>
      </div>
    );
  }
}

export default ToolboxComponent;
