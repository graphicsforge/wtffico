
const assert = require('assert');
const FicoRanking = require('../src/FicoRanking');

describe('FicoRanking', function() {
  describe('getPercentage', function() {
    it('should return 0 for values that are too low', function() {
      assert.equal(FicoRanking.getPercentage(300), 0);
    });
    it('should return 100 for values that are too high', function() {
      assert.equal(FicoRanking.getPercentage(900), 100);
    });
    it('should linearly interpolate between values', function() {
      assert.equal(FicoRanking.getPercentage(63.5, [
        { score: 0, percent: 0 },
        { score: 100, percent: 100 },
      ]), 63.5);
    });
  });
});
