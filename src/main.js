import MenuFilterView from './view/site-menu-view.js';
import SiteRankView from './view/site-rank-view.js';
import SiteSortView from './view/site-sort-view.js';
import FilmsView from './view/site-films-view.js';
import FilmsListView  from './view/site-films-list-view.js';
import CardView from './view/site-card-view.js';
// import {createButtonShowMoreTemplate} from './view/site-buttonShowMore-view.js';
import ButtonShowView from './view/site-buttonShowMore-view.js';
import PopupView from './view/site-popup-view.js';
import SiteFooterDataView from './view/site-footerData-view.js';
import {createTopTemplate} from './view/site-top-view.js';
import {createMostTemplate} from './view/site-most-view.js';
import {renderTemplate, render, RenderPosition} from './render.js';
import {generateFilmItem} from './mock/task.js';
import {generateFilter} from './mock/filter.js';

const TASK_COUNT = 20;
const TASK_COUNT_PER_STEP = 5;

const cards = Array.from({length: TASK_COUNT}, generateFilmItem);
const filters = generateFilter(cards);

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);
  const popupComponent = new PopupView(card);

  // const replaceCardToPopup = () => {
  //   popupElement.style.display = 'block';
  // };

  // const replacePopupToCard = () => {
  //   popupElement.style.display = 'none';
  // };

  // const closePopup = () => {
  //   replacePopupToCard();
  //   document.removeEventListener('keydown', closePopup);
  // };

  // const onEscKeyDown = (evt) => {
  //   if (evt.key === 'Escape' || evt.key === 'Esc') {
  //     evt.preventDefault();
  //     replacePopupToCard();
  //     document.removeEventListener('keydown', onEscKeyDown);
  //   }
  // };

  // cardComponent.element.querySelector('.film-card').addEventListener('click', () => {
  //   replaceCardToPopup();
  //   document.addEventListener('keydown', onEscKeyDown);
  //   document.addEventListener('click', closePopup);
  // });

  // popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
  //   evt.preventDefault();
  //   replacePopupToCard();
  // });

  render(cardListElement, cardComponent.element, RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector('.header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderLogoElement, new SiteRankView().element, RenderPosition.AFTEREND);
render(siteMainElement, new MenuFilterView(filters).element, RenderPosition.BEFOREEND);
render(siteMainElement, new SiteSortView().element, RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView();
render(siteMainElement, filmsComponent.element, RenderPosition.BEFOREEND);
render(filmsComponent.element, filmsListComponent.element, RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');
const siteFilmsListContainer = siteFilmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, TASK_COUNT_PER_STEP); i++) {
  renderCard(siteFilmsListContainer, cards[i]);
}

// Подгрузка карточек
if (cards.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  // renderTemplate(siteFilmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);
  render(siteFilmsListElement, new ButtonShowView().element, RenderPosition.BEFOREEND);

  const showMoreButton = siteFilmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((card) => renderCard(siteFilmsListContainer, card));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}


renderTemplate(siteFilmsElement, createTopTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilmsElement, createMostTemplate(), RenderPosition.BEFOREEND);
render(siteFooterStatistics, new SiteFooterDataView().element, RenderPosition.AFTEREND);

/* Попап. Создал секцию с классом, вставил на страницу и отрисовал. */
const popupElement = document.createElement('section');
popupElement.classList.add('film-details');
popupElement.style.display = 'none';
siteFooterElement.after(popupElement);
const sitePopupElement = document.querySelector('.film-details');

render(sitePopupElement, new PopupView(cards[0]).element, RenderPosition.BEFOREEND);

siteFilmsListContainer.addEventListener('click', () => {
  popupElement.style.display = 'block';
});

const closePopup = document.querySelector('.film-details__close-btn');

closePopup.addEventListener('click', () => {
  popupElement.style.display = 'none';
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    popupElement.style.display = 'none';
  }
});


