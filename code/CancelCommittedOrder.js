var dates = require('dates')
var config = require('config')
//CancelCommittedOrder
exports.function = function(receipt) {
  if (receipt.orderState == "Ordered") {
    receipt.orderState = "Cancelled"
  }
  receipt.statusRefreshTime = dates.ZonedDateTime.now().plusSeconds(parseInt(config.get("status_refresh_time"))).getDateTime()
  return receipt
}
