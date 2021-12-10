import {createElement} from '../render.js';

const createFooterDataTemplate = () => (
  `<p>130 291 movies inside</p>
  `
);

export default class SiteFooterDataView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);

      return this.#element;
    }
  }

  get template() {
    return createFooterDataTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
