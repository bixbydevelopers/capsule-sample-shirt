//CreateItem
exports.function = function(item, item2, item3) {
    items = []
    if (item) {
      items.push(item)
    }
    if (item2) {
      delete item2.$type
      items.push(item2)
    }
    if (item3) {
      delete item3.$type
      items.push(item3)
    }
    return {items: items}
}