import React from "react";
import { Quotation, QuotationItem } from "../types/quotation";

interface Props {
  quotation: Quotation;
  setQuotation: React.Dispatch<React.SetStateAction<Quotation>>;
}

const QuotationForm: React.FC<Props> = ({ quotation, setQuotation }) => {
  const addItem = () => {
    const newItem: QuotationItem = {
      id: crypto.randomUUID(),
      area: "",
      service: "",
      description: "",
      quantity: 0,
      rate: 0,
      gstPercent: 0,
    };

    setQuotation({
      ...quotation,
      items: [...quotation.items, newItem],
    });
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setQuotation({
      ...quotation,
      items: quotation.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h2>Create Quotation</h2>

      {/* Quotation Info */}
      <input
        placeholder="Client Name"
        value={quotation.clientName || ""}
        onChange={e => setQuotation({ ...quotation, clientName: e.target.value })}
      />

      <input
        placeholder="Project Location"
        value={quotation.projectLocation || ""}
        onChange={e =>
          setQuotation({ ...quotation, projectLocation: e.target.value })
        }
      />

      <input
        placeholder="Project Type"
        value={quotation.projectType || ""}
        onChange={e =>
          setQuotation({ ...quotation, projectType: e.target.value })
        }
      />

      <input
        placeholder="Client Code"
        value={quotation.clientCode || ""}
        onChange={e =>
          setQuotation({ ...quotation, clientCode: e.target.value })
        }
      />

      <hr style={{ margin: "20px 0" }} />

      {/* Quotation Items */}
      {quotation.items.map((item, index) => (
        <div key={item.id} style={{ marginBottom: 15, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          <strong>Item {index + 1}</strong>

          <input
            placeholder="Area"
            value={item.area}
            onChange={e => updateItem(item.id, "area", e.target.value)}
          />

          <input
            placeholder="Service"
            value={item.service}
            onChange={e => updateItem(item.id, "service", e.target.value)}
          />

          <input
            placeholder="Description"
            value={item.description}
            onChange={e => updateItem(item.id, "description", e.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity || ""}
            onChange={e => updateItem(item.id, "quantity", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Rate"
            value={item.rate || ""}
            onChange={e => updateItem(item.id, "rate", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="GST %"
            value={item.gstPercent || ""}
            onChange={e => updateItem(item.id, "gstPercent", Number(e.target.value))}
          />
        </div>
      ))}

      <button type="button" onClick={addItem} style={{ marginTop: 10 }}>
        ➕ Add Item
      </button>
    </div>
  );
};
export default QuotationForm;
