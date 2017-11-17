var { defineSupportCode } = require('cucumber');
var { browser } = require('protractor')

defineSupportCode(({ setWorldConstructor, Before }) => {
    setWorldConstructor(
        function World() {
        })

    Before(async function () {
        browser.ignoreSynchronization = true;
        return await browser.manage().window().maximize();
    })
})
