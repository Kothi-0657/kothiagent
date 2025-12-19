"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const jspdf_1 = __importDefault(require("jspdf"));
const html2canvas_1 = __importDefault(require("html2canvas"));
const logo_png_1 = __importDefault(require("../assets/logo.png"));
const quotationStore_1 = require("../services/quotationStore");
const QuotePreview = ({ quotation }) => {
    const now = new Date().toLocaleString();
    const agentId = Number(localStorage.getItem("agentId"));
    // 🧮 Calculate item amount WITH GST
    const calculateItemAmount = (qty, rate, gstPercent) => {
        const gstAmount = (rate * gstPercent) / 100;
        const finalRate = rate + gstAmount;
        return finalRate * qty;
    };
    // 🧮 GRAND TOTAL
    const total = quotation.items.reduce((sum, item) => {
        return (sum +
            calculateItemAmount(item.quantity, item.rate, item.gstPercent));
    }, 0);
    // ✅ MULTI PAGE PDF
    const downloadPDF = async () => {
        const printElement = document.getElementById("print-area");
        if (!printElement)
            return;
        const canvas = await (0, html2canvas_1.default)(printElement, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf_1.default("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        pdf.save(`Quotation-${quotation.clientName || "Client"}.pdf`);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginBottom: "180px",
                flexWrap: "wrap",
            } },
            react_1.default.createElement("button", { onClick: downloadPDF }, "\u2B07 Download PDF"),
            react_1.default.createElement("button", { onClick: async () => {
                    if (!agentId) {
                        alert("Agent not logged in");
                        return;
                    }
                    try {
                        const payload = {
                            ...quotation,
                            // We no longer need totalAmount camelCase
                            // Total is calculated inside the service
                        };
                        await (0, quotationStore_1.saveQuotationToDB)(payload, agentId);
                        alert("Quotation saved successfully");
                    }
                    catch (err) {
                        console.error(err);
                        alert("Failed to save quotation");
                    }
                } }, "\uD83D\uDCBE Save Quotation")),
        react_1.default.createElement("div", { id: "print-area", style: {
                width: "794px",
                padding: "24px",
                background: "#ffffff",
                color: "#000",
                fontSize: "12px",
                fontFamily: "Arial, sans-serif",
            } },
            react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                react_1.default.createElement("div", { style: { display: "flex", gap: 10 } },
                    react_1.default.createElement("img", { src: logo_png_1.default, alt: "Kothi Logo", width: 130 }),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { style: { marginTop: 50, marginBottom: 2 } }, "KothiIndia Private Limited"),
                        react_1.default.createElement("p", { style: { margin: 0 } }, "Renovations & Construction Services"))),
                react_1.default.createElement("div", { style: { textAlign: "right", fontSize: 9 } },
                    react_1.default.createElement("strong", null, "Date:"),
                    react_1.default.createElement("br", null),
                    now)),
            react_1.default.createElement("p", { style: {
                    marginTop: 10,
                    textAlign: "right",
                    fontSize: 12,
                    fontWeight: "bold",
                } }, "Tentative Quotation"),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("table", { style: { width: "100%", marginBottom: 12 } },
                react_1.default.createElement("tbody", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("strong", null, "Client Name:")),
                        react_1.default.createElement("td", null, quotation.clientName || "-"),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("strong", null, "Client Code:")),
                        react_1.default.createElement("td", null, quotation.clientCode || "-")),
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("strong", null, "Location:")),
                        react_1.default.createElement("td", null, quotation.projectLocation || "-"),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("strong", null, "Project Type:")),
                        react_1.default.createElement("td", null, quotation.projectType || "-")))),
            react_1.default.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null, [
                        "Sl",
                        "Area",
                        "Service",
                        "Description",
                        "Qty",
                        "Rate",
                        "GST %",
                        "Amount",
                    ].map(h => (react_1.default.createElement("th", { key: h, style: th }, h))))),
                react_1.default.createElement("tbody", null, quotation.items.map((item, i) => {
                    const amount = calculateItemAmount(item.quantity, item.rate, item.gstPercent);
                    return (react_1.default.createElement("tr", { key: item.id },
                        react_1.default.createElement("td", { style: td }, i + 1),
                        react_1.default.createElement("td", { style: td }, item.area),
                        react_1.default.createElement("td", { style: td }, item.service),
                        react_1.default.createElement("td", { style: td }, item.description),
                        react_1.default.createElement("td", { style: td }, item.quantity),
                        react_1.default.createElement("td", { style: td },
                            "\u20B9 ",
                            item.rate.toFixed(2)),
                        react_1.default.createElement("td", { style: td },
                            item.gstPercent,
                            "%"),
                        react_1.default.createElement("td", { style: td },
                            "\u20B9 ",
                            amount.toFixed(2))));
                }))),
            react_1.default.createElement("h3", { style: { textAlign: "right", marginTop: 12 } },
                "Total Amount: \u20B9 ",
                total.toFixed(2)),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Payment Terms:")),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null, "30% Booking Amount"),
                react_1.default.createElement("li", null, "40% During Work"),
                react_1.default.createElement("li", null, "30% Final Handover")),
            react_1.default.createElement("p", { style: { marginTop: 30 } },
                "Authorized Signatory",
                react_1.default.createElement("br", null),
                react_1.default.createElement("strong", null, "Kothi India Pvt Ltd")),
            react_1.default.createElement("div", { style: { pageBreakBefore: "always" } }),
            react_1.default.createElement("div", { style: { fontSize: 8, lineHeight: 1, textAlign: "right" } },
                react_1.default.createElement("h3", null, "Contact"),
                react_1.default.createElement("p", null, "For any queries:"),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "WhatsApp:"),
                    " +91 99722 25551"),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Email:"),
                    " service@kothiindia.com"),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("strong", null, "Website:"),
                    " https://kothiindia.com")),
            react_1.default.createElement("hr", { style: { marginTop: 10 } }),
            react_1.default.createElement("div", { style: { fontSize: 11, lineHeight: 1.7 } },
                react_1.default.createElement("h3", null, "Terms & Conditions"),
                react_1.default.createElement("hr", { style: { marginTop: 40 } }),
                react_1.default.createElement("div", { style: { fontSize: 11, lineHeight: 1.7 } },
                    react_1.default.createElement("ol", { style: { paddingLeft: 18 } },
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Scope of Work:"),
                            "The Company shall execute the work strictly as per the finalized and approved quotation. Any work not explicitly mentioned in the quotation shall be treated as additional work and charged separately."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Quotation Validity:"),
                            "This quotation is valid for 30 days from the date of issue. Prices are based on current material and labour costs and may change due to market fluctuations."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Payment Terms:"),
                            "60% advance payment is required prior to commencement of work. Balance payments shall be made as per mutually agreed milestones. Final payment must be cleared before handover of the project."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Delays & Timelines:"),
                            "The Company shall not be responsible for delays caused by factors beyond its control including but not limited to material shortages, weather conditions, client-initiated changes, approvals, site conditions, or third-party vendors."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Design & Drawings:"),
                            "All drawings, designs, and layouts once approved by the client shall be considered final. Any modifications requested thereafter may lead to additional cost and extended timelines."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Variations & Additional Work:"),
                            "Any change in scope, specifications, materials, or quantities must be approved in writing. Such variations will be billed separately and may affect delivery timelines."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Material Specifications:"),
                            "Materials shall be used as per the agreed specifications. Any upgrades or brand changes requested by the client will be charged additionally. Colour and finish variations are inherent to construction materials and shall not be considered defects."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Client Responsibilities:"),
                            "The Client shall provide uninterrupted site access, electricity, water, storage space, and necessary approvals. The client must remove or protect valuables and personal belongings from the work area."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Site Conditions:"),
                            "The Company assumes the site is free from hidden structural defects, seepage, termites, asbestos, or hazardous materials. Any such issues discovered during execution shall be informed and rectified at additional cost."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Warranty:"),
                            "A workmanship warranty of 12 months is provided from the date of project completion. This does not cover normal wear and tear, misuse, water seepage, electrical fluctuations, or third-party damage. For interior projects, warranty is applicable only on Century Plywood works unless otherwise specified."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Insurance & Safety:"),
                            "The Company maintains worker safety and basic insurance coverage. The Client is responsible for insuring the property and its contents during the execution period."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Cancellation & Termination:"),
                            "Either party may terminate the agreement with written notice. The Client shall be liable to pay for work completed, materials procured, and any non-recoverable expenses incurred up to the date of termination."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Damage & Liability:"),
                            "Minor damages inherent to renovation such as hairline cracks or surface marks may occur and shall not be considered defects. The Company shall not be liable for damage caused due to existing structural weaknesses."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Dispute Resolution:"),
                            "Any disputes shall first be resolved amicably through mutual discussion. Failing which, disputes shall be subject to arbitration in accordance with applicable Indian laws."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Governing Law:"),
                            "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India, with jurisdiction in Karnataka."),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("strong", null, "Acceptance:"),
                            "Acceptance of this quotation or commencement of work shall be deemed as acceptance of all the above Terms & Conditions.")))))));
};
/* ================= STYLES ================= */
const th = {
    border: "1px solid #000",
    padding: 3,
    background: "#e3b880ff",
    textAlign: "center",
};
const td = {
    border: "1px solid #000",
    padding: 6,
    textAlign: "center",
};
exports.default = QuotePreview;
