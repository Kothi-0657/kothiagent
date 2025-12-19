"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
/* -------------------- COMPONENT -------------------- */
const ServicesTab = () => {
    const [query, setQuery] = (0, react_1.useState)("");
    const [services, setServices] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const [city, setCity] = (0, react_1.useState)("bangalore");
    /* -------------------- SEARCH -------------------- */
    const handleSearch = async () => {
        if (!query.trim())
            return;
        setLoading(true);
        setError("");
        try {
            const res = await axios_1.default.get("http://localhost:4000/api/services/search", { params: { q: query } });
            const rows = Array.isArray(res.data?.data) ? res.data.data : [];
            setServices(rows);
        }
        catch (err) {
            console.error("Error searching services:", err);
            setError("Failed to search services");
            setServices([]);
        }
        finally {
            setLoading(false);
        }
    };
    /* -------------------- ENTER KEY SUPPORT -------------------- */
    (0, react_1.useEffect)(() => {
        const onEnter = (e) => {
            if (e.key === "Enter")
                handleSearch();
        };
        window.addEventListener("keydown", onEnter);
        return () => window.removeEventListener("keydown", onEnter);
    }, [query]);
    /* -------------------- RENDER -------------------- */
    return (react_1.default.createElement("div", { style: { padding: 16 } },
        react_1.default.createElement("h3", { style: { marginBottom: 10 } }, "\uD83D\uDD0D Services Search"),
        react_1.default.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 12 } },
            react_1.default.createElement("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search (LED, cleaning, painting...)", style: {
                    padding: 8,
                    flex: 1,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                } }),
            react_1.default.createElement("select", { value: city, onChange: (e) => setCity(e.target.value), style: { padding: 8, borderRadius: 6 } },
                react_1.default.createElement("option", { value: "bangalore" }, "Bangalore"),
                react_1.default.createElement("option", { value: "chennai" }, "Chennai"),
                react_1.default.createElement("option", { value: "pune" }, "Pune"),
                react_1.default.createElement("option", { value: "mumbai" }, "Mumbai"),
                react_1.default.createElement("option", { value: "hyderabad" }, "Hyderabad"),
                react_1.default.createElement("option", { value: "delhi" }, "Delhi")),
            react_1.default.createElement("button", { onClick: handleSearch, style: {
                    padding: "8px 16px",
                    borderRadius: 6,
                    cursor: "pointer",
                } }, "Search")),
        loading && react_1.default.createElement("p", null, "Loading services..."),
        error && react_1.default.createElement("p", { style: { color: "red" } }, error),
        services.length > 0 ? (react_1.default.createElement("div", { style: { overflowX: "auto" } },
            react_1.default.createElement("table", { style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                } },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", { style: { background: "#d28b33ff" } },
                        react_1.default.createElement("th", { style: th }, "Code"),
                        react_1.default.createElement("th", { style: th }, "Service"),
                        react_1.default.createElement("th", { style: th },
                            "Price (",
                            city,
                            ")"),
                        react_1.default.createElement("th", { style: th }, "Description"))),
                react_1.default.createElement("tbody", null, services.map((s) => (react_1.default.createElement("tr", { key: s.item_code },
                    react_1.default.createElement("td", { style: td }, s.item_code),
                    react_1.default.createElement("td", { style: { ...td, fontWeight: 500 } }, s.service_name),
                    react_1.default.createElement("td", { style: { ...td, fontWeight: 600 } },
                        "\u20B9",
                        (s[city] ?? 0).toLocaleString()),
                    react_1.default.createElement("td", { style: { ...td, color: "#555" } }, s.description || "-")))))))) : (!loading && react_1.default.createElement("p", null, "No services found"))));
};
/* -------------------- STYLES -------------------- */
const th = {
    textAlign: "left",
    padding: 8,
    borderBottom: "1px solid #030000ff",
};
const td = {
    padding: 8,
    borderBottom: "1px solid #060000ff",
    verticalAlign: "top",
};
exports.default = ServicesTab;
