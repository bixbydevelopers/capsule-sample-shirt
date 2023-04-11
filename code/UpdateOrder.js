import console from 'console';
import fail from 'fail';
import * as lib from "./lib/util.js";

//UpdateOrder
export default function ({ order, addedItems, changedItems, removedItems }) {
  //remove, change and then add
  console.log(addedItems, changedItems, removedItems);
  order = remove(order, removedItems);
  order = change(order, changedItems);
  order = add(order, addedItems);
  return order;
}

function change(order, changedItems) {
  if (!changedItems) {
    return order;
  }

  [].concat(changedItems.items).forEach(function (changedItem) {
    var index =
      order.items.length == 1 ? 0 : lib.findItemIndex(order, changedItem.item);
    console.log('!', changedItem);
    if (index >= 0) {
      if (changedItem.newSize) {
        // check if a different item already exists with newSize
        var itemWithNewSizeIndex = lib.findShirtsWithSize(
          order,
          changedItem.item.shirt,
          changedItem.newSize
        );
        if (itemWithNewSizeIndex >= 0 && index != itemWithNewSizeIndex) {
          // transfer over the old item's quantity
          order.items[itemWithNewSizeIndex].quantity +=
            order.items[index].quantity;
          // delete item old item
          order.items.splice(index, 1);
          // set index to the updated item's index
          index = itemWithNewSizeIndex;
        } else {
          order.items[index].size = changedItem.newSize;
        }
      }
      if (changedItem.newQuantity) {
        // store the old quantity as it is overwritten
        var oldQuantity = order.items[index].quantity;
        order.items[index].quantity = changedItem.newQuantity;
        // deep copy of order.totalPrice, because it refers to the same object as order.items[index].shirt.price for some reason...
        order.totalPrice = Object.assign({}, order.totalPrice);
        order.totalPrice.value +=
          order.items[index].shirt.price.value *
          (changedItem.newQuantity - oldQuantity);
      } else if (changedItem.newQuantity == 0) {
        order = remove(order, { items: changedItem });
      }
    } else {
      if (order.length) {
        throw fail.checkedError('NoMatch', 'NoMatch');
      } else {
        throw fail.checkedError('NoItems', 'NoItems');
      }
    }
  });
  return order;
}

function remove(order, removedItems) {
  if (!removedItems) {
    return order;
  }
  [].concat(removedItems.items).forEach(function (removedItem) {
    var index = lib.findItemIndex(order, removedItem.item);
    if (index >= 0) {
      // deep copy of order.totalPrice, because it refers to the same object as order.items[index].shirt.price for some reason...
      order.totalPrice = Object.assign({}, order.totalPrice);
      if (removedItem.removedQuantity >= order.items[index].quantity) {
        //remove the item
        order.totalPrice.value -=
          order.items[index].shirt.price.value * order.items[index].quantity;
        order.items.splice(index, 1);
      } else {
        // remove only the specified quantity
        order.items[index].quantity -= removedItem.removedQuantity;
        order.totalPrice.value -=
          order.items[index].shirt.price.value * removedItem.removedQuantity;
      }
    } else {
      if (order.length) {
        throw fail.checkedError('NoMatch', 'NoMatch');
      } else {
        throw fail.checkedError('NoItems', 'NoItems');
      }
    }
  });
  return order;
}

function add(order, addedItems) {
  if (!addedItems) {
    return order;
  }
  [].concat(addedItems.items).forEach(function (item) {
    //check if there is a shirt with same size in the order already
    var index = lib.findShirtsWithSize(order, item.shirt, item.size);
    if (index >= 0) {
      //update old item
      order.items[index].quantity += item.quantity;
    } else {
      //add new item
      item.$type = 'example.shirt.Item'; //down cast from `AddedItem` to an `Item`
      order.items[order.items.length] = item;
    }
    // deep copy of order.totalPrice, because it refers to the same object as order.items[index].shirt.price for some reason...
    order.totalPrice = Object.assign({}, order.totalPrice);
    order.totalPrice.value += item.shirt.price.value * item.quantity;
  });
  return order;
}
