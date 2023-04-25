//CreateItem
export default function ({ addedItem, addedItem2, addedItem3 }) {
  var items = [];
  if (addedItem) {
    items.push(addedItem);
  }
  if (addedItem2) {
    delete addedItem2.$type;
    items.push(addedItem2);
  }
  if (addedItem3) {
    delete addedItem3.$type;
    items.push(addedItem3);
  }
  return { items: items };
}
