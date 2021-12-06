import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteRankTemplate} from './view/site-rank-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createFilmsTemplate} from './view/site-films-view.js';
import {createSiteCardTemplate} from './view/site-card-view.js';
import {createButtonShowMoreTemplate} from './view/site-buttonShowMore-view.js';
import {createPopupTemplate} from './view/site-popup-view.js';
import {createFooterDataTemplate} from './view/site-footerData-view.js';
import {createTopTemplate} from './view/site-top-view.js';
import {createMostTemplate} from './view/site-most-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {generateFilmItem} from './mock/task.js';
import {generateFilter} from './mock/filter.js';

const TASK_COUNT = 20;
const TASK_COUNT_PER_STEP = 5;

const cards = Array.from({length: TASK_COUNT}, generateFilmItem);
const filtres = generateFilter(cards);

const siteHeaderElement = document.querySelector('.header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

renderTemplate(siteHeaderLogoElement, createSiteRankTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createSiteMenuTemplate(filtres), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');
const siteFilmsListContainer = siteFilmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, TASK_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmsListContainer, createSiteCardTemplate(cards[i]), RenderPosition.BEFOREEND);
}

// Подгрузка карточек
if (cards.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderTemplate(siteFilmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = siteFilmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((card) => renderTemplate(siteFilmsListContainer, createSiteCardTemplate(card), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}


renderTemplate(siteFilmsElement, createTopTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilmsElement, createMostTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterStatistics, createFooterDataTemplate(), RenderPosition.AFTEREND);

/* Попап. Создал секцию с классом, вставил на страницу и отрисовал. */
const popupElement = document.createElement('section');
popupElement.classList.add('film-details');
popupElement.style.display = 'none';
siteFooterElement.after(popupElement);
const sitePopupElement = document.querySelector('.film-details');

renderTemplate(sitePopupElement, createPopupTemplate(cards[0]), RenderPosition.BEFOREEND);

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


