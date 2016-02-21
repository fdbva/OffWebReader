'use strict';

var btnGet, fanficitionInput;

btnGet = document.querySelector('#greeter--btn');
fanficitionInput = document.querySelector('#fanfiction--input');


btnGet.addEventListener('click', function (e) {
		return console.log(fanficitionInput.value);
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chapter = function Chapter() {
   _classCallCheck(this, Chapter);

   this.id = Number();
   this.storyId = Number();
   this.chapterLink = String();
   this.wordCount = Number();
   this.chapterText = Number();
   this.chapterNumber = Number();
   this.readingPoint = Number();
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputComponent = function () {
    function InputComponent(element) {
        _classCallCheck(this, InputComponent);

        this.createComponent(element);
    }

    _createClass(InputComponent, [{
        key: "_createComponent",
        value: function _createComponent(element) {
            var _this = this;

            this.element = element;
            this.storyLink = document.createElement("input");
            this.storyLink.id = "storylink";
            this.storyLink.value = "https://www.fictionpress.com/s/2961893/1/Mother-of-Learning";
            this.goButton = document.createElement("button");
            this.goButton.id = "gobutton";
            this.goButton.onclick = function (e) {
                _this.goButtonClick(e);
            };
            this.goButton.innerHTML += "GO";
            this.element.appendChild(this.storyLink);
            this.element.appendChild(this.goButton);
            this.linkText = this.storyLink.value;
        }
    }, {
        key: "goButtonClick",
        value: function goButtonClick(e) {
            e.preventDefault(); // stop the form submission.
            this.linkText = document.getElementById("storylink").value.toString();
            var ele2 = document.getElementById("yqlResponse");
            ele2.innerText = "";
            var scraper = new Scraper(ele2);
            var queryString = new QueryFormatter(this.linkText, "//*[@id='storytext']");
            scraper.ajax(queryString.yqlQuery);
        }
    }]);

    return InputComponent;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryFormatter = function () {
    function QueryFormatter(urlInput, xpath) {
        _classCallCheck(this, QueryFormatter);

        this.yqlQuery;
        makeQuery(urlInput, xpath);
    }

    _createClass(QueryFormatter, [{
        key: "_makeQuery",
        value: function _makeQuery(urlInput, xpath) {
            this._yqlBaseUri = "https://query.yahooapis.com/v1/public/yql?";
            this.yqlQuery = "select * from html where url='" + urlInput + "'";
            if (xpath != null) {
                var path = " and xpath=\"" + xpath + "\"";
                this.yqlQuery.concat(path);
            }
            this.yqlQuery = this._yqlBaseUri.concat("q=" + encodeURIComponent(this.yqlQuery));
        }
    }, {
        key: "yqlQuery",
        get: function get() {
            return this.yqlQuery;
        }
    }]);

    return QueryFormatter;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scraper = function () {
    function Scraper(element) {
        _classCallCheck(this, Scraper);

        this.element = element;
        this.xhr = null;
        this.result = null;
        this.element.innerHTML += "The scraping result is: ";
    }

    _createClass(Scraper, [{
        key: "ajax",
        value: function ajax(link) {
            var _this = this;

            this.xhr = new XMLHttpRequest();
            this.xhr.open('GET', link);
            this.xhr.onload = function () {
                return _this._onLoad();
            };
            this.xhr.send();
        }
    }, {
        key: "_onLoad",
        value: function _onLoad() {
            this.result = this.xhr.responseXML.querySelectorAll("results")[0].innerHTML;
            document.getElementById("yqlResponse").innerHTML += this.result;
        }
    }]);

    return Scraper;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Story = function Story() {
   _classCallCheck(this, Story);

   this.id = Number();
   this.insertLink = String();
   this.numberOfChapters = Number();
   this.originalSiteName = String();
   this.authorName = String();
   this.chaptersIds = String();
   this.readingPoint = Number();
};
//# sourceMappingURL=app.js.map
