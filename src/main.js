import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteRankTemplate} from './view/site-rank-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createSiteCardTemplate} from './view/site-card-view.js';
import {createButtonShowMoreTemplate} from './view/site-buttonShowMore-view.js';
import {createPopupTemplate} from './view/site-popup-view.js';
import {createFooterDataTemplate} from './view/site-footerData-view.js';
import {createTopTemplate} from './view/site-top-view.js';
import {createMostTemplate} from './view/site-most-view.js';
import {renderTemplate, RenderPosition} from './render.js';

const TASK_COUNT = 5;

const siteHeaderElement = document.querySelector('.header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteMainElement = document.querySelector('.main');
const siteMenuElement = siteMainElement.querySelector('.menu');
const siteSortElement = siteMainElement.querySelector('.sort-films');
const siteFilmsElement = siteMainElement.querySelector('.films');
const siteFilmsListElement = siteFilmsElement.querySelector('.films-list');
const siteCardElement = siteFilmsElement.querySelector('.films-list__container');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');
const sitePopupElement = document.querySelector('.popup');

renderTemplate(siteHeaderLogoElement, createSiteRankTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteSortElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteCardElement, createSiteCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(siteFilmsListElement, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilmsElement, createTopTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilmsElement, createMostTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterStatistics, createFooterDataTemplate(), RenderPosition.AFTEREND);
renderTemplate(sitePopupElement, createPopupTemplate(), RenderPosition.BEFOREEND);

