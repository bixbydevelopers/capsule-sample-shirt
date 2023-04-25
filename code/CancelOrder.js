//CancelOrder
export default function ({ order }) {
  return {
    order: order,
    orderState: 'Cancelled',
  };
}
