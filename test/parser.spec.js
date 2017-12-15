

describe('Testing parser', () => {
  const parser = require('../src/parser');
  const assert = require('assert');


  it('should parse empty series', () => {
    assert.deepStrictEqual( parser(''), [] );
  });

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
  });


  it('should parse series', () => {
    assert.deepStrictEqual( parser('-1,-2,-3'), [-3, -2, -1] );
    assert.deepStrictEqual( parser('-1,-2,-3,-2'), [-3, -2, -1] );  // ignore duplicates
    assert.deepStrictEqual( parser('100,200,300'), [100,200,300] );
    assert.deepStrictEqual( parser('100,200,300,200'), [100,200,300] );  // ignore duplicates
  });


  it('should fail with invalid series', () => {
    assert.throws(() => parser('hello') );
    assert.throws(() => parser('1-') );
    assert.throws(() => parser('1-hello') );
    assert.throws(() => parser('1-2,hello') );
    assert.throws(() => parser('1-2,17-') );
    assert.throws(() => parser('1-2,17-hello') );
  });

  it('should fail with invalid series type', () => {
    [
      void 0, null, [], {}, new Date(), /./, -1, 0, 1, () => {}
    ].forEach(series => assert.throws(() => parser(series)) );
  });

});
