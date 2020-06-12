exports.findItem = findItem
exports.findItemIndex = findItemIndex
exports.findShirtsWithSize = findShirtsWithSize
exports.findShirts = findShirts
exports.findItems = findItems

function findItem(order, item) {
   var index = findItemIndex(order, item)
   if (index >= 0) {
     return order.items[index]
   }
   return null
}

function findItemIndex(order, item) {
   for (var i=0; i<order.items.length; i++) {
      if (order.items[i].$id === item.$id) {
        return i
      }
   }
   return -1
}

function findItems(items, searchTerm) {
   var matches = []
   //a lot can be improved here to improve matching the items
   for (var i=0; i<items.length; i++) {
      if (items[i].shirt.title.concat("s").toLowerCase().includes(searchTerm.toString().toLowerCase())) {
        matches.push(items[i])
      } else if (items[i].shirt.style.toLowerCase().includes(searchTerm.toString().toLowerCase())) {
        matches.push(items[i])
      } else if (items[i].shirt.brand.toLowerCase().includes(searchTerm.toString().trim().toLowerCase())) {
        matches.push(items[i])
      }
   }
   return matches
}


function findShirtsWithSize(order, shirt, size) {
   for (var i=0; i<order.items.length; i++) {
      if (order.items[i].shirt.$id === shirt.$id && order.items[i].size.toString() == size.toString()) {
        return i
      }
   }
   return -1
}

function findShirts(shirts, searchTerm) {
   var matches = []
   for (var i=0; i<shirts.length; i++) {
      if (shirts[i].title.concat("s").toLowerCase().includes(searchTerm.toString().toLowerCase())) {
        matches.push(shirts[i])
      }
   }
   return matches
}