const fs = require('fs');

const dialPad = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'prs',
    8: 'tuv',
    9: 'wxy'
};

function standardizeNumber(number) {

    if (typeof number === 'string') {
        return number.split('').map(Number).filter((x) => x > 1);
    } else if (typeof number === 'number') {
        return number.toString().split('').map(Number).filter((x) => x > 1);
    } else {
        throw Error("Invalid input");
    }
}

function convertNumberToWords(inputtedNumberArray) {
    let expandedArray = inputtedNumberArray.map((e) => dialPad[e].split('')); // [['a', 'b', 'c'], ['a', 'b', 'c']]

    function findWordRecursively(letters, progress, currentWord, limit, foundWords) {

        if (progress === limit) {
            foundWords.push(currentWord);

        } else {
            for (var i = 0; i < letters[progress].length; i++) {
                let next_word = currentWord + letters[progress][i];

                findWordRecursively(letters, progress + 1, next_word, limit, foundWords);
            }
        }

        return foundWords
    }

    return findWordRecursively(expandedArray, 0, '', inputtedNumberArray.length, []);
}

// function convertArrayToRegexp(array) {
//
//     return new RegExp('\\b' + array.map((e) => dialPad[e]).join('') + '\\b', 'gi');
// }

function searchMatchingWords(listOfPossibleWords) {

    const wordDict = fs.readFileSync('./words.txt', 'utf8').split('\n');
    let matchedWords = [];

    // Break out of the for-loop prematurely if we already have 3 matches
    for (let word of listOfPossibleWords) {
        if (matchedWords.length === 3) {
            break;
        } else if (wordDict.includes(word)) {
            matchedWords.push(word);
        }
    }

    //let matchedWords = listOfPossibleWords.filter((word) => wordDict.includes(word)).slice(0, 3);

    return matchedWords;
}

function mainFunc(number) {
    let possibleWords = convertNumberToWords(standardizeNumber(number));
    let matches = searchMatchingWords(possibleWords);
    return matches;
}

console.log(mainFunc(73636237));

