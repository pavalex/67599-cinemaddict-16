import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteRankTemplate} from './view/site-rank-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createFilmsTemplate} from './view/site-films-view.js';
import {createSiteCardTemplate} from './view/site-card-view.js';
import {createButtonShowMoreTemplate} from './view/site-buttonShowMore-view.js';
// import {createPopupTemplate} from './view/site-popup-view.js'; // Раскомментировать для попапа
import {createFooterDataTemplate} from './view/site-footerData-view.js';
import {createTopTemplate} from './view/site-top-view.js';
import {createMostTemplate} from './view/site-most-view.js';
import {renderTemplate, RenderPosition} from './render.js';

const TASK_COUNT = 5;

const siteHeaderElement = document.querySelector('.header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

renderTemplate(siteHeaderLogoElement, createSiteRankTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');
const siteFilmsListContainer = siteFilmsElement.querySelector('.films-list__container');

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteFilmsListContainer, createSiteCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(siteFilmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilmsElement, createTopTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilmsElement, createMostTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterStatistics, createFooterDataTemplate(), RenderPosition.AFTEREND);

/* Попап. Создал секцию с классом, вставил на страницу и отрисовал.
Пока закомментировал, чтобы не закрывал страницу */

// const popupElement = document.createElement('section');
// popupElement.classList.add('film-details');
// siteFooterElement.after(popupElement);
// const sitePopupElement = document.querySelector('.film-details');

// renderTemplate(sitePopupElement, createPopupTemplate(), RenderPosition.BEFOREEND);

