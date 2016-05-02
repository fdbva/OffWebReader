export default class QueryFormatter {
  constructor(urlInput, xpath) {
    this.yqlQuery = 'yqlQuery';
    this.test = 'Class Works';
    this._makeQuery(urlInput, xpath);
  }

  _makeQuery(urlInput, xpath) {
    this._yqlBaseUri = 'https://query.yahooapis.com/v1/public/yql?';
    this.yqlQuery = `select * from html where url='${urlInput}'`;
    if (xpath !== null) {
      let path = ` and xpath="${xpath}"`;
      this.yqlQuery.concat(path);
    }
    this.yqlQuery = this._yqlBaseUri.concat('q=' +
      encodeURIComponent(this.yqlQuery));
  }

  get yqlQuery() {
    return this.yqlQuery;
  }
}
