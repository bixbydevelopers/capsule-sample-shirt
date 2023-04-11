import ZonedDateTime from './lib/zoned-date-time-polyfill.js';
import config from 'config';
//CreateOrder
export default function ({ initialItems, $vivContext }) {
  ZonedDateTime.setVivContext($vivContext);
  return {
    items: initialItems.items,
    totalPrice: calculateTotalPrice(initialItems.items),
    orderNumber: 23343,
    holdTime: ZonedDateTime.now('UTC')
      .plusSeconds(parseInt(config.get('hold_time')))
      .getMillisFromEpoch(),
  };
}

function calculateTotalPrice(items) {
  var totalPrice = 0;
  for (var i = 0; i < items.length; i++) {
    totalPrice += items[i].shirt.price.value * items[i].quantity;
  }
  return {
    value: totalPrice,
    currencyType: {
      prefixSymbol: '$',
      currencyCode: 'USD',
    },
  };
}
