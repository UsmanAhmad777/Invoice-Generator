import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Invoice() {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    logo: "",
    date: "",
    paymentTerms: "",
    dueDate: "",
    poNumber: "",
    from: { name: "", address: "" },
    billing: { billTo: "", shipTo: "Optional" },
    items: [{ description: "", rate: 0, quantity: 1 }],
    additionalRules: { tax: 0, discounts: 0, shipping: 0 },

    amountPaid: 0,

    notes: "",
    terms: "",
  });

  // ============================================
  // STEP 1: Handle basic invoice field updates
  // ============================================

  const handleFieldChange = (field, value) => {
    setInvoice({ ...invoice, [field]: value });
  };

  // ============================================
  // STEP 2: Handle nested object updates (from, billing, additionalRules)
  // ============================================

  const handleNestedChange = (parent, field, value) => {
    setInvoice({
      ...invoice,
      [parent]: { ...invoice[parent], [field]: value },
    });
  };

  // ============================================
  // STEP 3: Handle item array updates
  // ============================================

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoice({ ...invoice, items: updatedItems });
  };

  // ============================================
  // STEP 4: Add new item row
  // ============================================

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", rate: 0, quantity: 1 }],
    });
  };

  // ============================================
  // STEP 5: Remove item row
  // ============================================

  const removeItem = (index) => {
    const updatedItems = invoice.items.filter((item, i) => {
      return i !== index;
    });
    setInvoice({ ...invoice, items: updatedItems });
  };

  // ============================================
  // STEP 6: Calculate totals
  // ============================================
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
    <div className="min-h-screen bg-body py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* ============================================ */}
        {/* SECTION 1: Invoice Header */}
        {/* ============================================ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Create Invoice
          </h1>
          {/* ============================================ */}
          {/* Logo Upload Section */}
          {/* ============================================ */}
          <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex items-center gap-4">
              {/* Logo Preview */}
              {invoice.logo && (
                <div className="flex-shrink-0">
                  <img
                    src={invoice.logo}
                    alt="Company Logo"
                    className="h-20 w-20 object-contain border border-gray-200 rounded p-1 bg-white"
                  />
                </div>
              )}

              {/* Upload Button */}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  id="logo-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        handleFieldChange("logo", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="logo-upload"
                  className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {invoice.logo ? "Change Logo" : "Upload Logo"}
                </label>

                {/* Remove Logo Button */}
                {invoice.logo && (
                  <button
                    onClick={() => handleSimpleFieldChange("logo", "")}
                    className="ml-2 px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Recommended: PNG or JPG, max 2MB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) =>
                  handleFieldChange("invoiceNumber", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="INV-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => handleFieldChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Terms
              </label>
              <input
                type="text"
                value={invoice.paymentTerms}
                onChange={(e) =>
                  handleFieldChange("paymentTerms", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Net 30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PO Number (Optional)
              </label>
              <input
                type="text"
                value={invoice.poNumber}
                onChange={(e) => handleFieldChange("poNumber", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PO-12345"
              />
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: From & Billing Information */}
        {/* ============================================ */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">From</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={invoice.from.name}
                  onChange={(e) =>
                    handleNestedChange("from", "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={invoice.from.address}
                  onChange={(e) =>
                    handleNestedChange("from", "address", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="123 Business St, City, State 12345"
                />
              </div>
            </div>
          </div>

          {/* Billing Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Billing
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bill To
                </label>
                <textarea
                  value={invoice.billing.billTo}
                  onChange={(e) =>
                    handleNestedChange("billing", "billTo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Client Name & Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ship To (Optional)
                </label>
                <textarea
                  value={invoice.billing.shipTo}
                  onChange={(e) =>
                    handleNestedChange("billing", "shipTo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Shipping Address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: Items List */}
        {/* ============================================ */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Items</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-100 grid grid-cols-12 gap-2 p-3 font-medium text-sm text-gray-700">
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Rate</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-1"></div>
            </div>

            {/* Item Rows */}
            {invoice.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 p-3 border-t border-gray-200 items-center"
              >
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "rate",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 1,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>
                <div className="col-span-2 text-gray-800 font-medium">
                  ${(item.rate * item.quantity).toFixed(2)}
                </div>
                <div className="col-span-1 text-center">
                  {invoice.items.length > 1 && (
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Item Button */}
          <button
            onClick={addItem}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Item
          </button>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: Additional Rules & Totals */}
        {/* ============================================ */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Additional Rules */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Additional Charges
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax (%)
              </label>
              <input
                type="number"
                value={invoice.additionalRules.tax}
                onChange={(e) =>
                  handleNestedChange(
                    "additionalRules",
                    "tax",
                    parseFloat(e.target.value) || 0,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={invoice.additionalRules.discounts}
                onChange={(e) =>
                  handleNestedChange(
                    "additionalRules",
                    "discounts",
                    parseFloat(e.target.value) || 0,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping ($)
              </label>
              <input
                type="number"
                value={invoice.additionalRules.shipping}
                onChange={(e) =>
                  handleNestedChange(
                    "additionalRules",
                    "shipping",
                    parseFloat(e.target.value) || 0,
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Tax ({invoice.additionalRules.tax}%):
                </span>
                <span className="font-medium">
                  $
                  {(
                    (calculateSubtotal() * invoice.additionalRules.tax) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Discount ({invoice.additionalRules.discounts}%):
                </span>
                <span className="font-medium text-red-600">
                  -$
                  {(
                    (calculateSubtotal() * invoice.additionalRules.discounts) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">
                  ${invoice.additionalRules.shipping.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              {/* Amount Paid */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Paid
                </label>
                <input
                  type="number"
                  value={invoice.amountPaid}
                  onChange={(e) =>
                    handleFieldChange(
                      "amountPaid",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-xl">
                <span>Balance Due:</span>
                <span className="text-green-600">
                  ${calculateBalance().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: Notes & Terms */}
        {/* ============================================ */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={invoice.notes}
              onChange={(e) => handleFieldChange("notes", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Thank you for your business!"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Terms & Conditions
            </label>
            <textarea
              value={invoice.terms}
              onChange={(e) => handleFieldChange("terms", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Payment terms and conditions"
            />
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: Action Buttons */}
        {/* ============================================ */}
        <div className="flex gap-3">
          {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            Save Invoice
          </button> */}
          <button
            onClick={() => navigate("/preview", { state: { invoice } })}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
export default Invoice;
