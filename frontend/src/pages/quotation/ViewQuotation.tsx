import React, { useEffect, useState } from "react";
import { getAgentQuotations } from "../../services/quotationStore";
import { Quotation } from "../../types/quotation";

interface ViewQuotationsProps {
  agentId: number;
  onEdit?: (quotation: Quotation) => void;
}

const ViewQuotations: React.FC<ViewQuotationsProps> = ({ agentId, onEdit }) => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agentId) fetchQuotations();
  }, [agentId]);

  const fetchQuotations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAgentQuotations(agentId);
      // ✅ map snake_case to camelCase
      const mapped = (data?.quotations || []).map((q: any) => ({
        ...q,
        clientName: q.client_name,
        clientCode: q.client_code,
        projectLocation: q.project_location,
        projectType: q.project_type,
        totalAmount: q.total_amount,
      }));
      setQuotations(mapped);
    } catch (err) {
      console.error("Error fetching quotations:", err);
      setError("Failed to load quotations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading quotations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (quotations.length === 0) return <p>No quotations found.</p>;

  return (
    <div>
      <h3 style={{ marginBottom: 15 }}>Old Quotations</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {quotations.map((q) => (
          <li
            key={q.id}
            style={{
              marginBottom: 15,
              padding: 15,
              border: "1px solid #090101ff",
              borderRadius: 8,
              cursor: onEdit ? "pointer" : "default",
              backgroundColor: "#cc905bff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.1s, box-shadow 0.2s",
            }}
            onClick={() => onEdit && onEdit(q)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLLIElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLLIElement).style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLLIElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLLIElement).style.boxShadow =
                "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <strong>{q.clientName || "Unnamed Client"}</strong> — ₹{q.totalAmount?.toLocaleString() || "0"} <br />
            Project: {q.projectType || "-"} <br />
            Location: {q.projectLocation || "-"} <br />
            Created: {q.created_at ? new Date(q.created_at).toLocaleString() : "-"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewQuotations;
