/* eslint-env browser*/
/* global Scraper QueryFormatter*/
export default class InputComponent {
  constructor(element) {
    this.createComponent(element);
  }

  _createComponent(element) {
    this.element = element;
    this.storyLink = document.createElement('input');
    this.storyLink.id = 'storylink';
    this.storyLink.value =
      'https://www.fictionpress.com/s/2961893/1/Mother-of-Learning';
    this.goButton = document.createElement('button');
    this.goButton.id = 'gobutton';
    this.goButton.onclick = e => {
      this.goButtonClick(e);
    };
    this.goButton.innerHTML += 'GO';
    this.element.appendChild(this.storyLink);
    this.element.appendChild(this.goButton);
    this.linkText = this.storyLink.value;
  }

  goButtonClick(e) {
    e.preventDefault();
    this.linkText = document.getElementById('storylink').value.toString();
    const ele2 = document.getElementById('yqlResponse');
    ele2.innerText = '';
    const scraper = new Scraper(ele2);
    const queryString = new QueryFormatter(this.linkText,
      '//*[@id="storytext"]');
    scraper.ajax(queryString.yqlQuery);
  }
}
