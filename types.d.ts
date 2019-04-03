import {Source} from 'tallbag';
import {Metadata} from 'shadow-callbag';

export default function map<I, O>(
  f: (d: I) => O,
): (source: Source<I, Metadata>) => Source<O, Metadata>;
