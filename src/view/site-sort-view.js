import {createElement} from '../render.js';

const createSiteSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);


// Описал компонент sort как класс, который уже возвращает готовый элемент, а не шаблон
// Использую вспомогательную функцию для создания DOM-элемента по шаблону
export default class SiteSortView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteSortTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
