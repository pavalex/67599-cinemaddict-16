import MenuFilterView from './view/site-menu-view.js';
import SiteSortView from './view/site-sort-view.js';
import NoFilmsView from './view/site-no-films-view.js';
import PopupView from './view/site-popup-view.js';
import {render, RenderPosition} from './utils/render.js';
import {generateFilmItem} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import MovieListPresenter from './presenter/movie-presenter.js';
// import PopupPresenter from './popup-presenter.js';

const TASK_COUNT = 20;

const cards = Array.from({
  length: TASK_COUNT
}, generateFilmItem);
const filters = generateFilter(cards);

const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

// render(siteMainElement, new MenuFilterView(filters), RenderPosition.BEFOREEND);
// render(siteMainElement, new SiteSortView(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');

// Условие: в системе пока нет фильмов или есть фильмы
if (cards.length === 0 ) {

  const noFilmsViewComponent = new NoFilmsView(filters);
  render(siteFilmsElement, noFilmsViewComponent, RenderPosition.BEFOREEND);

} else {
  /* Попап. Создал секцию с классом, вставил на страницу и отрисовал. */
  const popupElement = document.createElement('section');
  popupElement.classList.add('film-details');
  siteFooterElement.after(popupElement);
  const sitePopupElement = document.querySelector('.film-details');

  let popupViewComponent;

  const onClosePopup = () => {
    popupViewComponent.removeElement();
    document.querySelector('body').classList.remove('hide-overflow');
  };

  const onClickPopup = () => {
    popupViewComponent = new PopupView(cards[0]);
    popupViewComponent.setCloseClickHandler(() => {
      popupViewComponent.element.addEventListener('click', onClosePopup);
    });
    render(sitePopupElement, popupViewComponent, RenderPosition.BEFOREEND);
    document.querySelector('body').classList.add('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      popupViewComponent.removeElement();
      document.querySelector('body').classList.remove('hide-overflow');
    }
  };

  // siteFilmsListContainer.addEventListener('click', onClickPopup);

  document.addEventListener('keydown', onEscKeyDown);
}

const movieListPresenter = new MovieListPresenter(siteMainElement);

movieListPresenter.init(cards);

// const popupPresenter = new PopupPresenter(siteFooterElement);

// popupPresenter.init(cards);

