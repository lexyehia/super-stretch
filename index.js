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

function convertNumberToWords(array) {
    let expandedArray = array.map((e) => dialPad[e].split('')); // [['a', 'b', 'c'], ['a', 'b', 'c']]

    function findWordRecursively(letters, progress, current_word, limit, found_words) {

        if (progress == limit) {
            // completed word, add to collection
            found_words.push(current_word);
        } else {

            // make recursive call for each letter in current press
            for (var i = 0; i < letters[progress].length; i++) {
                var next_word = current_word + letters[progress][i];

                findWordRecursively(letters, progress + 1, next_word, limit, found_words);
            }
        }

        return found_words
    }

    let return_value = findWordRecursively(expandedArray, 0, '', array.length, []);

    return return_value;
}

// function convertArrayToRegexp(array) {
//
//     return new RegExp('\\b' + array.map((e) => dialPad[e]).join('') + '\\b', 'gi');
// }

function searchMatchingWords(listOfPossibleWords) {

    const wordDict = fs.readFileSync('./words.txt', 'utf8').split('\n');

    let matchedWords = listOfPossibleWords.filter((word) => wordDict.includes(word)).slice(0, 3);

    return matchedWords;
}

function mainFunc(number) {
    let possibleWords = convertNumberToWords(standardizeNumber(number));
    let matches = searchMatchingWords(possibleWords);
    return matches;
}

console.log(mainFunc(73636237));

