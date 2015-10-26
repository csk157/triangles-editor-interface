import React from 'react';
import TriangleEditor from 'triangles-editor';

function eventToElementPoint(e) {
  return {
    x: e.pageX - e.target.offsetLeft,
    y: e.pageY - e.target.offsetTop,
  };
}

class EditorComponent extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
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
  onMouseDown = (e) => {
    this.setState({isMouseDown: true});
    this.fillTriangle(eventToElementPoint(e));
  }
  onMouseMove = (e) => {
    if (!this.state.isMouseDown) {
      return;
    }

    this.fillTriangle(eventToElementPoint(e));
  }
  onMouseUp = () => this.setState({isMouseDown: false});
  setBackgroundColor(color) {
    this.state.editor.setBackgroundColor(color);
  }
  fillTriangle(point) {
    if (this.props.color) {
      this.state.editor.fillTriangleAt(point, this.props.color);
    } else {
      this.state.editor.eraseTriangleAt(point);
    }
  }
  createEditor() {
    this.setState({
      editor: new TriangleEditor(this.refs.canvas, {unitSize: 20}),
    }, () => this.setBackgroundColor(this.props.bgColor));
  }
  render() {
    return (
      <div className="editor">
        <canvas width="800"
          height="500"
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
