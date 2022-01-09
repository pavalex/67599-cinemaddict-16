import PopupView from './view/site-popup-view.js';
import FilmsListView from '../view/site-films-list-view.js';

export default class PopupPresenter {
  #popupContainer = null;
  #cards = [];

  #popupComponent = new PopupView();
  #filmsListComponent = new FilmsListView();

  #siteFilmsListContainer = this.#filmsListComponent.element.querySelector('.films-list__container');

  constructor(popupContainer) {
    this.#popupContainer = popupContainer;
  }

  init = (cards) => {
    this.#cards = cards;
  }

  #renderPopup = () => {
    /* Попап. Создал секцию с классом, вставил на страницу и отрисовал. */
    const popupElement = document.createElement('section');
    popupElement.classList.add('film-details');
    this.#popupContainer.after(popupElement);
    const sitePopupElement = document.querySelector('.film-details');

    let popupViewComponent;

    const onClosePopup = () => {
      popupViewComponent.removeElement();
      document.querySelector('body').classList.remove('hide-overflow');
    };

    const onClickPopup = () => {
      popupViewComponent = this.#popupComponent(this.#cards[0]);
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

    this.#siteFilmsListContainer.addEventListener('click', onClickPopup);

    document.addEventListener('keydown', onEscKeyDown);
  }
}


