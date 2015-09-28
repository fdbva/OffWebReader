"use strict";
var OffWebReader;
(function (OffWebReader) {
    class QueryFormatter {
        constructor(urlInput, xpath) {
            this.makeQuery(urlInput, xpath);
        }
        makeQuery(urlInput, xpath) {
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
        callScraper() {
        }
        callScraperChapters() {
        }
    }
    class InputUrlComponent {
        constructor(element) {
            this.createComponent(element);
        }
        createComponent(element) {
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
            e.preventDefault();
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
            this.xhr.onload = () => this._onLoad();
            this.xhr.send();
        }
        _onLoad() {
            this.result = this.xhr.responseXML.querySelectorAll("results")[0].innerHTML;
            document.getElementById("yqlResponse").innerHTML += this.result;
        }
        callPersist() {
        }
        callParserChapters() {
        }
    }
    class LinkParser {
        callQueryFormatter() {
        }
        callQueryFormatterChapters() {
        }
    }
    class Persist {
        save(story) {
        }
        update(story) {
        }
        delete(story) {
        }
    }
    class Story {
    }
    class Chapter {
    }
    window.onload = () => {
        const inputHook = document.getElementById("inputurl");
        const inputUrl = new InputUrlComponent(inputHook);
    };
})(OffWebReader || (OffWebReader = {}));
