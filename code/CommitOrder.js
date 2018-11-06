//CommitOrder
exports.function = function (order) {

  //pay(order.totalPrice.value, order.totalPrice.currencyType.currencyCode, order.items)
  return {
    order: order,
    orderState: "Ordered",
    statusRefreshTime: dates.ZonedDateTime.now().plusSeconds(parseInt(config.get("status_refresh_time"))).getDateTime()
  }
}

function pay (amount, currency, items) {

  console.log("amount: ", amount, ", currency: ", currency)
  var options = {}
  options.headers = {"Content-Type" : "application/json"}
  options.body = "{ \"card_number\": \"{{credit_card_number}}\" }"
  var result = http.spsProxyPost(options)
  console.log(result)

  return result
}

