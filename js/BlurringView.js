import Adapt from 'core/js/adapt';

import ReactDOM from 'react-dom';
import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default class BlurringView extends Backbone.View {
  events() {
    return {
      click: this.onClick
    };
  }

  initialize({ replacedEl }) {
    _.bindAll(this, 'render', 'onDataReady');
    this.replacedEl = replacedEl;
    this.render();
  }

  render() {
    _.defer(async () => {
      this.addElements();
      this.el.style.visibility = 'visible';
      this.onDataReady();
    });
  }

  addElements() {
    const data = {
      replacedEl: this.replacedEl.innerHTML,
      ...Adapt.course.get('_blurring')
    };
    ReactDOM.render(<templates.blurring {...data} />, this.el);
  }

  onDataReady() {
    this.trigger('ready');
  }

  onClick() {
    this.$el.toggleClass('no-blurring');
  }
}
