import fail from 'fail';
import * as lib from "./lib/util.js";

// SelectItem
export default function ({ searchTerm, items }) {
  items = [].concat(items);
  if (items.length == 1 && !searchTerm) {
    var selected = items[0];
    return selected;
  }
  var matches = lib.findItems(items, searchTerm);
  if (matches.length == 1) {
    return matches;
  } else if (matches.length > 1) {
    throw fail.checkedError('MultipleMatches', 'MultipleMatches', {
      matches: matches,
    });
  }
  return null; //no match
}
