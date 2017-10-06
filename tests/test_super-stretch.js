const assert = require('assert');
const phone  = require('../index');

describe("Luhn's algorithm", function() {
    it("should return true if a a number is valid", function() {
        var number = 4494105176204974;
        var result = checkNumber(number);
        assert.isTrue(result);
    });

    it("should return false if a a number is invalid", function() {
        var number = 449415576204974;
        var result = checkNumber(number);
        assert.isFalse(result);
    });
});