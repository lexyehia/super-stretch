const fs = require('fs');
const readline = require('readline');

function standardizeNumber(number) {

    if (typeof number === 'string') {
        return number.split('').map(Number).filter((x) => x > 1);
    } else if (typeof number === 'number') {
        return number.toString().split('').map(Number).filter((x) => x > 1);
    } else {
        throw Error("Invalid input");
    }
}
//

function convertArrayToRegexp(array) {
    const dialPad = {
        2: '[abc]',
        3: '[def]',
        4: '[ghi]',
        5: '[jkl]',
        6: '[mno]',
        7: '[prs]',
        8: '[tuv]',
        9: '[wxy]'
    }

    return new RegExp('\\b' + array.map((e) => dialPad[e]).join('') + '\\b', 'gi');
}

function searchMatchingWords(regexp) {

    const wordDict = fs.readFileSync('./words.txt', 'utf8').split('\n');
    let result = [];

    wordDict.forEach((w) => {
        if (regexp.test(w)) { result.push(w); }
    });

    return result;
}

function mainFunc(number) {
    let rxp = convertArrayToRegexp(standardizeNumber(number));
    return searchMatchingWords(rxp);

}

var test = mainFunc(43556);

