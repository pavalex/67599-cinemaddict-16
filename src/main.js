import MenuFilterView from './view/site-menu-view.js';
import SiteRankView from './view/site-rank-view.js';
import SiteSortView from './view/site-sort-view.js';
import FilmsView from './view/site-films-view.js';
import NoFilmsView from './view/site-no-films-view.js';
import FilmsListView from './view/site-films-list-view.js';
import CardView from './view/site-card-view.js';
import ButtonShowView from './view/site-buttonShowMore-view.js';
import PopupView from './view/site-popup-view.js';
import SiteFooterDataView from './view/site-footerData-view.js';
import TopTemplateView from './view/site-top-view.js';
import MostTemplateView from './view/site-most-view.js';
import {render, RenderPosition} from './utils/render.js';
import {generateFilmItem} from './mock/task.js';
import {generateFilter} from './mock/filter.js';

const TASK_COUNT = 20;
const TASK_COUNT_PER_STEP = 5;

const cards = Array.from({
  length: TASK_COUNT
}, generateFilmItem);
const filters = generateFilter(cards);

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);
  render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector('.header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderLogoElement, new SiteRankView(), RenderPosition.AFTEREND);
render(siteMainElement, new MenuFilterView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteSortView(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');
const siteFilmsListContainer = siteFilmsElement.querySelector('.films-list__container');

// Условие: в системе пока нет фильмов или есть фильмы
if (cards.length === 0 ) {

  const noFilmsViewComponent = new NoFilmsView(filters);
  render(siteFilmsElement, noFilmsViewComponent, RenderPosition.BEFOREEND);

} else {
  for (let i = 0; i < Math.min(cards.length, TASK_COUNT_PER_STEP); i++) {
    renderCard(siteFilmsListContainer, cards[i]);
  }

  render(siteFilmsElement, new TopTemplateView(), RenderPosition.BEFOREEND);
  render(siteFilmsElement, new MostTemplateView(), RenderPosition.BEFOREEND);

  /* Попап. Создал секцию с классом, вставил на страницу и отрисовал. */
  const popupElement = document.createElement('section');
  popupElement.classList.add('film-details');
  siteFooterElement.after(popupElement);
  const sitePopupElement = document.querySelector('.film-details');

  const popupViewComponent = new PopupView(cards[0]);

  const onClickPopup = () => {
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

  const onClosePopup = () => {
    popupViewComponent.removeElement();
    document.querySelector('body').classList.remove('hide-overflow');
  };

  popupViewComponent.setCloseClickHandler(() => {
    popupViewComponent.element.addEventListener('click', onClosePopup);
  });


  siteFilmsListContainer.addEventListener('click', onClickPopup);

  document.addEventListener('keydown', onEscKeyDown);
}

// Подгрузка карточек
if (cards.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(siteFilmsListElement, new ButtonShowView(), RenderPosition.BEFOREEND);

  const showMoreButtonElement = siteFilmsElement.querySelector('.films-list__show-more');

  showMoreButtonElement.setClickHandler(() => {
    cards
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((card) => renderCard(siteFilmsListContainer, card));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= cards.length) {
      showMoreButtonElement.remove();
    }
  });

}

render(siteFooterStatistics, new SiteFooterDataView(), RenderPosition.AFTEREND);

