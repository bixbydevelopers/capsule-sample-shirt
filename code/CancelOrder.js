//CancelOrder
exports.function = function(order) {
    return {
      order: order,
      orderState: "Cancelled"
    }
}