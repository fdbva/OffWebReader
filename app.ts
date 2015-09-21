/// <reference path="Scripts/Definitions/jquery.d.ts" />
"use strict";

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "Time of last YQL: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

class Scraper {
    private element: HTMLElement;
    public resultJson: any;
    public result: any;
    private http: any;
    span: HTMLElement;


    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The scraping result is: ";
    }

    scrape(url: string) {
        var self = this;
        $.ajax({
            type: 'GET',
            url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.fictionpress.com%2Fs%2F2961893%2F1%2FMother-of-Learning'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22storytext%22%5D'",
            dataType: 'xml',
            success: data => {

                if (data) {
                    self.result = $(data).find('results').html();
                    $("#yqlResponse").append(self.result);
                }
            }
        });
    }
}

class YQLFormatter {
    private _yqlBaseUri: string;
    private _yqlQuery: string;

    constructor(urlInput: string) {
        this._yqlBaseUri = "http://query.yahooapis.com/v1/yql";
        this._yqlQuery = `select * from html where url='${urlInput}'`;
    }

    get yqlQuery(): string {
        return this._yqlBaseUri + "" + this._yqlQuery;
    }

}

window.onload = () => {
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