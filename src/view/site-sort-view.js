import AbstractView from './abstract-view.js';

const createSiteSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);


// Описал компонент sort как класс, который уже возвращает готовый элемент, а не шаблон
// Использую вспомогательную функцию для создания DOM-элемента по шаблону
export default class SiteSortView extends AbstractView {

  get template() {
    return createSiteSortTemplate();
  }

}
