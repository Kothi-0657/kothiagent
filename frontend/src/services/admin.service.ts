import api from "./api";

// -------- QUOTATIONS --------
export const getAllQuotationsAdmin = async () => {
  const res = await api.get("/api/admin/quotations");
  return res.data.data;
};

export const deleteQuotationAdmin = async (id: number) => {
  return api.delete(`/api/admin/quotations/${id}`);
};

// -------- USERS --------
export const getAllUsersAdmin = async () => {
  const res = await api.get("/api/admin/users");
  return res.data.data;
};

export const toggleUserStatusAdmin = async (
  id: number,
  active: boolean
) => {
  return api.patch(`/api/admin/users/${id}/status`, { active });
};

export const deleteUserAdmin = async (id: number) => {
  return api.delete(`/api/admin/users/${id}`);
};
