

describe('Testing parser', () => {
  const parser = require('../src/parser');
  const assert = require('assert');


  it('should parse single number', () => {
    assert.deepStrictEqual( parser('0'), [0] );
    assert.deepStrictEqual( parser('-1'), [-1] );
    assert.deepStrictEqual( parser('1'), [1] );
    assert.deepStrictEqual( parser('-123'), [-123] );
    assert.deepStrictEqual( parser('123'), [123] );
    assert.deepStrictEqual( parser('-0.123'), [-0.123] );
    assert.deepStrictEqual( parser('0.123'), [0.123] );
    assert.deepStrictEqual( parser('-123.456'), [-123.456] );
    assert.deepStrictEqual( parser('123.456'), [123.456] );
  });

  it('should parse single interval', () => {
    assert.deepStrictEqual( parser('0-2'), [0, 1, 2] );
    assert.deepStrictEqual( parser('-10--8'), [-10, -9, -8] );
  })

});
