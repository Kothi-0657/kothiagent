"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgentQuotations = exports.createQuotation = void 0;
const db_1 = __importDefault(require("../db"));
const createQuotation = async (req, res) => {
    try {
        console.log("📥 PAYLOAD RECEIVED:", JSON.stringify(req.body, null, 2));
        const { agentId, client_name, client_code, project_location, project_type, items, total_amount, deprecated_assessment_type, } = req.body;
        // 🔒 Required field validation
        if (!agentId || !client_name || !Array.isArray(items)) {
            return res.status(400).json({
                message: "agentId, client_name and items are required",
            });
        }
        const result = await db_1.default.query(`
      INSERT INTO quotations (
        agent_id,
        client_name,
        client_code,
        project_location,
        project_type,
        deprecated_assessment_type,
        items,
        total_amount
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8)
      RETURNING *
      `, [
            Number(agentId),
            client_name,
            client_code ?? null,
            project_location ?? null,
            project_type ?? null,
            deprecated_assessment_type ?? null,
            JSON.stringify(items),
            total_amount !== undefined ? Number(total_amount) : null,
        ]);
        res.status(201).json({
            success: true,
            quotation: result.rows[0],
        });
    }
    catch (error) {
        console.error("❌ createQuotation FULL ERROR:", error);
        res.status(500).json({
            message: "Failed to save quotation",
            pgError: error.message,
            detail: error.detail,
            code: error.code,
            constraint: error.constraint,
        });
    }
};
exports.createQuotation = createQuotation;
const getAgentQuotations = async (req, res) => {
    try {
        const { agentId } = req.params;
        if (!agentId) {
            return res.status(400).json({ message: "agentId is required" });
        }
        const result = await db_1.default.query(`SELECT * FROM quotations WHERE agent_id = $1 ORDER BY created_at DESC`, [Number(agentId)]);
        res.json({ quotations: result.rows });
    }
    catch (error) {
        console.error("❌ getAgentQuotations error:", error);
        res.status(500).json({ message: "Failed to fetch quotations", error: error.message });
    }
};
exports.getAgentQuotations = getAgentQuotations;
