

module.exports = function compiler(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Series must be an array');
  } else if (!arr.length) {
    return '';   // shortcut
  }

  const data = arr.filter(function (e, i, a) { return a.indexOf(e) === i; }).sort(function (a, b) { return a - b; }).reduce(function (data, n, i) {

    if (isNaN(n)) {
      throw new TypeError('Invalid value in array at position ' + i + ' : ' + n);
    }

    n = parseFloat(n, 10);

    if (data.stack.length && (n - data.stack[data.stack.length - 1] > 1)) {
      data.sequences.push(unstack(data.stack));
    }

    data.stack.push(n);

    return data;
  }, { stack: [], sequences: [] });

  data.sequences.push(unstack(data.stack));

  return data.sequences.join(',');
};


function unstack(stack) {
  const sequence = stack.splice(0, stack.length);

  return sequence.length < 3 ? sequence.join(',') : String(sequence[0]) + '-' + String(sequence[sequence.length - 1]);
}
