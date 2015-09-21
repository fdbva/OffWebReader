/// <reference path="Scripts/Definitions/jquery.d.ts" />
"use strict";
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "Time of last YQL: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
var InputUrl = (function () {
    function InputUrl(element) {
        var _this = this;
        this.element = element;
        this.storyLink = document.createElement('input');
        this.storyLink.id = "storylink";
        this.storyLink.value = "https://www.fictionpress.com/s/2961893/1/Mother-of-Learning";
        this.goButton = document.createElement('button');
        this.goButton.id = "gobutton";
        this.goButton.onclick = function (e) { _this._onclick(); };
        this.goButton.innerHTML += "GO";
        this.element.appendChild(this.storyLink);
        this.element.appendChild(this.goButton);
        this.linkText = this.storyLink.value;
    }
    InputUrl.prototype._onclick = function () {
        this.linkText = document.getElementById('storylink').value.toString();
    };
    return InputUrl;
})();
var Scraper = (function () {
    function Scraper(element) {
        this.element = element;
        this.element.innerHTML += "The scraping result is: ";
    }
    Scraper.prototype.scrape = function (link) {
        var self = this;
        $.ajax({
            type: 'GET',
            url: link,
            dataType: 'xml',
            success: function (data) {
                if (data) {
                    self.result = $(data).find('results').html();
                    $("#yqlResponse").append(self.result);
                }
            }
        });
    };
    return Scraper;
})();
var YQLFormatter = (function () {
    function YQLFormatter(urlInput, xpath) {
        this._yqlBaseUri = "https://query.yahooapis.com/v1/public/yql?";
        this._yqlQuery = "select * from html where url='" + urlInput + "'";
        if (xpath != null) {
            this._xPath = " and xpath=\"" + xpath + "\"";
            this._yqlQuery += this._xPath;
        }
        this._yqlQuery = this._yqlBaseUri + "q=" + encodeURIComponent(this._yqlQuery);
    }
    Object.defineProperty(YQLFormatter.prototype, "yqlQuery", {
        get: function () {
            return this._yqlQuery;
        },
        enumerable: true,
        configurable: true
    });
    return YQLFormatter;
})();
window.onload = function () {
    var inputHook = document.getElementById('inputurl');
    var greeterHook = document.getElementById('greeter');
    var inputUrl = new InputUrl(inputHook);
    console.log(inputUrl.linkText);
    var greeter = new Greeter(greeterHook);
    greeter.start();
    var button = document.getElementById('gobutton');
    button.addEventListener('click', function (e) {
        e.preventDefault(); // stop the form submission.
        console.log(inputUrl.linkText);
        inputUrl.linkText = document.getElementById('storylink').value.toString();
        console.log(inputUrl.linkText);
        var ele2 = document.getElementById('yqlResponse');
        ele2.innerText = "";
        var scraper = new Scraper(ele2);
        var queryString = new YQLFormatter(inputUrl.linkText, "//*[@id='storytext']");
        scraper.scrape(queryString.yqlQuery);
    });
    //scraper.scrape("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22storytext%22%5D'");
    //                https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning%27%20and%20xpath%3D%27%2F%2F*%5B%40id%3D%27storytext%27%5D%27
    //select * from html where url='https://www.fictionpress.com/s/2961893/1/Mother-of-Learning' and xpath='//*[@id="storytext"]'
};
//# sourceMappingURL=app.js.map