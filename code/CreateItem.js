//CreateItem
export default function ({ shirt, quantity, size }) {
  return {
    shirt: shirt,
    quantity: quantity,
    size: size,
    $id: shirt.$id + '-' + size, //a unique ID for the shopping cart
  };
}
