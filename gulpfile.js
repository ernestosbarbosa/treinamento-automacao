var gulp = require('gulp');
var del = require('del');
let vsts = require('vso-node-api');
var fs = require('fs');
var FilePath = './test/e2e/features/us.feature';
var encode = 'utf8';

gulp.task('clean-test', function () {
    return del(['./test/e2e/features/*.feature', './reports/cucumber*']);
});

gulp.task('features', ['clean-test'], function () {
    let collectionUrl = "https://ernestosbarbosa.visualstudio.com/";
    let token = "zz6kcrxzugwmlk3xjeqodsjfsddqutdx2klrqhmf3ycl45xjicbq";
    let project = "treinamento-automacao";
    let authHandler = vsts.getPersonalAccessTokenHandler(token);
    let connect = new vsts.WebApi(collectionUrl, authHandler);
    return connect.getWorkItemTrackingApi().getWorkItem(91).then(workItem => {
        let str = "#language: pt \n" +
            "#encoding: utf-8 \n" +
            "Funcionalidade: " + workItem.fields['System.Title'] + "\n" +
            convertHtmlToText(workItem.fields['AgileTest.Contexto']) + "\n" +
            convertHtmlToText(workItem.fields['AgileTest.BDDCenarios']);
        fs.writeFileSync(FilePath, str, encode);
    })
});

function convertHtmlToText(inputText) {
    var returnText = "" + inputText;

    returnText = returnText.replace(/<br>/gi, "\n");
    returnText = returnText.replace(/<br\s\/>/gi, "\n");
    returnText = returnText.replace(/<br\/>/gi, "\n");
    returnText = returnText.replace(/<\/div>/gi, "\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*>/gi, "\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/&nbsp;/gi, " ");
    returnText = returnText.replace(/&amp;/gi, "&");
    returnText = returnText.replace(/&quot;/gi, '"');
    returnText = returnText.replace(/&lt;/gi, '<');
    returnText = returnText.replace(/&gt;/gi, '>');

    return returnText;
}