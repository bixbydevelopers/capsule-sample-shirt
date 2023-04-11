import ZonedDateTime from './lib/zoned-date-time-polyfill.js';
import config from 'config';
import console from 'console';
import http from 'http';
//CommitOrder
export default function ({ order, $vivContext }) {
  
  ZonedDateTime.setVivContext($vivContext);
  console.log(ZonedDateTime.now().plusSeconds(parseInt(config.get('status_refresh_time'))))
  console.log(config.get('status_refresh_time'))
  //pay(order.totalPrice.value, order.totalPrice.currencyType.currencyCode, order.items)
  return {
    order: order,
    orderState: 'Ordered',
    statusRefreshTime: ZonedDateTime.now()
      .plusSeconds(parseInt(config.get('status_refresh_time')))
      .getDateTime(),
  };
}

function pay(amount, currency, items) {
  console.log('amount: ', amount, ', currency: ', currency);
  var options = {};
  options.headers = { 'Content-Type': 'application/json' };
  options.body = '{ "card_number": "{{credit_card_number}}" }';
  var result = http.spsProxyPost(options);
  console.log(result);

  return result;
}
