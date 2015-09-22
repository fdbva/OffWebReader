"use strict";
var OffWebReader;
(function (OffWebReader) {
    class QueryFormatter {
        constructor(urlInput, xpath) {
            this._yqlBaseUri = "https://query.yahooapis.com/v1/public/yql?";
            this._yqlQuery = `select * from html where url='${urlInput}'`;
            if (xpath != null) {
                this._xPath = ` and xpath="${xpath}"`;
                this._yqlQuery += this._xPath;
            }
            this._yqlQuery = this._yqlBaseUri + "q=" + encodeURIComponent(this._yqlQuery);
        }
        get yqlQuery() {
            return this._yqlQuery;
        }
    }
    class InputUrlComponent {
        constructor(element) {
            this.element = element;
            this.storyLink = document.createElement("input");
            this.storyLink.id = "storylink";
            this.storyLink.value = "https://www.fictionpress.com/s/2961893/1/Mother-of-Learning";
            this.goButton = document.createElement("button");
            this.goButton.id = "gobutton";
            this.goButton.onclick = (e) => { this.goButtonClick(e); };
            this.goButton.innerHTML += "GO";
            this.element.appendChild(this.storyLink);
            this.element.appendChild(this.goButton);
            this.linkText = this.storyLink.value;
        }
        goButtonClick(e) {
            e.preventDefault(); // stop the form submission.
            this.linkText = document.getElementById("storylink").value.toString();
            const ele2 = document.getElementById("yqlResponse");
            ele2.innerText = "";
            const scraper = new Scraper(ele2);
            const queryString = new QueryFormatter(this.linkText, "//*[@id='storytext']");
            scraper.ajax(queryString.yqlQuery);
        }
    }
    class Scraper {
        constructor(element) {
            this.element = element;
            this.element.innerHTML += "The scraping result is: ";
        }
        ajax(link) {
            this.xhr = new XMLHttpRequest;
            this.xhr.open('GET', link);
            this.xhr.onload = () => this._onload();
            this.xhr.send();
        }
        _onload() {
            this.result = this.xhr.responseXML.querySelectorAll("results")[0].innerHTML;
            document.getElementById("yqlResponse").innerHTML += this.result;
        }
    }
    window.onload = () => {
        const inputHook = document.getElementById("inputurl");
        const inputUrl = new InputUrlComponent(inputHook);
        //scraper.scrape("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22storytext%22%5D'");
        //                https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning%27%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%27storytext%27%5D%27
        //select * from html where url='https://www.fictionpress.com/s/2961893/1/Mother-of-Learning' and xpath='//*[@id="storytext"]'
    };
})(OffWebReader || (OffWebReader = {}));
//# sourceMappingURL=app.js.map