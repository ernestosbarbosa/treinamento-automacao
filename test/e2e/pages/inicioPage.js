var { element, by, ElementFinder } = require('protractor')
var { Common } = require('../support/common');
var { expect } = require('chai')
var utils = new Common();

class InicioPage {

    constructor() {
        this.page = "inicio";
        this.todo = "todo";
        this.add = "add";
    }
    isInicioPage(){
        this.existeAdd();
        this.existeTodo();
    }
    existeTodo() {
        return utils.esperaElemento(this.page, this.todo).then(() => {
            return utils.elemento(this.page, this.todo).isPresent().then((value) => {
                expect(value).to.be.true;
            });
        })
    }
    existeAdd() {
        return utils.esperaElemento(this.page, this.add).then(() => {
            return utils.elemento(this.page, this.add).isPresent().then((value) => {
                expect(value).to.be.true;
            })
        });
    }
    preencheTodo(text) {
        return utils.esperaElemento(this.page, this.todo).then(() => {
            return utils.elemento(this.page, this.todo).sendKeys(text);
        })
    }
    add() {
        return utils.esperaElemento(this.page, this.add).then(() => {
            return utils.elemento(this.page, this.add).click();
        })
    }
}

exports.InicioPage = InicioPage;