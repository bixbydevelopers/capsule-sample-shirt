//CreateItem
exports.function = function(changedItem, changedItem2, changedItem3) {
    items = []
    if (changedItem) {
      items.push(changedItem)
    }
    if (changedItem2) {
      delete changedItem2.$type
      items.push(changedItem2)
    }
    if (changedItem3) {
      delete changedItem3.$type
      items.push(changedItem3)
    }
    return {items: items}
}