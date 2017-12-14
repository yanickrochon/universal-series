
const GROUP_PATTERN = /^(-?\d+|-?\d+\.\d+)(?:-(-?\d+|-?\d+\.\d+))?$/;

module.exports = function parser(str) {
  let offset = 0;
  return str.split(',').reduce(function (series, group) {
    const m = group.match(GROUP_PATTERN); //.map(Number).filter(function (n) { return !isNaN(n); });

    if (m && m.length) {
      if (m[2]) {
        const lo = parseFloat(m[1], 10);
        const hi = parseFloat(m[2], 10);

        series.push.apply(series, Array.apply(null, {length: hi - lo + 1}).map(Number.call, function (i) { return lo + i }));
      } else {
        const n = parseFloat(m[1], 10);

        series.push(n);
      }
    } else {
      throw new Error('Unexpected token at position ' + offset);
    }

    offset = offset + group.length + 1;

    return series;
  }, []);
};
