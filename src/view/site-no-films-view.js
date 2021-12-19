import {createElement} from '../render.js';

const createNoFilmsTemplate = (date) => {
  let content = '';

  switch (date) {
    case 'Watchlist':
      content = 'There are no movies to watch now';
      break;

    case 'History':
      content = 'There are no watched movies now';
      break;

    case 'Favorites':
      content = 'There are no favorite movies now';
      break;

    default:
      content = 'There are no movies in our database';
  }


  return (
    `<section class="films-list">
    <h2 class="films-list__title">${content}</h2>
  </section>`
  );
};

export default class NoFilmsView {
  #element = null;
  #date = null;

  constructor(date) {
    this.#date = date;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoFilmsTemplate(this.#date);
  }

  removeElement() {
    this.#element = null;
  }
}
