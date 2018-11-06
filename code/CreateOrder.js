//CreateOrder
exports.function = function(items) {
  return items.map(function(item) {
    return {
      items: items,
      totalPrice: calculateTotalPrice(items),
      orderNumber: 23343,
      holdTime: dates.ZonedDateTime.now("UTC").plusSeconds(parseInt(config.get("hold_time"))).getMillisFromEpoch()
    }
  })
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