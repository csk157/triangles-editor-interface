/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint no-unused-expressions: 0 */

// Uncomment the following lines to use the react test utilities
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Main from 'components/Main';
import Editor from 'components/Editor';
import Toolbox, { TOOLS } from 'components/Toolbox';

const color = {
  hex: '333333',
  rgb: {
    r: 51,
    g: 51,
    b: 51,
    a: 1,
  },
  hsl: {
    h: 0,
    s: 0,
    l: 0.20,
    a: 1,
  },
};

describe('MainComponent', () => {
  let MainComponent;

  beforeEach(() => {
    MainComponent = TestUtils.renderIntoDocument(<Main />);
  });

  it('Renders one editor', () => {
    const editors = TestUtils.scryRenderedComponentsWithType(MainComponent, Editor);
    expect(editors.length).to.be.equal(1);
  });

  it('Renders one toolbox with correct props', () => {
    const toolboxes = TestUtils.scryRenderedComponentsWithType(MainComponent, Toolbox);
    expect(toolboxes.length).to.be.equal(1);

    const toolbox = toolboxes[0];
    expect(toolbox.props.selectedTool).to.be.equal(MainComponent.state.currentTool);
    expect(toolbox.props.onColorChanged).to.be.equal(MainComponent.onColorChanged);
    expect(toolbox.props.onBgColorChanged).to.be.equal(MainComponent.onBgColorChanged);
    expect(toolbox.props.onToolChanged).to.be.equal(MainComponent.onToolChanged);
  });

  it('onToolChanged sets currentTool in state', () => {
    MainComponent.onToolChanged(TOOLS.FILL_TRIANGLE);
    expect(MainComponent.state.currentTool).to.be.equal(TOOLS.FILL_TRIANGLE);
  });

  it('when currentTool is ERASER, editor color shoud be set to null', () => {
    MainComponent.onToolChanged(TOOLS.ERASER);
    const editors = TestUtils.scryRenderedComponentsWithType(MainComponent, Editor);
    expect(editors[0].props.color).to.be.null;
  });

  it('onColorChanged sets currentColor in state as hex', () => {
    MainComponent.onColorChanged(color);
    expect(MainComponent.state.currentColor).to.be.equal('#333333');
  });

  it('onColorChanged sets color in editor component', () => {
    MainComponent.onColorChanged(color);
    const editors = TestUtils.scryRenderedComponentsWithType(MainComponent, Editor);
    expect(editors[0].props.color).to.be.equal('#333333');
  });

  it('onColorChanged sets color in toolbox component', () => {
    MainComponent.onColorChanged(color);
    const toolboxes = TestUtils.scryRenderedComponentsWithType(MainComponent, Toolbox);
    expect(toolboxes[0].props.color).to.be.equal('#333333');
  });

  it('onBgColorChanged sets bgColor in editor component', () => {
    MainComponent.onBgColorChanged(color);
    const editors = TestUtils.scryRenderedComponentsWithType(MainComponent, Editor);
    expect(editors[0].props.bgColor).to.be.equal('#333333');
  });

  it('onBgColorChanged sets bgColor in toolbox component', () => {
    MainComponent.onBgColorChanged(color);
    const toolboxes = TestUtils.scryRenderedComponentsWithType(MainComponent, Toolbox);
    expect(toolboxes[0].props.bgColor).to.be.equal('#333333');
  });

  it('onBgColorChanged sets currentBgColor in state as hex', () => {
    MainComponent.onBgColorChanged(color);
    expect(MainComponent.state.currentBgColor).to.be.equal('#333333');
  });
});
