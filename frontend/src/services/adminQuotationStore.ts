import api from "./api";

// Fetch all quotations
export const getAdminQuotations = async () => {
  const res = await api.get("/admin/quotations");
  return res.data.data;
};

// Fetch single quotation
export const getQuotationById = async (id: number) => {
  const res = await api.get(`/admin/quotations/${id}`);
  return res.data.data;
};

// Delete quotation
export const deleteQuotation = async (id: number) => {
  const res = await api.delete(`/admin/quotations/${id}`);
  return res.data;
};

// Create quotation
export const createQuotation = async (data: any) => {
  const res = await api.post("/admin/quotations", data);
  return res.data.data;
};

// Update quotation
export const updateQuotation = async (id: number, data: any) => {
  const res = await api.put(`/admin/quotations/${id}`, data);
  return res.data.data;
};
