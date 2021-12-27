import AbstractView from './abstract-view.js';
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

export default class NoFilmsView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNoFilmsTemplate(this.#filters);
  }
}
