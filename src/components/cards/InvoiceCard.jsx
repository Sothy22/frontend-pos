import React, { forwardRef } from 'react';

const InvoiceCard = forwardRef(function InvoiceCard({ data }, ref) {
  const items = data?.items ?? [];

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0,
  );

  const discount = data?.discount ?? 0;
  const total = subtotal - discount;
  const amountPaid = data?.amountPaid ?? total;
  const change = Math.max(0, amountPaid - total);

  const money = (amount) => `$${Number(amount).toFixed(2)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Print button */}
      <div className="no-print mx-auto mb-6 flex max-w-3xl justify-end">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-lg bg-blue-600
            px-5 py-3 font-semibold text-white shadow
            hover:bg-blue-700"
        >
          <span>🖨️</span>
          Print Invoice
        </button>
      </div>

      {/* Invoice */}
      <div
        ref={ref}
        id="invoice"
        className="invoice mx-auto max-w-3xl rounded-xl
          bg-white p-6 shadow-lg md:p-10"
      >
        {/* Shop information */}
        <div className="border-b-2 border-gray-800 pb-5 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {data.shopName || 'Phone Shop'}
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {data.address || 'Phnom Penh, Cambodia'}
          </p>

          <p className="text-sm text-gray-600">
            Tel: {data.phone || '012 345 678'}
          </p>

          <h2 className="mt-5 text-xl font-bold tracking-widest">
            SALES INVOICE
          </h2>
        </div>

        {/* Invoice details */}
        <div className="grid grid-cols-1 gap-3 py-5 text-sm sm:grid-cols-2">
          <p>
            <span className="font-semibold">Invoice No:</span> {data.invoiceNo}
          </p>

          <p>
            <span className="font-semibold">Date:</span>{' '}
            {new Date(data.date || Date.now()).toLocaleString()}
          </p>

          <p>
            <span className="font-semibold">Customer:</span>{' '}
            {data.customerName || 'Walk-in Customer'}
          </p>

          <p>
            <span className="font-semibold">Cashier:</span>{' '}
            {data.cashier || 'Admin'}
          </p>
        </div>

        {/* Products */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3">Product</th>
                <th className="border border-gray-300 p-3 text-center">Qty</th>
                <th className="border border-gray-300 p-3 text-right">Price</th>
                <th className="border border-gray-300 p-3 text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={item.id ?? index}>
                  <td className="border border-gray-300 p-3">{item.name}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    {item.qty}
                  </td>
                  <td className="whitespace-nowrap border border-gray-300 p-3 text-right">
                    {money(item.price)}
                  </td>
                  <td className="whitespace-nowrap border border-gray-300 p-3 text-right">
                    {money(Number(item.price) * Number(item.qty))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment summary */}
        <div className="ml-auto mt-6 w-full space-y-3 sm:w-72">
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{money(subtotal)}</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium">-{money(discount)}</span>
          </div>

          <div className="flex justify-between gap-4 border-t-2 border-gray-800 pt-3 text-lg font-bold">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium">{data?.paymentMethod || 'Cash'}</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-medium">{money(amountPaid)}</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-600">Change</span>
            <span className="font-medium">{money(change)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-dashed border-gray-400 pt-5 text-center">
          <p className="font-semibold">Thank you for shopping with us!</p>
          <p className="mt-1 text-xs text-gray-500">
            Please keep this invoice for your records.
          </p>
        </div>
      </div>
    </div>
  );
});

export default InvoiceCard;
