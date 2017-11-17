var { browser, element, by, ElementFinder } = require('protractor')
var { Common } = require('../support/common');
var { expect } = require('chai')
var utils = new Common();

class AngularPage {
    constructor() {
        this.page = "angular";
        this.todoText = "todo";
        this.addButton = "add";
        this.listIteration = "lista";
    }
    isAngularPage(){
        this.existsAddButton();
        this.existsTodoText();
    }
    existsTodoText() {
        return utils.waitElement(this.page, this.todoText).then(() => {
            return utils.element(this.page, this.todoText).isPresent().then((value) => {
                expect(value).to.be.true;
            });
        })
    }
    existsAddButton() {
        return utils.waitElement(this.page, this.addButton).then(() => {
            return utils.element(this.page, this.addButton).isPresent().then((value) => {
                expect(value).to.be.true;
            })
        });
    }
    preencheTodoText(int) {
        return utils.waitElement(this.page, this.todoText).then(() => {
            return utils.element(this.page, this.todoText).sendKeys("Tarefa "+int);
        }).then(()=>{
            return this.clickAddButton();
        })
    }
    clickAddButton() {
        return utils.waitElement(this.page, this.addButton).then(() => {
            return utils.element(this.page, this.addButton).click();
        })
    }
    validateList(int){
        return utils.waitElement(this.page, this.listIteration).then(() => {
            return utils.elements(this.page, this.listIteration).count().then((value)=>{
                expect(value).to.eql(3);
            });
        })
    }
}

exports.AngularPage = AngularPage;