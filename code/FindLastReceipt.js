import transaction from 'transaction';
// FindLastReceipt
export default function () {
  //look up last receipt from viv cloud
  return transaction.retrieve('example.shirt.Receipt', 'ALL', 1);
}
