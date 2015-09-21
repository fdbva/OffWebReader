/// <reference path="Scripts/Definitions/jquery.d.ts" />
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
var Scraper = (function () {
    function Scraper(element) {
        this.element = element;
        this.element.innerHTML += "The scraping result is: ";
    }
    Scraper.prototype.scrape = function (url) {
        var self = this;
        $.ajax({
            type: 'GET',
            url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22storytext%22%5D'",
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
    function YQLFormatter(urlInput) {
        this._yqlBaseUri = "http://query.yahooapis.com/v1/yql";
        this._yqlQuery = "select * from html where url='" + urlInput + "'";
    }
    Object.defineProperty(YQLFormatter.prototype, "yqlQuery", {
        get: function () {
            return this._yqlBaseUri + "" + this._yqlQuery;
        },
        enumerable: true,
        configurable: true
    });
    return YQLFormatter;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
    var ele2 = document.getElementById('yqlResponse');
    var scraper = new Scraper(ele2);
    var queryString = new YQLFormatter("https://www.fictionpress.com/s/2961893/1/Mother-of-Learning");
    //scraper.scrape(queryString.yqlQuery);
    scraper.scrape('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22google.com%22&format=json&diagnostics=true&callback=');
    //select * from html where url='https://www.fictionpress.com/s/2961893/1/Mother-of-Learning' and xpath='//*[@id="storytext"]'
};
//# sourceMappingURL=app.js.map