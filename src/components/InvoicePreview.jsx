import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import { useReactToPrint } from "react-to-print";

function InvoicePreview() {
  const { state } = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const componentRef = useRef();
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
  };

  const TemplateComponent = templates[selectedTemplate];

  // Handle PDF export
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice-${state.invoice.invoiceNumber || "draft"}`,
  });

  return (
    <div>
      {/* Template Selector */}
      <div className="bg-grayy p-4 flex justify-between">
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="px-4 py-2 border rounded bg-grayy"
        >
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
        </select>

        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Export as PDF
        </button>
      </div>

      {/* Add key prop here to force complete re-render */}
      <div ref={componentRef} className="my-20">
        <TemplateComponent
          key={selectedTemplate} // ← THIS FIXES IT
          invoice={state.invoice}
        />
      </div>
    </div>
  );
}
export default InvoicePreview;
