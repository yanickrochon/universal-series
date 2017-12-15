

describe('Testing compiler', () => {
  const compiler = require('../src/compiler');
  const assert = require('assert');


  it('should compile empty series', () => {
    assert.strictEqual( compiler([]), '' );
  });


  it('should compile single index', () => {
    assert.strictEqual( compiler( [0] ), '0' );
    assert.strictEqual( compiler( [-1] ), '-1' );
    assert.strictEqual( compiler( [123] ), '123' );
  });


  it('should compile series', () => {
    assert.strictEqual( compiler( [0,1] ), '0,1' );
    assert.strictEqual( compiler( [13,14] ), '13,14' );
    assert.strictEqual( compiler( [-8,-9] ), '-9,-8' );

    assert.strictEqual( compiler( [0,1,2] ), '0-2' );
    assert.strictEqual( compiler( [2,0,1] ), '0-2' );
    assert.strictEqual( compiler( [-23,-25,-24] ), '-25--23' );
    assert.strictEqual( compiler( [234,238,236,237,235] ), '234-238' );
  });


  it('should compile interrupted series', () => {
    assert.strictEqual( compiler( [0,1,4,5,6] ), '0,1,4-6' );
    assert.strictEqual( compiler( [0,1,-4,-5,-6] ), '-6--4,0,1' );
    assert.strictEqual( compiler( [2,4,6] ), '2,4,6' );
    assert.strictEqual( compiler( [2,4,5,6,11] ), '2,4-6,11' );
  });


  it('should fail with invalid value', () => {
    assert.throws(() => compiler( ['hello'] ));
    assert.throws(() => compiler( [0, 1, 'hello'] ));
    assert.throws(() => compiler( [0, 'hello', 2] ));
  });


  it('should fail with invalid series type', () => {
    [
      void 0, null, '', 'hello', {}, new Date(), /./, -1, 0, 1, () => {}
    ].forEach(series => assert.throws(() => compiler(series)) );
  })

});
