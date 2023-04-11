import ZonedDateTime from './lib/zoned-date-time-polyfill.js';
import config from 'config';
//CheckStatus
export default function ({ receipt, $vivContext }) {
  ZonedDateTime.setVivContext($vivContext);
  // These conditions are here to simulate the order being shipped and delivered.
  // The first time a Check Status is run, this order will be Shipped, and then the next time it will be Delivered, and stay that way.

  if (receipt) {
    if (receipt.orderState == 'Ordered') {
      receipt.orderState = 'Shipped';
    } else if (receipt.orderState == 'Shipped') {
      receipt.orderState = 'Delivered';
    }
    receipt.statusRefreshTime = ZonedDateTime.now()
      .plusSeconds(parseInt(config.get('status_refresh_time')))
      .getDateTime();
  }
  return receipt;
}
