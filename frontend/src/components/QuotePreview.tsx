import React from "react";
import { Quotation } from "../types/quotation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.png";
import { saveQuotationToDB } from "../services/quotationStore";

const QuotePreview: React.FC<{ quotation: Quotation }> = ({ quotation }) => {
  const now = new Date().toLocaleString();
  const agentId = Number(localStorage.getItem("agentId"));

  // 🧮 Calculate item amount WITH GST
  const calculateItemAmount = (
    qty: number,
    rate: number,
    gstPercent: number
  ) => {
    const gstAmount = (rate * gstPercent) / 100;
    const finalRate = rate + gstAmount;
    return finalRate * qty;
  };

  // 🧮 GRAND TOTAL
  const total = quotation.items.reduce((sum, item) => {
    return (
      sum +
      calculateItemAmount(item.quantity, item.rate, item.gstPercent)
    );
  }, 0);

  // ✅ MULTI PAGE PDF
  const downloadPDF = async () => {
    const printElement = document.getElementById("print-area");
    if (!printElement) return;

    const canvas = await html2canvas(printElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

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

  return (
    <>
      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginBottom: "180px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={downloadPDF}>⬇ Download PDF</button>

        <button
  onClick={async () => {
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

      await saveQuotationToDB(payload, agentId);
      alert("Quotation saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save quotation");
    }
  }}
>
  💾 Save Quotation
</button>
      </div>

      {/* ================= PRINT AREA ================= */}
      <div
        id="print-area"
        style={{
          width: "794px",
          padding: "24px",
          background: "#ffffff",
          color: "#000",
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <img src={logo} alt="Kothi Logo" width={130} />
            <div>
              <h2 style={{ marginTop: 50, marginBottom: 2 }}>
                KothiIndia Private Limited
              </h2>
              <p style={{ margin: 0 }}>
                Renovations & Construction Services
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: 9 }}>
            <strong>Date:</strong>
            <br />
            {now}
          </div>
        </div>

        <p
          style={{
            marginTop: 10,
            textAlign: "right",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          Tentative Quotation
        </p>

        <hr />

        {/* CLIENT INFO */}
        <table style={{ width: "100%", marginBottom: 12 }}>
          <tbody>
            <tr>
              <td><strong>Client Name:</strong></td>
              <td>{quotation.clientName || "-"}</td>
              <td><strong>Client Code:</strong></td>
              <td>{quotation.clientCode || "-"}</td>
            </tr>
            <tr>
              <td><strong>Location:</strong></td>
              <td>{quotation.projectLocation || "-"}</td>
              <td><strong>Project Type:</strong></td>
              <td>{quotation.projectType || "-"}</td>
            </tr>
          </tbody>
        </table>

        {/* ITEMS TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Sl",
                "Area",
                "Service",
                "Description",
                "Qty",
                "Rate",
                "GST %",
                "Amount",
              ].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {quotation.items.map((item, i) => {
              const amount = calculateItemAmount(
                item.quantity,
                item.rate,
                item.gstPercent
              );

              return (
                <tr key={item.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={td}>{item.area}</td>
                  <td style={td}>{item.service}</td>
                  <td style={td}>{item.description}</td>
                  <td style={td}>{item.quantity}</td>
                  <td style={td}>₹ {item.rate.toFixed(2)}</td>
                  <td style={td}>{item.gstPercent}%</td>
                  <td style={td}>₹ {amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* TOTAL */}
        <h3 style={{ textAlign: "right", marginTop: 12 }}>
          Total Amount: ₹ {total.toFixed(2)}
        </h3>

        <hr />

        {/* PAYMENT TERMS */}
        <p><strong>Payment Terms:</strong></p>
        <ul>
          <li>30% Booking Amount</li>
          <li>40% During Work</li>
          <li>30% Final Handover</li>
        </ul>

        {/* SIGNATURE */}
        <p style={{ marginTop: 30 }}>
          Authorized Signatory
          <br />
          <strong>Kothi India Pvt Ltd</strong>
        </p>

        {/* ✅ FORCE NEW PAGE */}
        <div style={{ pageBreakBefore: "always" }} />

        {/* CONTACT */}
        <div style={{ fontSize: 8, lineHeight: 1, textAlign: "right" }}>
          <h3>Contact</h3>
          <p>For any queries:</p>
          <p><strong>WhatsApp:</strong> +91 99722 25551</p>
          <p><strong>Email:</strong> service@kothiindia.com</p>
          <p><strong>Website:</strong> https://kothiindia.com</p>
        </div>

        <hr style={{ marginTop: 10 }} />

        {/* TERMS */}
        <div style={{ fontSize: 11, lineHeight: 1.7 }}>
          <h3>Terms & Conditions</h3>
          {/* YOUR SAME TERMS CONTENT — UNCHANGED */}
          <hr style={{ marginTop: 40 }} />

<div style={{ fontSize: 11, lineHeight: 1.7 }}>
  

  <ol style={{ paddingLeft: 18 }}>
    <li>
      <strong>Scope of Work:</strong>  
      The Company shall execute the work strictly as per the finalized and
      approved quotation. Any work not explicitly mentioned in the quotation
      shall be treated as additional work and charged separately.
    </li>

    <li>
      <strong>Quotation Validity:</strong>  
      This quotation is valid for 30 days from the date of issue. Prices are
      based on current material and labour costs and may change due to market
      fluctuations.
    </li>

    <li>
      <strong>Payment Terms:</strong>  
      60% advance payment is required prior to commencement of work.  
      Balance payments shall be made as per mutually agreed milestones.  
      Final payment must be cleared before handover of the project.
    </li>

    <li>
      <strong>Delays & Timelines:</strong>  
      The Company shall not be responsible for delays caused by factors beyond
      its control including but not limited to material shortages, weather
      conditions, client-initiated changes, approvals, site conditions, or
      third-party vendors.
    </li>

    <li>
      <strong>Design & Drawings:</strong>  
      All drawings, designs, and layouts once approved by the client shall be
      considered final. Any modifications requested thereafter may lead to
      additional cost and extended timelines.
    </li>

    <li>
      <strong>Variations & Additional Work:</strong>  
      Any change in scope, specifications, materials, or quantities must be
      approved in writing. Such variations will be billed separately and may
      affect delivery timelines.
    </li>

    <li>
      <strong>Material Specifications:</strong>  
      Materials shall be used as per the agreed specifications. Any upgrades or
      brand changes requested by the client will be charged additionally.
      Colour and finish variations are inherent to construction materials and
      shall not be considered defects.
    </li>

    <li>
      <strong>Client Responsibilities:</strong>  
      The Client shall provide uninterrupted site access, electricity, water,
      storage space, and necessary approvals. The client must remove or protect
      valuables and personal belongings from the work area.
    </li>

    <li>
      <strong>Site Conditions:</strong>  
      The Company assumes the site is free from hidden structural defects,
      seepage, termites, asbestos, or hazardous materials. Any such issues
      discovered during execution shall be informed and rectified at additional
      cost.
    </li>

    <li>
      <strong>Warranty:</strong>  
      A workmanship warranty of 12 months is provided from the date of project
      completion. This does not cover normal wear and tear, misuse, water
      seepage, electrical fluctuations, or third-party damage.  
      For interior projects, warranty is applicable only on Century Plywood
      works unless otherwise specified.
    </li>

    <li>
      <strong>Insurance & Safety:</strong>  
      The Company maintains worker safety and basic insurance coverage. The
      Client is responsible for insuring the property and its contents during
      the execution period.
    </li>

    <li>
      <strong>Cancellation & Termination:</strong>  
      Either party may terminate the agreement with written notice. The Client
      shall be liable to pay for work completed, materials procured, and any
      non-recoverable expenses incurred up to the date of termination.
    </li>

    <li>
      <strong>Damage & Liability:</strong>  
      Minor damages inherent to renovation such as hairline cracks or surface
      marks may occur and shall not be considered defects. The Company shall not
      be liable for damage caused due to existing structural weaknesses.
    </li>

    <li>
      <strong>Dispute Resolution:</strong>  
      Any disputes shall first be resolved amicably through mutual discussion.
      Failing which, disputes shall be subject to arbitration in accordance
      with applicable Indian laws.
    </li>

    <li>
      <strong>Governing Law:</strong>  
      These Terms & Conditions shall be governed by and interpreted in
      accordance with the laws of India, with jurisdiction in Karnataka.
    </li>

    <li>
      <strong>Acceptance:</strong>  
      Acceptance of this quotation or commencement of work shall be deemed as
      acceptance of all the above Terms & Conditions.
    </li>
  </ol>
</div>

        </div>
      </div>
    </>
  );
};

/* ================= STYLES ================= */

const th: React.CSSProperties = {
  border: "1px solid #000",
  padding: 3,
  background: "#e3b880ff",
  textAlign: "center",
};

const td: React.CSSProperties = {
  border: "1px solid #000",
  padding: 6,
  textAlign: "center",
};

export default QuotePreview;
