//CreateItem
export default function ({ removedItem, removedItem2, removedItem3 }) {
  var items = [];
  if (removedItem) {
    items.push(removedItem);
  }
  if (removedItem2) {
    delete removedItem2.$type;
    items.push(removedItem2);
  }
  if (removedItem3) {
    delete removedItem3.$type;
    items.push(removedItem3);
  }
  return { items: items };
}
