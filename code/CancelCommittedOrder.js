import ZonedDateTime from './lib/zoned-date-time-polyfill.js';
import config from 'config';
import console from 'console';
//CancelCommittedOrder
export default function ({ receipt, $vivContext }) {
  ZonedDateTime.setVivContext($vivContext);
  if (receipt.orderState == 'Ordered') {
    receipt.orderState = 'Cancelled';
  }
  receipt.statusRefreshTime = ZonedDateTime.now()
    .plusSeconds(parseInt(config.get('status_refresh_time')))
    .getDateTime();
  return receipt;
}
