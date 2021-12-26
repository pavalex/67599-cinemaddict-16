import AbstractView from './abstract-view.js';

const createFooterDataTemplate = () => (
  `<p>130 291 movies inside</p>
  `
);

export default class SiteFooterDataView extends AbstractView {

  get template() {
    return createFooterDataTemplate();
  }

}
