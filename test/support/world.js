var { defineSupportCode } = require('cucumber');
var { browser } = require('protractor')

defineSupportCode(({ setWorldConstructor, Before, setDefaultTimeout }) => {

    setDefaultTimeout(60 * 1000);

    setWorldConstructor(
        function World() {
        })

    Before(async function () {
        return await browser.get(browser.baseUrl);
    })
    
})
