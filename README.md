# Universal Series

Convert string representations of series to arrays and back


## Install

```sh
npm i universal-series --save
```


## Usage

```js
import series from 'universal-series';


const s = '1,3-6,10,20-22';

const a = series.parse(s);
// [1,3,4,5,6,10,20,21,22]

a.push(7);
a.push(11);
a.push(19);
a.push(19);  // duplicates are ignored

const s2 = series.compile(a);
// '1,3-7,10,11,19-22'
```
