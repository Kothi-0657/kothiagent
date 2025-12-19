// src/pages/quotation/CreateQuotation.tsx
import React, { useEffect, useState } from "react";
import QuotationForm from "../../components/QuotationForm";
import QuotePreview from "../../components/QuotePreview";
import { Quotation } from "../../types/quotation";

interface CreateQuotationProps {
  quotationToEdit?: Quotation; // optional prop for editing
}

const CreateQuotation: React.FC<CreateQuotationProps> = ({ quotationToEdit }) => {
  const [quotation, setQuotation] = useState<Quotation>({
    id: "",
    agentName: "",
    clientName: "",
    clientCode: "", // ✅
    projectLocation: "",
    projectType: "",
    items: [],
    totalAmount: 0,
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (quotationToEdit) {
      setQuotation({
        ...quotationToEdit,
        // Ensure id exists for editing
        id: (quotationToEdit as Quotation).id || (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : ""),
        // provide safe defaults if any fields are missing
        agentName: quotationToEdit.agentName ?? "",
        totalAmount: quotationToEdit.totalAmount ?? 0,
        created_at: quotationToEdit.created_at ?? new Date().toISOString(),
      });
    }
  }, [quotationToEdit]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <QuotationForm quotation={quotation} setQuotation={setQuotation} />
      <QuotePreview quotation={quotation} />
    </div>
  );
};

export default CreateQuotation;
