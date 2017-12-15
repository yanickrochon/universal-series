

describe('Testing series', () => {
  const series = require('../src/series');
  const assert = require('assert');


  it('should be reciprocal (string > array > string)', () => {
    [
      '', '0', '1',
      '1,2', '-9,-8',
      '0-3', '-23--15',
      '1-5,11-19', '-7--3,1,6'
    ].forEach(value => assert.strictEqual( series.compile( series.parse( value )), value) );
  });


  it('should be reciprocal (array > string > array)', () => {
    [
      [], [0], [1],
      [1, 2], [-9, -8],
      [0,1,2,3], [-23, -22, -21, -20, -19],
      [1, 2, 3, 4, 11, 12, 13, 14, 17], [-7, -6, -5, -4, -3, 1, 2, 3, 4, 5, 6]
    ].forEach(value => assert.deepStrictEqual( series.parse( series.compile( value )), value) );
  });

});
