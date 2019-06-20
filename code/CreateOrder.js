var dates = require('dates')
var config = require('config')
//CreateOrder
exports.function = function(initialItems) {
  return {
    items: initialItems.items,
    totalPrice: calculateTotalPrice(initialItems.items),
    orderNumber: 23343,
    holdTime: dates.ZonedDateTime.now("UTC").plusSeconds(parseInt(config.get("hold_time"))).getMillisFromEpoch()
  }
}

function calculateTotalPrice(items) {
    var totalPrice = 0
    for (var i=0; i<items.length; i++) {
      totalPrice += items[i].shirt.price.value * items[i].quantity
    }
    return {
      value: totalPrice,
      currencyType: {
        prefixSymbol: '$',
        currencyCode: 'USD'
      }
    }
}