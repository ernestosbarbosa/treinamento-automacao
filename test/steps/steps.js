var { defineSupportCode } = require('cucumber')
var { expect } = require('chai')
var { browser, element, by } = require('protractor')
var { AngularPage } = require('../pages/angularPage')
var angularPage = new AngularPage();

defineSupportCode(({ Given, Then, When }) => {
    Given('que acessei a pagina inicial', async function () {
        return await angularPage.isAngularPage();
    })
    When('preenchi {int} tarefas', async function (int) {
        return await angularPage.preencheTodo(int);
    });
    Then('a lista deve exibir todos os {int} campos', async function (int) {
        browser.sleep(5000);
        return await angularPage.validaLista(int);
    });
})