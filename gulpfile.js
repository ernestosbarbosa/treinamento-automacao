var gulp = require('gulp');
var del = require('del');
var vsts = require('vso-node-api');
var fs = require('fs');
var FilePath = './test/features/us.feature';
var encode = 'utf8';

gulp.task('clean-test', function () {
    return del(['./test/features/*.feature', './reports/cucumber*']);
});

gulp.task('features', ['clean-test'], function () {
    var collectionUrl = "https://ernestosbarbosa.visualstudio.com/";
    var token = "zz6kcrxzugwmlk3xjeqodsjfsddqutdx2klrqhmf3ycl45xjicbq";
    var project = "treinamento-automacao";
    var authHandler = vsts.getPersonalAccessTokenHandler(token);
    var connect = new vsts.WebApi(collectionUrl, authHandler);
    return connect.getWorkItemTrackingApi().getWorkItem(91).then((workItem) => {
        var str = "#language: pt \n" +
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