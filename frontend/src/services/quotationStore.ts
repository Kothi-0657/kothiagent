import api from "./api";

// Save quotation to backend
export const saveQuotationToDB = async (quotation: any, agentId: number) => {
  try {
    console.log("📤 Sending quotation:", quotation);

    // Calculate total from items
    const total_amount = quotation.items?.reduce(
      (sum: number, item: any) =>
        sum + item.quantity * item.rate * (1 + (item.gstPercent || 0) / 100),
      0
    );

    const res = await api.post("/quotations", {
      agentId,
      client_name: quotation.clientName,
      client_code: quotation.clientCode,
      items: Array.isArray(quotation.items) ? quotation.items : [],
      total_amount,
      project_location: quotation.projectLocation || null,
      project_type: quotation.projectType || null,
      deprecated_assessment_type: quotation.deprecatedAssessmentType || null,
    });

    console.log("✅ Quotation saved successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error(
      "❌ Error saving quotation:",
      error.response?.data || error.message
    );
    throw error; // important so UI catch works
  }
};

// Fetch quotations of an agent
export const getAgentQuotations = async (agentId: number) => {
  const res = await api.get(`/quotations/agent/${agentId}`);
  return res.data;
};

// Fetch single quotation by ID
export const getQuotationById = async (id: number) => {
  const res = await api.get(`/quotations/${id}`);
  return res.data;
};
