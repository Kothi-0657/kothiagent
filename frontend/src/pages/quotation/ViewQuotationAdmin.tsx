// src/pages/admin/ViewQuotationsAdmin.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminQuotations, deleteQuotation } from "../../services/adminQuotationStore";
import { Quotation } from "../../types/quotation";

const ViewQuotationsAdmin: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminQuotations();
      let mapped = (data || []).map((q: any) => ({
        id: Number(q.id),
        clientName: q.client_name,
        clientCode: q.client_code,
        projectLocation: q.project_location,
        projectType: q.project_type,
        totalAmount: q.total_amount,
        agentName: q.agent_name,
        created_at: q.created_at,
        items: q.items || [],
      }));
            setQuotations(mapped);
    } catch (err) {
      console.error("Error fetching quotations:", err);
      setError("Failed to load quotations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (q: Quotation) => {
    navigate(`/admin/quotation/edit/${q.id}`);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this quotation?")) return;
    try {
      await deleteQuotation(id);
      setQuotations(quotations.filter((q) => Number(q.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete quotation.");
    }
  };

  if (loading) return <p>Loading quotations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (quotations.length === 0) return <p>No quotations found.</p>;

  return (
    <div>
      <h2>All Quotations (Admin)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {quotations.map((q) => (
          <li
            key={q.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              marginBottom: 10,
              border: "1px solid #ccc",
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <div onClick={() => handleEdit(q)} style={{ flex: 1 }}>
              <strong>{q.clientName}</strong> — ₹{q.totalAmount.toLocaleString()} <br />
              Project: {q.projectType} <br />
              Location: {q.projectLocation} <br />
              Agent: {q.agentName} <br />
              Created: {q.created_at ? new Date(q.created_at).toLocaleString() : "-"}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleEdit(q)} style={buttonStyle}>Edit</button>
              <button onClick={() => handleDelete(Number(q.id))} style={buttonStyle}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 6,
  border: "none",
  backgroundColor: "#0b051e",
  color: "#fff",
  cursor: "pointer",
};

export default ViewQuotationsAdmin;
