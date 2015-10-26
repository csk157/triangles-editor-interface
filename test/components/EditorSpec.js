/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint no-unused-expressions: 0*/

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Chai, { expect } from 'chai';
import spy from 'chai-spies';

import Editor from 'components/Editor';

Chai.use(spy);

describe('EditorComponent', () => {
  let EditorComponent;

  beforeEach(() => {
    EditorComponent = TestUtils.renderIntoDocument(<Editor color="#000000" />);
  });

  it('Renders canvas', () => expect(EditorComponent.refs.canvas).to.exist);

  it('Creates editor', () => expect(EditorComponent.state.editor).to.exist);

  it('Correctly sets isMouseDown on mousedown, mouseup and mouseleave', () => {
    TestUtils.Simulate.mouseDown(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    expect(EditorComponent.state.isMouseDown).to.be.true;

    TestUtils.Simulate.mouseUp(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    expect(EditorComponent.state.isMouseDown).to.be.false;

    TestUtils.Simulate.mouseDown(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    TestUtils.Simulate.mouseLeave(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    expect(EditorComponent.state.isMouseDown).to.be.false;
  });

  it('Calls editor fillTriangle on mouseDown', () => {
    Chai.spy.on(EditorComponent.state.editor, 'fillTriangleAt');
    TestUtils.Simulate.mouseDown(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});

    expect(EditorComponent.state.editor.fillTriangleAt).to.have.been.called.once;
  });

  it('Color prop influences fillTriangleAt arguments', () => {
    EditorComponent = TestUtils.renderIntoDocument(<Editor color="#FF0000" />);
    Chai.spy.on(EditorComponent.state.editor, 'fillTriangleAt');
    TestUtils.Simulate.mouseDown(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    TestUtils.Simulate.mouseMove(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});

    expect(EditorComponent.state.editor.fillTriangleAt).to.have.been.called.twice.with({x: 100, y: 100}, '#FF0000');
  });

  it('Color prop null calls eraseTriangleAt', () => {
    EditorComponent = TestUtils.renderIntoDocument(<Editor color={null} />);
    Chai.spy.on(EditorComponent.state.editor, 'eraseTriangleAt');
    TestUtils.Simulate.mouseDown(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    TestUtils.Simulate.mouseMove(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});

    expect(EditorComponent.state.editor.eraseTriangleAt).to.have.been.called.twice.with({x: 100, y: 100});
  });

  it('Calls editor fillTriangle on mouseMove when isMouseDown is true', () => {
    Chai.spy.on(EditorComponent.state.editor, 'fillTriangleAt');

    TestUtils.Simulate.mouseMove(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    expect(EditorComponent.state.editor.fillTriangleAt).to.not.have.been.called();

    TestUtils.Simulate.mouseDown(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    TestUtils.Simulate.mouseMove(EditorComponent.refs.canvas, {pageX: 100, pageY: 100});
    expect(EditorComponent.state.editor.fillTriangleAt).to.have.been.called.twice;
  });

  it('setBackgroundColor sets editor\'s background color', () => {
    EditorComponent = TestUtils.renderIntoDocument(<Editor color="#FF0000" bgColor="#000000" />);

    Chai.spy.on(EditorComponent.state.editor, 'setBackgroundColor');
    EditorComponent.setBackgroundColor('#00FF00');
    expect(EditorComponent.state.editor.setBackgroundColor).to.have.been.called.once.with('#00FF00');
  });
});
