var { browser, element, by, ElementFinder } = require('protractor')
var { Common } = require('../support/common');
var { expect } = require('chai')
var utils = new Common();

class AngularPage {

    constructor() {
        this.page = "angular";
        this.todo = "todo";
        this.add = "add";
        this.lista = "lista";
    }
    isAngularPage(){
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
    preencheTodo(int) {
        return utils.esperaElemento(this.page, this.todo).then(() => {
            return utils.elemento(this.page, this.todo).sendKeys("Tarefa "+int);
        }).then(()=>{
            return this.clickAdd();
        })
    }
    clickAdd() {
        return utils.esperaElemento(this.page, this.add).then(() => {
            return utils.elemento(this.page, this.add).click();
        })
    }
    validaLista(int){
        return utils.esperaElemento(this.page, this.lista).then(() => {
            return utils.elementos(this.page, this.lista).count().then((value)=>{
                expect(value).to.eql(3);
            });
        })
    }
}

exports.AngularPage = AngularPage;