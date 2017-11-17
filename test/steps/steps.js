var { defineSupportCode } = require('cucumber')
var { expect } = require('chai')
var { browser, element, by } = require('protractor')
var { InicioPage } = require('../pages/inicioPage')
var inicioPage = new InicioPage();

defineSupportCode(({ Given, Then, When }) => {
    Given('que acessei a pagina inicial', async function () {
        return await true;
    })
    When('preenchi {int} tarefas', async function (int) {
        return await true;
    });
    Then('a lista deve exibir todos os {int} campos', async function (int) {
        return await true;
    });
})