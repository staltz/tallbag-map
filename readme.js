/**
 * tallbag-map
 * -----------
 *
 * Tallbag operator that applies a transformation on data passing through it.
 * Works on either pullable or listenable sources.
 *
 * `npm install tallbag-map`
 *
 * Example:
 *
 *     const fromIter = require('callbag-from-iter');
 *     const iterate = require('callbag-iterate');
 *     const map = require('tallbag-map');
 *
 *     const source = map(x => x * 0.1)(fromIter([10,20,30,40]));
 *
 *     iterate(x => console.log(x))(source); // 1
 *                                           // 2
 *                                           // 3
 *                                           // 4
 */

const makeShadow = require('shadow-callbag').default;

const map = f => source => (start, sink) => {
  if (start !== 0) return;
  let shadow;
  source(0, (t, d, s) => {
    if (t === 0) {
      shadow = makeShadow('map', s);
      sink(0, d, shadow);
    }
    if (t === 1) {
      const y = f(d);
      shadow && shadow(1, y);
      sink(t, y);
    }
    if (t === 2) sink(t, d);
  });
};

module.exports = map;
