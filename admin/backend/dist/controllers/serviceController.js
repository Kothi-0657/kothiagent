"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServices = exports.getServices = void 0;
const db_1 = __importDefault(require("../db"));
/* ---------------- GET ALL SERVICES ---------------- */
const getServices = async (_req, res) => {
    try {
        const result = await db_1.default.query(`SELECT * FROM services ORDER BY service_name`);
        res.json({ success: true, data: result.rows });
    }
    catch (err) {
        console.error("Error fetching services:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getServices = getServices;
/* ---------------- SEARCH SERVICES ---------------- */
const searchServices = async (req, res) => {
    const q = req.query.q;
    if (!q || !q.trim()) {
        return res.json({ success: true, data: [] });
    }
    try {
        const result = await db_1.default.query(`
      SELECT *
      FROM services
      WHERE service_name ILIKE $1
         OR description ILIKE $1
      ORDER BY service_name
      `, [`%${q}%`]);
        res.json({
            success: true,
            data: result.rows,
        });
    }
    catch (err) {
        console.error("Error searching services:", err);
        res.status(500).json({ success: false, message: "Search failed" });
    }
};
exports.searchServices = searchServices;
