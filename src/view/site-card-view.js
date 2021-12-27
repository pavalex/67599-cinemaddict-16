import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createSiteCardTemplate = (card) => {
  const {poster, description, nameOfMovie, dueRating, genre, dueDate, dueDurationFilmHour, dueDurationFilmMinute, comments, isWatched, isWatchlist, isFavorite} = card;

  let descriptionCard = description;

  if (description.length > 140) {
    descriptionCard = `${description.substr(0, 136)}...`;
  }

  const date = dayjs(dueDate).format('YYYY');
  const timeMinute = dayjs(dueDurationFilmMinute).format('mm');

  const getActiveClass = (isItem) => isItem ? 'film-card__controls-item--active'  : '';

  const watchlistClassName = getActiveClass(isWatchlist);
  const watchedClassName = getActiveClass(isWatched);
  const favoriteClassName = getActiveClass(isFavorite);

  return  `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${nameOfMovie}</h3>
    <p class="film-card__rating">${dueRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${dueDurationFilmHour}h ${timeMinute}m</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionCard}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class CardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createSiteCardTemplate(this.#card);
  }

}
