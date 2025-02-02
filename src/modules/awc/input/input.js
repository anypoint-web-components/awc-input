import { LightningElement, api } from 'lwc';
import { InputMixin } from './InputMixin.js';

const floatTypes = ['date', 'color', 'datetime-local', 'file', 'month', 'time', 'week'];

export default class Input extends InputMixin(LightningElement) {
  get _prefixed() {
    return this.querySelector('[slot=prefix]');
  }

  get labelClass() {
    const labelFloating = !!this.value || floatTypes.indexOf(this.type) !== -1 || !!this.placeholder || this.focused;
    let klas = 'label';
    if (this._prefixed) {
      klas += ' with-prefix';
    }
    if (labelFloating && this.noLabelFloat) {
      klas += ' hidden';
    } else {
      klas += labelFloating ? ' floating' : ' resting';
    }
    return klas;
  }

  get _infoAddonClass() {
    let klas = 'info';
    const isInavlidWithMessage = !!this.invalidMessage && this.invalid;
    if (isInavlidWithMessage) {
      klas += ' label-hidden';
    }
    return klas;
  }

  get _errorAddonClass() {
    let klas = 'invalid';
    if (!this.invalid) {
      klas += ' label-hidden';
    }
    if (this.infoMessage) {
      klas += ' info-offset';
    }
    return klas;
  }

  get _inputType() {
    if (this.type) {
      return this.type;
    }
    return 'text';
  }

  @api
  get bindValue() {
    return this.value || '';
  }
  /**
   * Retargets an event that does not bubble
   *
   * @param {Event} e The event to retarget
   */
  _retargetEvent(e) {
    this.dispatchEvent(new CustomEvent(e.type));
  }
}
