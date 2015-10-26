/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
/* eslint no-unused-expressions: 0 */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Chai, { expect } from 'chai';
import spy from 'chai-spies';

import Toolbox, { TOOLS } from 'components/Toolbox';
import ColorPicker from 'react-color';

Chai.use(spy);

describe('ToolboxComponent', () => {
  let ToolboxComponent;

  beforeEach(() => {
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox />);
  });

  it('Has 2 ColorPicker components', () => {
    const colorPickers = TestUtils.scryRenderedComponentsWithType(ToolboxComponent, ColorPicker);
    expect(colorPickers.length).to.be.equal(2);
  });

  it('onColorChange Prop function is called when color changes in color picker', () => {
    const spFn = Chai.spy();
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox onColorChanged={spFn} />);
    const colorPickers = TestUtils.scryRenderedComponentsWithType(ToolboxComponent, ColorPicker);
    colorPickers[0].handleChange('#333');
    expect(spFn).to.have.been.called.once();
  });

  it('onBgColorChange Prop function is called when color changes in color picker', () => {
    const spFn = Chai.spy();
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox onBgColorChanged={spFn} />);
    const colorPickers = TestUtils.scryRenderedComponentsWithType(ToolboxComponent, ColorPicker);
    colorPickers[1].handleChange('#333');
    expect(spFn).to.have.been.called.once();
  });

  it('Prop function is called when tool buttons are clicked', () => {
    const spFn = Chai.spy();
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox onToolChanged={spFn} />);
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-triangle-btn');
    const rectangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-rectangle-btn');
    const triangleEraseButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'erase-triangle-btn');

    TestUtils.Simulate.click(triangleFillButtons[0], {});
    TestUtils.Simulate.click(rectangleFillButtons[0], {});
    TestUtils.Simulate.click(triangleEraseButtons[0], {});

    expect(spFn).to.have.been.called.exactly(3);
    expect(spFn).to.have.been.called.with(TOOLS.FILL_TRIANGLE);
    expect(spFn).to.have.been.called.with(TOOLS.FILL_RECTANGLE);
    expect(spFn).to.have.been.called.with(TOOLS.ERASER);
  });

  it('Has one save as png button', () => {
    const saveBtn = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'save-png-btn');
    expect(saveBtn.length).to.be.equal(1);
  });

  it('Calls onSavePng prop when save png button is clicked', () => {
    const spFn = Chai.spy();
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox onSavePng={spFn} />);
    const saveBtn = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'save-png-btn');
    TestUtils.Simulate.click(saveBtn[0], {});

    expect(spFn).to.have.been.called.once;
  });

  it('Has one save as svg button', () => {
    const saveBtn = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'save-svg-btn');
    expect(saveBtn.length).to.be.equal(1);
  });

  it('Calls onSaveSvg prop when save svg button is clicked', () => {
    const spFn = Chai.spy();
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox onSaveSvg={spFn} />);
    const saveBtn = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'save-svg-btn');
    TestUtils.Simulate.click(saveBtn[0], {});

    expect(spFn).to.have.been.called.once;
  });

  it('Has one triangleFill button', () => {
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-triangle-btn');
    expect(triangleFillButtons.length).to.be.equal(1);
  });

  it('Selects triangleFill button when triangle fill tool selected', () => {
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox selectedTool={TOOLS.FILL_TRIANGLE} />);
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-triangle-btn selected');
    expect(triangleFillButtons.length).to.be.equal(1);
  });

  it('Has one rectangleFill button', () => {
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-rectangle-btn');
    expect(triangleFillButtons.length).to.be.equal(1);
  });

  it('Has one eraseTriangle button', () => {
    const triangleEraseButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'erase-triangle-btn');
    expect(triangleEraseButtons.length).to.be.equal(1);
  });

  it('Selects triangleFill button when triangle fill tool selected', () => {
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox selectedTool={TOOLS.FILL_TRIANGLE} />);
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-triangle-btn selected');
    expect(triangleFillButtons.length).to.be.equal(1);
    
    const rectangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-rectangle-btn selected');
    expect(rectangleFillButtons.length).to.be.equal(0);
    
    const triangleEraseButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'erase-triangle-btn selected');
    expect(triangleEraseButtons.length).to.be.equal(0);
  });

  it('Selects rectangleFill button when rectangle fill tool selected', () => {
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox selectedTool={TOOLS.FILL_RECTANGLE} />);
    
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-triangle-btn selected');
    expect(triangleFillButtons.length).to.be.equal(0);

    const rectangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-rectangle-btn selected');
    expect(rectangleFillButtons.length).to.be.equal(1);

    const triangleEraseButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'erase-triangle-btn selected');
    expect(triangleEraseButtons.length).to.be.equal(0);
  });

  it('Selects triangleErase button when triangle erase tool selected', () => {
    ToolboxComponent = TestUtils.renderIntoDocument(<Toolbox selectedTool={TOOLS.ERASER} />);
    
    const triangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-triangle-btn selected');
    expect(triangleFillButtons.length).to.be.equal(0);

    const rectangleFillButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'fill-rectangle-btn selected');
    expect(rectangleFillButtons.length).to.be.equal(0);

    const triangleEraseButtons = TestUtils.scryRenderedDOMComponentsWithClass(ToolboxComponent, 'erase-triangle-btn selected');
    expect(triangleEraseButtons.length).to.be.equal(1);
  });
});
