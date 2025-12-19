"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const QuotationForm = ({ quotation, setQuotation }) => {
    const addItem = () => {
        const newItem = {
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
    const updateItem = (id, field, value) => {
        setQuotation({
            ...quotation,
            items: quotation.items.map(item => item.id === id ? { ...item, [field]: value } : item),
        });
    };
    return (react_1.default.createElement("div", { className: "glass-card", style: { padding: 20 } },
        react_1.default.createElement("h2", null, "Create Quotation"),
        react_1.default.createElement("input", { placeholder: "Client Name", value: quotation.clientName || "", onChange: e => setQuotation({ ...quotation, clientName: e.target.value }) }),
        react_1.default.createElement("input", { placeholder: "Project Location", value: quotation.projectLocation || "", onChange: e => setQuotation({ ...quotation, projectLocation: e.target.value }) }),
        react_1.default.createElement("input", { placeholder: "Project Type", value: quotation.projectType || "", onChange: e => setQuotation({ ...quotation, projectType: e.target.value }) }),
        react_1.default.createElement("input", { placeholder: "Client Code", value: quotation.clientCode || "", onChange: e => setQuotation({ ...quotation, clientCode: e.target.value }) }),
        react_1.default.createElement("hr", { style: { margin: "20px 0" } }),
        quotation.items.map((item, index) => (react_1.default.createElement("div", { key: item.id, style: { marginBottom: 15, padding: 10, border: "1px solid #ccc", borderRadius: 8 } },
            react_1.default.createElement("strong", null,
                "Item ",
                index + 1),
            react_1.default.createElement("input", { placeholder: "Area", value: item.area, onChange: e => updateItem(item.id, "area", e.target.value) }),
            react_1.default.createElement("input", { placeholder: "Service", value: item.service, onChange: e => updateItem(item.id, "service", e.target.value) }),
            react_1.default.createElement("input", { placeholder: "Description", value: item.description, onChange: e => updateItem(item.id, "description", e.target.value) }),
            react_1.default.createElement("input", { type: "number", placeholder: "Quantity", value: item.quantity || "", onChange: e => updateItem(item.id, "quantity", Number(e.target.value)) }),
            react_1.default.createElement("input", { type: "number", placeholder: "Rate", value: item.rate || "", onChange: e => updateItem(item.id, "rate", Number(e.target.value)) }),
            react_1.default.createElement("input", { type: "number", placeholder: "GST %", value: item.gstPercent || "", onChange: e => updateItem(item.id, "gstPercent", Number(e.target.value)) })))),
        react_1.default.createElement("button", { type: "button", onClick: addItem, style: { marginTop: 10 } }, "\u2795 Add Item")));
};
exports.default = QuotationForm;
