class Scraper {
    constructor(element) {
        this.element = element;
        this.xhr = null;
        this.result = null;
        this.element.innerHTML += "The scraping result is: ";
    }

    ajax(link) {
        this.xhr = new XMLHttpRequest;
        this.xhr.open('GET', link);
        this.xhr.onload = () => this._onLoad();
        this.xhr.send();
    }

    _onLoad() {
        this.result = this.xhr.responseXML.querySelectorAll("results")[0].innerHTML;
        document.getElementById("yqlResponse").innerHTML += this.result;
    }
}
