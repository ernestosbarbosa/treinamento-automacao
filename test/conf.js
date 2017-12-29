exports.config = {
    // sauceUser: "ernestos_barbosa",
    // sauceKey: "11cf801b-8551-438d-9a13-188ae6c506ae",
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    chromeDriver: "C:/Renner/chromedriver/chromedriver.exe",
    capabilities: {
        browserName: 'chrome'
    },
    getPageTimeout: 20000,
    allScriptsTimeout: 600000,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        './**/*.feature'
    ],
    cucumberOpts: {
        format: ['json:reports/cucumber_report.json'],
        require: ['./elements/**/*.js', './steps/**/*.js', './support/**/*.js', './pages/**/*.js']
    },
    baseUrl: "https://angularjs.org/",
    ignoreUncaughtExceptions: true,
    onComplete: () => {
    },
    afterLaunch: () => {
    },
    noGlobals: true
};