var fail = require('fail')
var lib = require("./lib/util.js");

// SelectItem
exports.function = function(searchTerm, sizeSearchTerm, items) {
   items = [].concat(items)
   if (items.length == 1 && !searchTerm) {
     var selected = items[0]
     return selected
   }
   var matches = lib.findItems(items, searchTerm, sizeSearchTerm)
   if (matches.length == 1) {
     return matches
   } else if (matches.length > 1) {
     throw fail.checkedError("MultipleMatches", "MultipleMatches", {matches: matches})
   }
   return null //no match
}