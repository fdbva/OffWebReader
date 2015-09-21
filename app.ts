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
class InputUrl {
    element: HTMLElement;
    storyLink: HTMLInputElement;
    goButton: HTMLButtonElement;
    linkText: string;

    constructor(element: HTMLElement) {
        this.element = element;
        this.storyLink = document.createElement('input');
        this.storyLink.id = "storylink";
        this.storyLink.value = "https://www.fictionpress.com/s/2961893/1/Mother-of-Learning";
        this.goButton = document.createElement('button');
        this.goButton.id = "gobutton";
        this.goButton.onclick = (e) => { this._onclick(); };
        this.goButton.innerHTML += "GO";
        this.element.appendChild(this.storyLink);
        this.element.appendChild(this.goButton);
        this.linkText = this.storyLink.value;
    }
    _onclick() {
        this.linkText = (<HTMLInputElement>document.getElementById('storylink')).value.toString();
    }
}
class Scraper {
    private element: HTMLElement;
    public resultJson: any;
    public result: any;
    private http: any;
    span: HTMLSpanElement;


    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The scraping result is: ";
    }

    scrape(link: string) {
        var self = this;
        $.ajax({
            type: 'GET',
            url: link,
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
    private _xPath: string;

    constructor(urlInput: string, xpath : string) {
        this._yqlBaseUri = "https://query.yahooapis.com/v1/public/yql?";
        this._yqlQuery = `select * from html where url='${urlInput}'`;
        if (xpath != null) {
            this._xPath = ` and xpath="${xpath}"`;
            this._yqlQuery += this._xPath;
        }
        this._yqlQuery = this._yqlBaseUri + "q=" + encodeURIComponent(this._yqlQuery);
    }

    get yqlQuery(): string {
        return this._yqlQuery;
    }

}

window.onload = () => {
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
        inputUrl.linkText = (<HTMLInputElement>document.getElementById('storylink')).value.toString();
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