import React from "react";

function ClassicTemplate({ invoice }) {
  // Calculate totals
  const calculateSubtotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.rate * item.quantity,
      0,
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = (subtotal * invoice.additionalRules.tax) / 100;
    const discount = (subtotal * invoice.additionalRules.discounts) / 100;
    return subtotal + tax - discount + invoice.additionalRules.shipping;
  };

  const calculateBalance = () => {
    return calculateTotal() - invoice.amountPaid;
  };

  return (
    <div className="max-w-4xl mx-auto bg-[var(--invoice-bg)] p-12 shadow-2xl border-4 border-[var(--invoice-text-primary)]">
      {/* Classic Header */}
      <div className="border-b-4 border-[var(--invoice-text-primary)] pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            {invoice.logo && (
              <img
                src={invoice.logo}
                alt="Company Logo"
                className="h-20 w-auto mb-4 object-contain border-2 border-[var(--invoice-text-primary)] p-2"
              />
            )}
            <div className="border-2 border-[var(--invoice-text-primary)] p-3 inline-block bg-[var(--invoice-text-primary)] text-[var(--invoice-bg)]">
              <h1 className="text-4xl font-bold font-serif">INVOICE</h1>
            </div>
          </div>
          <div className="text-right border-2 border-[var(--invoice-text-primary)] p-4 bg-[var(--invoice-detail-bg)]">
            <p className="text-sm font-semibold mb-1 text-[var(--invoice-text-primary)]">
              INVOICE NUMBER
            </p>
            <p className="text-2xl font-bold font-mono text-[var(--invoice-text-primary)]">
              {invoice.invoiceNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Company and Client Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* From */}
        <div className="border-2 border-[var(--invoice-text-primary)] p-6 bg-[var(--invoice-card-from)]">
          <div className="border-b-2 border-[var(--invoice-text-primary)] pb-2 mb-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--invoice-text-primary)]">
              FROM
            </h3>
          </div>
          <p className="font-bold text-lg mb-2 font-serif text-[var(--invoice-text-primary)]">
            {invoice.from.name}
          </p>
          <p className="text-[var(--invoice-text-secondary)] text-sm whitespace-pre-line leading-relaxed">
            {invoice.from.address}
          </p>
        </div>

        {/* Bill To */}
        <div className="border-2 border-[var(--invoice-text-primary)] p-6 bg-[var(--invoice-card-bill)]">
          <div className="border-b-2 border-[var(--invoice-text-primary)] pb-2 mb-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[var(--invoice-text-primary)]">
              BILL TO
            </h3>
          </div>
          <p className="text-[var(--invoice-text-primary)] text-sm whitespace-pre-line leading-relaxed">
            {invoice.billing.billTo}
          </p>
          {invoice.billing.shipTo && invoice.billing.shipTo !== "Optional" && (
            <div className="mt-4 pt-4 border-t border-[var(--invoice-border)]">
              <h4 className="font-bold text-xs uppercase mb-2 text-[var(--invoice-text-primary)]">
                SHIP TO
              </h4>
              <p className="text-[var(--invoice-text-secondary)] text-sm whitespace-pre-line">
                {invoice.billing.shipTo}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Details Table */}
      <table className="w-full mb-8 border-2 border-[var(--invoice-text-primary)]">
        <tbody>
          <tr className="bg-[var(--invoice-text-primary)] text-[var(--invoice-bg)]">
            <th className="border-r-2 border-[var(--invoice-bg)] p-3 text-left text-sm font-bold uppercase">
              Date
            </th>
            <th className="border-r-2 border-[var(--invoice-bg)] p-3 text-left text-sm font-bold uppercase">
              Payment Terms
            </th>
            <th className="border-r-2 border-[var(--invoice-bg)] p-3 text-left text-sm font-bold uppercase">
              Due Date
            </th>
            {invoice.poNumber && (
              <th className="p-3 text-left text-sm font-bold uppercase">
                PO Number
              </th>
            )}
          </tr>
          <tr className="bg-[var(--invoice-table-bg)]">
            <td className="border-r-2 border-[var(--invoice-text-primary)] p-3 font-mono text-[var(--invoice-text-primary)]">
              {invoice.date}
            </td>
            <td className="border-r-2 border-[var(--invoice-text-primary)] p-3 font-mono text-[var(--invoice-text-primary)]">
              {invoice.paymentTerms}
            </td>
            <td className="border-r-2 border-[var(--invoice-text-primary)] p-3 font-mono text-[var(--invoice-text-primary)]">
              {invoice.dueDate}
            </td>
            {invoice.poNumber && (
              <td className="p-3 font-mono text-[var(--invoice-text-primary)]">
                {invoice.poNumber}
              </td>
            )}
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <table className="w-full mb-8 border-2 border-[var(--invoice-text-primary)]">
        <thead>
          <tr className="bg-[var(--invoice-text-primary)] text-[var(--invoice-bg)]">
            <th className="border-r-2 border-[var(--invoice-bg)] p-4 text-left text-sm font-bold uppercase w-1/2">
              Description
            </th>
            <th className="border-r-2 border-[var(--invoice-bg)] p-4 text-right text-sm font-bold uppercase">
              Rate
            </th>
            <th className="border-r-2 border-[var(--invoice-bg)] p-4 text-right text-sm font-bold uppercase">
              Quantity
            </th>
            <th className="p-4 text-right text-sm font-bold uppercase">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr
              key={index}
              className="border-t-2 border-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)]"
            >
              <td className="border-r-2 border-[var(--invoice-text-primary)] p-4 font-serif text-[var(--invoice-text-primary)]">
                {item.description}
              </td>
              <td className="border-r-2 border-[var(--invoice-text-primary)] p-4 text-right font-mono text-[var(--invoice-text-primary)]">
                ${item.rate.toFixed(2)}
              </td>
              <td className="border-r-2 border-[var(--invoice-text-primary)] p-4 text-right font-mono text-[var(--invoice-text-primary)]">
                {item.quantity}
              </td>
              <td className="p-4 text-right font-bold font-mono text-[var(--invoice-text-primary)]">
                ${(item.rate * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96 border-2 border-[var(--invoice-text-primary)]">
          <table className="w-full">
            <tbody>
              <tr className="border-b-2 border-[var(--invoice-text-primary)]">
                <td className="p-3 font-bold uppercase text-sm text-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)]">
                  Subtotal
                </td>
                <td className="p-3 text-right font-mono font-bold border-l-2 border-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)] text-[var(--invoice-text-primary)]">
                  ${calculateSubtotal().toFixed(2)}
                </td>
              </tr>

              {invoice.additionalRules.tax > 0 && (
                <tr className="border-b-2 border-[var(--invoice-text-primary)]">
                  <td className="p-3 font-bold uppercase text-sm text-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)]">
                    Tax ({invoice.additionalRules.tax}%)
                  </td>
                  <td className="p-3 text-right font-mono font-bold border-l-2 border-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)] text-[var(--invoice-text-primary)]">
                    $
                    {(
                      (calculateSubtotal() * invoice.additionalRules.tax) /
                      100
                    ).toFixed(2)}
                  </td>
                </tr>
              )}

              {invoice.additionalRules.discounts > 0 && (
                <tr className="border-b-2 border-[var(--invoice-text-primary)]">
                  <td className="p-3 font-bold uppercase text-sm text-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)]">
                    Discount ({invoice.additionalRules.discounts}%)
                  </td>
                  <td className="p-3 text-right font-mono font-bold border-l-2 border-[var(--invoice-text-primary)] text-[var(--invoice-accent-negative)] bg-[var(--invoice-table-bg)]">
                    -$
                    {(
                      (calculateSubtotal() *
                        invoice.additionalRules.discounts) /
                      100
                    ).toFixed(2)}
                  </td>
                </tr>
              )}

              {invoice.additionalRules.shipping > 0 && (
                <tr className="border-b-2 border-[var(--invoice-text-primary)]">
                  <td className="p-3 font-bold uppercase text-sm text-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)]">
                    Shipping
                  </td>
                  <td className="p-3 text-right font-mono font-bold border-l-2 border-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)] text-[var(--invoice-text-primary)]">
                    ${invoice.additionalRules.shipping.toFixed(2)}
                  </td>
                </tr>
              )}

              <tr className="bg-[var(--invoice-text-primary)] text-[var(--invoice-bg)]">
                <td className="p-4 font-bold uppercase text-lg">TOTAL</td>
                <td className="p-4 text-right font-mono font-bold text-xl border-l-2 border-[var(--invoice-bg)]">
                  ${calculateTotal().toFixed(2)}
                </td>
              </tr>

              {invoice.amountPaid > 0 && (
                <>
                  <tr className="border-b-2 border-[var(--invoice-text-primary)] bg-[var(--invoice-table-bg)]">
                    <td className="p-3 font-bold uppercase text-sm text-[var(--invoice-text-primary)]">
                      Amount Paid
                    </td>
                    <td className="p-3 text-right font-mono font-bold border-l-2 border-[var(--invoice-text-primary)] text-[var(--invoice-accent-positive)]">
                      ${invoice.amountPaid.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-[var(--invoice-text-secondary)] text-[var(--invoice-bg)]">
                    <td className="p-4 font-bold uppercase text-lg">
                      BALANCE DUE
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-xl border-l-2 border-[var(--invoice-bg)]">
                      ${calculateBalance().toFixed(2)}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="space-y-6">
        {invoice.notes && (
          <div className="border-2 border-[var(--invoice-text-primary)] p-6 bg-[var(--invoice-note-bg)]">
            <h3 className="font-bold text-sm uppercase tracking-widest border-b-2 border-[var(--invoice-text-primary)] pb-2 mb-3 text-[var(--invoice-text-primary)]">
              Notes
            </h3>
            <p className="text-[var(--invoice-text-primary)] text-sm leading-relaxed whitespace-pre-line font-serif">
              {invoice.notes}
            </p>
          </div>
        )}

        {invoice.terms && (
          <div className="border-2 border-[var(--invoice-text-primary)] p-6 bg-[var(--invoice-terms-bg)]">
            <h3 className="font-bold text-sm uppercase tracking-widest border-b-2 border-[var(--invoice-text-primary)] pb-2 mb-3 text-[var(--invoice-text-primary)]">
              Terms & Conditions
            </h3>
            <p className="text-[var(--invoice-text-primary)] text-sm leading-relaxed whitespace-pre-line font-serif">
              {invoice.terms}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-4 border-[var(--invoice-text-primary)] text-center">
        <p className="text-xs uppercase tracking-widest font-bold text-[var(--invoice-text-muted)]">
          Thank You For Your Business
        </p>
      </div>
    </div>
  );
}

export default ClassicTemplate;
