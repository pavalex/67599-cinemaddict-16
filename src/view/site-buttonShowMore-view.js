import {createElement} from '../render.js';

// export const createButtonShowMoreTemplate = () => (
//   `  <button class="films-list__show-more">Show more</button>
//   `
// );

const createButtonShowMoreTemplate = () => (
  `  <button class="films-list__show-more">Show more</button>
  `
);

export default class ButtonShowView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);

      return this.#element;
    }
  }

  get template() {
    return createButtonShowMoreTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
