var { safeLoad, JSON_SCHEMA } = require('js-yaml')
var { resolve } = require('path')
var { readFileSync } = require('fs')
var { browser, element, by, ElementFinder, ElementArrayFinder, until, ExpectedConditions } = require('protractor')

class Common {

    page(page) {
        return safeLoad(readFileSync(resolve("./test/elements/" + page + "Page.yml"), 'utf8'), { schema: JSON_SCHEMA });
    }

    element(page, el) {
        switch (this.page(page)[page][el]['tipo_busca']) {
            case TIPO_BUSCA.CSS:
                return element(by.css(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.CLASS:
                return element(by.className(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.ID:
                return element(by.id(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.XPATH:
                return element(by.xpath(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.MODEL:
                return element(by.model(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.REPEAT:
                return element(by.repeater(this.page(page)[page][el]['value']))
            default:
                break;
        }
    }
    waitElement(page, el) {
        switch (this.page(page)[page][el]['tipo_busca']) {
            case TIPO_BUSCA.CSS:
                return browser.wait(ExpectedConditions.presenceOf(element(by.css(this.page(page)[page][el]['value'])))).then(result => {
                    return result;
                })
            case TIPO_BUSCA.CLASS:
                return browser.wait(ExpectedConditions.presenceOf(element(by.className(this.page(page)[page][el]['value'])))).then(result => {
                    return result;
                })
            case TIPO_BUSCA.ID:
                return browser.wait(ExpectedConditions.presenceOf(element(by.id(this.page(page)[page][el]['value'])))).then(result => {
                    return result;
                })
            case TIPO_BUSCA.XPATH:
                return browser.wait(ExpectedConditions.presenceOf(element(by.xpath(this.page(page)[page][el]['value'])))).then(result => {
                    return result;
                })
            case TIPO_BUSCA.MODEL:
                return browser.wait(ExpectedConditions.presenceOf(element(by.model(this.page(page)[page][el]['value'])))).then(result => {
                    return result;
                })
            case TIPO_BUSCA.REPEAT:
                return browser.wait(ExpectedConditions.presenceOf(element(by.repeater(this.page(page)[page][el]['value'])))).then(result => {
                    return result;
                })
            default:
                break;
        }
    }
    elements(page, el) {
        switch (this.page(page)[page][el]['tipo_busca']) {
            case TIPO_BUSCA.CSS:
                return element.all(by.css(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.CLASS:
                return element.all(by.className(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.ID:
                return element.all(by.id(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.XPATH:
                return element.all(by.xpath(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.MODEL:
                return element.all(by.model(this.page(page)[page][el]['value']))
            case TIPO_BUSCA.REPEAT:
                return element.all(by.repeater(this.page(page)[page][el]['value']))
            default:
                break;
        }
    }

}

let TIPO_BUSCA = {
    CSS: "CSS",
    CLASS: "CLASS",
    ID: "ID",
    XPATH: "XPATH",
    MODEL: "MODEL",
    REPEAT: "REPEAT"
}

exports.Common = Common;