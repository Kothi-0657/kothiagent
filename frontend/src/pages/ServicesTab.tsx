import React, { useEffect, useState } from "react";
import axios from "axios";

/* -------------------- TYPES -------------------- */
type Service = {
  item_code: string;
  service_name: string;
  bangalore: number | null;
  chennai: number | null;
  pune: number | null;
  mumbai: number | null;
  hyderabad: number | null;
  delhi: number | null;
  description: string | null;
};

type City =
  | "bangalore"
  | "chennai"
  | "pune"
  | "mumbai"
  | "hyderabad"
  | "delhi";

/* -------------------- COMPONENT -------------------- */
const ServicesTab: React.FC = () => {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState<City>("bangalore");

  /* -------------------- SEARCH -------------------- */
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "http://localhost:4000/api/services/search",
        { params: { q: query } }
      );

      const rows = Array.isArray(res.data?.data) ? res.data.data : [];
      setServices(rows);
    } catch (err) {
      console.error("Error searching services:", err);
      setError("Failed to search services");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- ENTER KEY SUPPORT -------------------- */
  useEffect(() => {
    const onEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSearch();
    };
    window.addEventListener("keydown", onEnter);
    return () => window.removeEventListener("keydown", onEnter);
  }, [query]);

  /* -------------------- RENDER -------------------- */
  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ marginBottom: 10 }}>🔍 Services Search</h3>

      {/* SEARCH BAR */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search (LED, cleaning, painting...)"
          style={{
            padding: 8,
            flex: 1,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value as City)}
          style={{ padding: 8, borderRadius: 6 }}
        >
          <option value="bangalore">Bangalore</option>
          <option value="chennai">Chennai</option>
          <option value="pune">Pune</option>
          <option value="mumbai">Mumbai</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="delhi">Delhi</option>
        </select>

        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading services...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* RESULTS */}
      {services.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr style={{ background: "#d28b33ff" }}>
                <th style={th}>Code</th>
                <th style={th}>Service</th>
                <th style={th}>Price ({city})</th>
                <th style={th}>Description</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.item_code}>
                  <td style={td}>{s.item_code}</td>
                  <td style={{ ...td, fontWeight: 500 }}>
                    {s.service_name}
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>
                    ₹{(s[city] ?? 0).toLocaleString()}
                  </td>
                  <td style={{ ...td, color: "#555" }}>
                    {s.description || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No services found</p>
      )}
    </div>
  );
};

/* -------------------- STYLES -------------------- */
const th: React.CSSProperties = {
  textAlign: "left",
  padding: 8,
  borderBottom: "1px solid #030000ff",
};

const td: React.CSSProperties = {
  padding: 8,
  borderBottom: "1px solid #060000ff",
  verticalAlign: "top",
};

export default ServicesTab;
