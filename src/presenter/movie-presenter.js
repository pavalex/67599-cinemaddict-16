import CardView from '../view/site-card-view.js';
import ButtonShowView from '../view/site-buttonShowMore-view.js';
import FilmsListView from '../view/site-films-list-view.js';
import FilmsView from '../view/site-films-view.js';
import SiteFooterDataView from '../view/site-footerData-view.js';
import MenuFilterView from '../view/site-menu-view.js';
import MostTemplateView from '../view/site-most-view.js';
import TopTemplateView from '../view/site-top-view.js';
import SiteRankView from '../view/site-rank-view.js';
import SiteSortView from '../view/site-sort-view.js';
import NoFilmsView from '../view/site-no-films-view.js';
import {render, RenderPosition} from '../utils/render.js';

const TASK_COUNT_PER_STEP = 5;

export default class MovieListPresenter {
  #movieListContainer = null;
  #cards = [];

  #buttonShowComponent = new ButtonShowView();
  #filmsListComponent = new FilmsListView();
  #filmsComponent = new FilmsView();
  #footerDataComponent = new SiteFooterDataView();
  #menuFilterComponent = new MenuFilterView();
  #mostTemplateComponent = new MostTemplateView();
  #topTemplateComponent = new TopTemplateView();
  #rankComponent = new SiteRankView();
  #sortComponent = new SiteSortView();
  #noFilmsComponent = new NoFilmsView();

  #siteFilmsListContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
  #siteFooterElement = document.querySelector('.footer__statistics');
  #siteHeaderLogoElement = document.querySelector('.header__logo');


  constructor(movieListContainer) {
    this.#movieListContainer = movieListContainer;
  }

  init = (cards) => {
    this.#cards = cards;
    render(this.#movieListContainer, this.#filmsComponent, RenderPosition.BEFOREEND);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderRank();
    // this.#renderMenuFilter();
    this.#renderSort();

    // Условие: в системе пока нет фильмов или есть фильмы
    if (this.#cards.length === 0 ) {
      this.#renderNoFilms();
    } else {
      for (let i = 0; i < Math.min(this.#cards.length, TASK_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#cards[i]);
      }

      this.#renderTopTemplate();
      this.#renderMostTemplate();
    }

    this.#renderButtonShowMore();
    this.#renderFooter();
  }

  #renderCard = (card) => {
    const cardComponent = new CardView(card);
    render(this.#siteFilmsListContainer, cardComponent, RenderPosition.BEFOREEND);
  }

  #renderRank = () => {
    render(this.#siteHeaderLogoElement, this.#rankComponent, RenderPosition.AFTEREND);
  }

  #renderSort = () => {
    render(this.#movieListContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderMenuFilter = () => {
    render(this.#movieListContainer, this.#menuFilterComponent, RenderPosition.BEFOREEND);
  }

  #renderNoFilms = (filters) => {
    // const noFilmsViewComponent = new NoFilmsView(this.#filters);
    const noFilmsComponent = new NoFilmsView(filters);
    render(this.#siteFilmsListContainer, noFilmsComponent, RenderPosition.BEFOREEND);
  }

  #renderTopTemplate = () => {
    render(this.#filmsListComponent, this.#topTemplateComponent, RenderPosition.BEFOREEND);
  }

  #renderMostTemplate = () => {
    render(this.#filmsListComponent, this.#mostTemplateComponent, RenderPosition.BEFOREEND);
  }

  #renderButtonShowMore = () => {
    // Подгрузка карточек
    if (this.#cards.length > TASK_COUNT_PER_STEP) {
      let renderedTaskCount = TASK_COUNT_PER_STEP;

      render(this.#siteFilmsListContainer, this.#buttonShowComponent, RenderPosition.AFTEREND);

      this.#buttonShowComponent.setClickHandler(() => {
        this.#cards
          .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
          .forEach((card) => this.#renderCard(card));

        renderedTaskCount += TASK_COUNT_PER_STEP;

        if (renderedTaskCount >= this.#cards.length) {
          this.#buttonShowComponent.removeElement();
        }
      });
    }
  }

  #renderFooter = () => {
    render(this.#siteFooterElement, this.#footerDataComponent, RenderPosition.AFTEREND);
  }

}


