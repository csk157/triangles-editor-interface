import React from 'react';
import TriangleEditor from 'triangles-editor';
import { TOOLS } from './Toolbox';

function eventToElementPoint(e) {
  return {
    x: e.pageX - e.target.offsetLeft,
    y: e.pageY - e.target.offsetTop,
  };
}

const UNIT_SIZE = 20;
const FILL_RECTANGLE_SIZE = 36;

class EditorComponent extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    tool: React.PropTypes.string.isRequired,
    bgColor: React.PropTypes.string.isRequired,
  }
  static defaultProps = {
    bgColor: 'transparent',
    color: '#000000',
  }
  state = {
    editor: null,
    isMouseDown: false,
  }
  componentDidMount() {
    this.createEditor();
  }
  componentWillReceiveProps(nextProps) {
    this.setBackgroundColor(nextProps.bgColor);
  }
  onMouseDown = (e) => {
    this.setState({isMouseDown: true});
    this.applyCurrentTool(eventToElementPoint(e));
  }
  onMouseMove = (e) => {
    if (!this.state.isMouseDown) {
      return;
    }

    this.applyCurrentTool(eventToElementPoint(e));
  }
  onMouseUp = () => this.setState({isMouseDown: false});
  setBackgroundColor(color) {
    this.state.editor.setBackgroundColor(color);
  }
  getCorrectCanvasSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  getDataUrl() {
    return this.state.editor.toDataUrl();
  }
  getSvg() {
    return this.state.editor.toSVG();
  }
  applyCurrentTool(point) {
    if (this.props.tool === TOOLS.ERASER) {
      this.state.editor.eraseTriangleAt(point);
    } else if (this.props.tool === TOOLS.FILL_TRIANGLE) {
      this.state.editor.fillTriangleAt(point, this.props.color);
    } else if (this.props.tool === TOOLS.FILL_RECTANGLE) {
      const rect = {
        x: point.x - (FILL_RECTANGLE_SIZE / 2),
        y: point.y - (FILL_RECTANGLE_SIZE / 2),
        width: FILL_RECTANGLE_SIZE,
        height: FILL_RECTANGLE_SIZE
      };

      this.state.editor.fillInRectangle(rect, this.props.color);
    }
  }
  showGrid(show) {
    if (show) {
      this.state.editor.showGrid();
    } else {
      this.state.editor.hideGrid();
    }
  }
  createEditor() {
    this.setState({
      editor: new TriangleEditor(this.refs.canvas, { unitSize: UNIT_SIZE }),
    }, () => this.setBackgroundColor(this.props.bgColor));
  }
  render() {
    const size = this.getCorrectCanvasSize();
    return (
      <div>
        <canvas
          width={size.width}
          height={size.height}
          ref="canvas"
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseUp}></canvas>
      </div>
    );
  }
}

export default EditorComponent;
