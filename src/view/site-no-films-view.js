import {createElement} from '../render.js';
import {typeFilters} from '../const.js';

const createNoFilmsTemplate = (filter) => {
  const {name} = filter;
  let content = '';

  const {WATCHLIST, HYSTORY, FAVORITES} = typeFilters;

  switch (name) {
    case WATCHLIST:
      content = 'There are no movies to watch now';
      break;

    case HYSTORY:
      content = 'There are no watched movies now';
      break;

    case FAVORITES:
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
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoFilmsTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
