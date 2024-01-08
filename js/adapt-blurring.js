import Adapt from 'core/js/adapt';
import documentModifications from 'core/js/DOMElementModifications';

import BlurringView from './BlurringView';
class Blurring extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
    this.waitingFor = 0;
  }

  onDataReady() {
    if (!this.checkIsEnabled()) return;
    this.setUp();
  }

  setUp() {
    const config = Adapt.course.get('_blurring');
    const selector = config._selector || '.blurring';
    this.listenTo(documentModifications, {
      [`added:${selector}`]: this.handleAdd.bind(this),
      [`removed:${selector}`]: this.handleRemove.bind(this)
    });
  }

  handleAdd(event) {
    const el = event.target;

    el.style.visibility = 'hidden';
    new BlurringView({
      el,
      replacedEl: el
    });
  }

  handleRemove(event) {}

  checkIsEnabled() {
    const config = Adapt.course.get('_blurring');
    if (!config || !config._isEnabled) return false;
    return true;
  }
}

export default new Blurring();
