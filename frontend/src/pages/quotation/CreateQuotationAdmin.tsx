// src/pages/admin/CreateEditQuotationAdmin.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuotationForm from "../../components/QuotationForm";
import QuotePreview from "../../components/QuotePreview";
import { Quotation } from "../../types/quotation";
import { getQuotationById, createQuotation, updateQuotation } from "../../services/adminQuotationStore";

const CreateEditQuotationAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quotation, setQuotation] = useState<Quotation>({
    id: "",
    agentName: "",
    clientName: "",
    clientCode: "",
    projectLocation: "",
    projectType: "",
    items: [],
    totalAmount: 0,
    created_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(() => {
    if (id) fetchQuotation(id);
  }, [id]);

  const fetchQuotation = async (quotationId: string) => {
    setLoading(true);
    try {
      const data = await getQuotationById(Number(quotationId));
      // set the fetched quotation directly (API returns the expected shape)
      setQuotation(data as Quotation);
    } catch (err) {
      console.error("Failed to load quotation:", err);
      alert("Failed to load quotation for editing.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading quotation...</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <QuotationForm quotation={quotation} setQuotation={setQuotation} />
      <QuotePreview quotation={quotation} />
    </div>
  );
};

export default CreateEditQuotationAdmin;
