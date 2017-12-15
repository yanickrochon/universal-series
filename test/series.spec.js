

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


  });

});
