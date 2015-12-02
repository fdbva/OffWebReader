"use strict";
var OffWebReader;
(function (OffWebReader) {
    var QueryFormatter = (function () {
        function QueryFormatter(urlInput, xpath) {
            this.makeQuery(urlInput, xpath);
        }
        QueryFormatter.prototype.makeQuery = function (urlInput, xpath) {
            this._yqlBaseUri = "https://query.yahooapis.com/v1/public/yql?";
            this._yqlQuery = "select * from html where url='" + urlInput + "'";
            if (xpath != null) {
                this._xPath = " and xpath=\"" + xpath + "\"";
                this._yqlQuery += this._xPath;
            }
            this._yqlQuery = this._yqlBaseUri + "q=" + encodeURIComponent(this._yqlQuery);
        };
        Object.defineProperty(QueryFormatter.prototype, "yqlQuery", {
            get: function () {
                return this._yqlQuery;
            },
            enumerable: true,
            configurable: true
        });
        QueryFormatter.prototype.callScraper = function () {
        };
        QueryFormatter.prototype.callScraperChapters = function () {
        };
        return QueryFormatter;
    })();
    var InputUrlComponent = (function () {
        function InputUrlComponent(element) {
            this.createComponent(element);
        }
        InputUrlComponent.prototype.createComponent = function (element) {
            var _this = this;
            this.element = element;
            this.storyLink = document.createElement("input");
            this.storyLink.id = "storylink";
            this.storyLink.value = "https://www.fictionpress.com/s/2961893/1/Mother-of-Learning";
            this.goButton = document.createElement("button");
            this.goButton.id = "gobutton";
            this.goButton.onclick = function (e) { _this.goButtonClick(e); };
            this.goButton.innerHTML += "GO";
            this.element.appendChild(this.storyLink);
            this.element.appendChild(this.goButton);
            this.linkText = this.storyLink.value;
        };
        InputUrlComponent.prototype.goButtonClick = function (e) {
            e.preventDefault(); // stop the form submission.
            this.linkText = document.getElementById("storylink").value.toString();
            var ele2 = document.getElementById("yqlResponse");
            ele2.innerText = "";
            var scraper = new Scraper(ele2);
            var queryString = new QueryFormatter(this.linkText, "//*[@id='storytext']");
            scraper.ajax(queryString.yqlQuery);
        };
        return InputUrlComponent;
    })();
    var Scraper = (function () {
        function Scraper(element) {
            this.element = element;
            this.element.innerHTML += "The scraping result is: ";
        }
        Scraper.prototype.ajax = function (link) {
            var _this = this;
            this.xhr = new XMLHttpRequest;
            this.xhr.open('GET', link);
            this.xhr.onload = function () { return _this._onLoad(); };
            this.xhr.send();
        };
        Scraper.prototype._onLoad = function () {
            this.result = this.xhr.responseXML.querySelectorAll("results")[0].innerHTML;
            document.getElementById("yqlResponse").innerHTML += this.result;
        };
        Scraper.prototype.callPersist = function () {
        };
        Scraper.prototype.callParserChapters = function () {
        };
        return Scraper;
    })();
    var LinkParser = (function () {
        function LinkParser() {
        }
        LinkParser.prototype.callQueryFormatter = function () {
        };
        LinkParser.prototype.callQueryFormatterChapters = function () {
        };
        return LinkParser;
    })();
    var Persist = (function () {
        function Persist() {
        }
        Persist.prototype.save = function (story) {
        };
        Persist.prototype.update = function (story) {
        };
        Persist.prototype.delete = function (story) {
        };
        return Persist;
    })();
    var Story = (function () {
        function Story() {
        }
        return Story;
    })();
    var Chapter = (function () {
        function Chapter() {
        }
        return Chapter;
    })();
    window.onload = function () {
        var inputHook = document.getElementById("inputurl");
        var inputUrl = new InputUrlComponent(inputHook);
        //scraper.scrape("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22storytext%22%5D'");
        //                https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning%27%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%27storytext%27%5D%27
        //select * from html where url='https://www.fictionpress.com/s/2961893/1/Mother-of-Learning' and xpath='//*[@id="storytext"]'
    };
})(OffWebReader || (OffWebReader = {}));
//# sourceMappingURL=app.js.map