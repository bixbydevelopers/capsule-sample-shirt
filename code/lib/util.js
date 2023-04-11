export function findItem(order, item) {
  var index = findItemIndex(order, item);
  if (index >= 0) {
    return order.items[index];
  }
  return null;
}

export function findItemIndex(order, item) {
  for (var i = 0; i < order.items.length; i++) {
    if (order.items[i].$id === item.$id) {
      return i;
    }
  }
  return -1;
}

export function findShirtsWithSize(order, shirt, size) {
  for (var i = 0; i < order.items.length; i++) {
    if (
      order.items[i].shirt.$id === shirt.$id &&
      order.items[i].size.toString() == size.toString()
    ) {
      return i;
    }
  }
  return -1;
}

export function findShirts(shirts, searchTerm) {
  var matches = [];
  for (var i = 0; i < shirts.length; i++) {
    if (
      shirts[i].keywords
        .toString()
        .includes(searchTerm.toString().toLowerCase())
    ) {
      matches.push(shirts[i]);
    } else if (
      shirts[i].style
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    ) {
      matches.push(shirts[i]);
    } else if (
      shirts[i].brand
        .toLowerCase()
        .includes(searchTerm.toString().replace(/\s/g, '').toLowerCase())
    ) {
      matches.push(shirts[i]);
    }
  }
  return matches;
}

export function findItems(items, searchTerm) {
  var matches = [];
  //a lot can be improved here to improve matching the items
  for (var i = 0; i < items.length; i++) {
    if (
      items[i].shirt.keywords
        .toString()
        .includes(searchTerm.toString().toLowerCase())
    ) {
      matches.push(items[i]);
    } else if (
      items[i].shirt.style
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    ) {
      matches.push(items[i]);
    } else if (
      items[i].shirt.brand
        .toLowerCase()
        .includes(searchTerm.toString().replace(/\s/g, '').toLowerCase())
    ) {
      matches.push(items[i]);
    }
  }
  return matches;
}
