import React from "react";

function ModernTemplate({ invoice }) {
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
    <div className="max-w-4xl mx-auto bg-[var(--invoice-bg)] p-12 shadow-xl">
      {/* Header with Logo and Invoice Title */}
      <div className="flex justify-between items-start mb-10">
        <div>
          {invoice.logo && (
            <img
              src={invoice.logo}
              alt="Company Logo"
              className="h-16 w-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-5xl font-bold text-[var(--invoice-primary)]">
            INVOICE
          </h1>
        </div>
        <div className="text-right">
          <div className="bg-[var(--invoice-primary)] text-white px-4 py-2 rounded-lg inline-block mb-2">
            <span className="text-sm font-medium">Invoice #</span>
            <div className="text-lg font-bold">{invoice.invoiceNumber}</div>
          </div>
        </div>
      </div>

      {/* From and Bill To Section */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* From */}
        <div className="bg-[var(--invoice-card-from)] p-6 rounded-lg border border-[var(--invoice-border)]">
          <h3 className="text-sm font-semibold text-[var(--invoice-primary)] uppercase tracking-wide mb-3">
            From
          </h3>
          <p className="font-bold text-[var(--invoice-text-primary)] text-lg mb-1">
            {invoice.from.name}
          </p>
          <p className="text-[var(--invoice-text-secondary)] whitespace-pre-line">
            {invoice.from.address}
          </p>
        </div>

        {/* Bill To */}
        <div className="bg-[var(--invoice-card-bill)] p-6 rounded-lg border border-[var(--invoice-border)]">
          <h3 className="text-sm font-semibold text-[var(--invoice-text-primary)] uppercase tracking-wide mb-3">
            Bill To
          </h3>
          <p className="text-[var(--invoice-text-primary)] whitespace-pre-line">
            {invoice.billing.billTo}
          </p>
          {invoice.billing.shipTo && invoice.billing.shipTo !== "Optional" && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-[var(--invoice-text-muted)] uppercase mb-1">
                Ship To
              </h4>
              <p className="text-[var(--invoice-text-secondary)] text-sm whitespace-pre-line">
                {invoice.billing.shipTo}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="bg-[var(--invoice-detail-bg)] border-l-4 border-[var(--invoice-primary)] pl-4 py-2 rounded">
          <p className="text-xs text-[var(--invoice-text-muted)] uppercase tracking-wide">
            Date
          </p>
          <p className="font-semibold text-[var(--invoice-text-primary)]">
            {invoice.date}
          </p>
        </div>
        <div className="bg-[var(--invoice-detail-bg)] border-l-4 border-[var(--invoice-primary)] pl-4 py-2 rounded">
          <p className="text-xs text-[var(--invoice-text-muted)] uppercase tracking-wide">
            Payment Terms
          </p>
          <p className="font-semibold text-[var(--invoice-text-primary)]">
            {invoice.paymentTerms}
          </p>
        </div>
        <div className="bg-[var(--invoice-detail-bg)] border-l-4 border-[var(--invoice-primary)] pl-4 py-2 rounded">
          <p className="text-xs text-[var(--invoice-text-muted)] uppercase tracking-wide">
            Due Date
          </p>
          <p className="font-semibold text-[var(--invoice-text-primary)]">
            {invoice.dueDate}
          </p>
        </div>
        {invoice.poNumber && (
          <div className="bg-[var(--invoice-detail-bg)] border-l-4 border-[var(--invoice-primary)] pl-4 py-2 rounded">
            <p className="text-xs text-[var(--invoice-text-muted)] uppercase tracking-wide">
              PO Number
            </p>
            <p className="font-semibold text-[var(--invoice-text-primary)]">
              {invoice.poNumber}
            </p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="mb-10">
        <div className="bg-[var(--invoice-primary)] text-white rounded-t-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 font-semibold text-sm">
            <div className="col-span-6">DESCRIPTION</div>
            <div className="col-span-2 text-right">RATE</div>
            <div className="col-span-2 text-right">QTY</div>
            <div className="col-span-2 text-right">AMOUNT</div>
          </div>
        </div>

        <div className="border-x border-b border-[var(--invoice-border)] rounded-b-lg overflow-hidden bg-[var(--invoice-table-bg)]">
          {invoice.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--invoice-border-light)] last:border-0 hover:bg-[var(--invoice-table-hover)] transition-colors"
            >
              <div className="col-span-6 text-[var(--invoice-text-primary)]">
                {item.description}
              </div>
              <div className="col-span-2 text-right text-[var(--invoice-text-secondary)]">
                ${item.rate.toFixed(2)}
              </div>
              <div className="col-span-2 text-right text-[var(--invoice-text-secondary)]">
                {item.quantity}
              </div>
              <div className="col-span-2 text-right font-semibold text-[var(--invoice-text-primary)]">
                ${(item.rate * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end mb-10">
        <div className="w-80">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-[var(--invoice-border)]">
              <span className="text-[var(--invoice-text-secondary)]">
                Subtotal:
              </span>
              <span className="font-semibold text-[var(--invoice-text-primary)]">
                ${calculateSubtotal().toFixed(2)}
              </span>
            </div>

            {invoice.additionalRules.tax > 0 && (
              <div className="flex justify-between py-2 border-b border-[var(--invoice-border)]">
                <span className="text-[var(--invoice-text-secondary)]">
                  Tax ({invoice.additionalRules.tax}%):
                </span>
                <span className="font-semibold text-[var(--invoice-text-primary)]">
                  $
                  {(
                    (calculateSubtotal() * invoice.additionalRules.tax) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
            )}

            {invoice.additionalRules.discounts > 0 && (
              <div className="flex justify-between py-2 border-b border-[var(--invoice-border)]">
                <span className="text-[var(--invoice-text-secondary)]">
                  Discount ({invoice.additionalRules.discounts}%):
                </span>
                <span className="font-semibold text-[var(--invoice-accent-negative)]">
                  -$
                  {(
                    (calculateSubtotal() * invoice.additionalRules.discounts) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
            )}

            {invoice.additionalRules.shipping > 0 && (
              <div className="flex justify-between py-2 border-b border-[var(--invoice-border)]">
                <span className="text-[var(--invoice-text-secondary)]">
                  Shipping:
                </span>
                <span className="font-semibold text-[var(--invoice-text-primary)]">
                  ${invoice.additionalRules.shipping.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between py-3 bg-[var(--invoice-primary)] text-white px-4 rounded-lg">
              <span className="font-bold text-lg">TOTAL:</span>
              <span className="font-bold text-lg">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>

            {invoice.amountPaid > 0 && (
              <>
                <div className="flex justify-between py-2 border-b border-[var(--invoice-border)]">
                  <span className="text-[var(--invoice-text-secondary)]">
                    Amount Paid:
                  </span>
                  <span className="font-semibold text-[var(--invoice-accent-positive)]">
                    ${invoice.amountPaid.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-3 bg-[var(--invoice-accent-positive)] text-white px-4 rounded-lg">
                  <span className="font-bold text-lg">BALANCE DUE:</span>
                  <span className="font-bold text-lg">
                    ${calculateBalance().toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="grid grid-cols-2 gap-8">
        {invoice.notes && (
          <div className="bg-[var(--invoice-note-bg)] p-6 rounded-lg border-l-4 border-[var(--invoice-note-accent)]">
            <h3 className="font-semibold text-[var(--invoice-text-primary)] mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[var(--invoice-note-accent)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
              Notes
            </h3>
            <p className="text-[var(--invoice-text-secondary)] text-sm whitespace-pre-line">
              {invoice.notes}
            </p>
          </div>
        )}

        {invoice.terms && (
          <div className="bg-[var(--invoice-terms-bg)] p-6 rounded-lg border-l-4 border-[var(--invoice-terms-accent)]">
            <h3 className="font-semibold text-[var(--invoice-text-primary)] mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[var(--invoice-terms-accent)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z"
                  clipRule="evenodd"
                />
              </svg>
              Terms & Conditions
            </h3>
            <p className="text-[var(--invoice-text-secondary)] text-sm whitespace-pre-line">
              {invoice.terms}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModernTemplate;
