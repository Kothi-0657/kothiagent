// src/controllers/adminquotationcontroller.ts
import { Request, Response } from "express";
import pool from "../db";

// GET all quotations
export const getAllQuotations = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        q.id,
        q.client_name,
        q.client_code,
        q.total_amount,
        q.project_type,
        q.project_location,
        q.items,
        q.created_at,
        u.name AS agent_name
      FROM quotations q
      JOIN users u ON u.id = q.agent_id
      ORDER BY q.created_at DESC
    `);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Admin quotations error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET single quotation by ID
// GET single quotation by ID
export const getQuotationByIdAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(`
      SELECT 
        q.id, 
        q.client_name, 
        q.client_code, 
        q.total_amount, 
        q.project_type, 
        q.project_location,
        q.items,
        q.created_at, 
        u.name AS agent_name
      FROM quotations q
      JOIN users u ON u.id = q.agent_id
      WHERE q.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Quotation not found" });
    }

    const row = result.rows[0];

    // Parse items JSON safely
    const items = typeof row.items === "string" ? JSON.parse(row.items) : row.items;

    res.json({ success: true, data: { ...row, items } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};



// CREATE new quotation
export const deleteQuotationAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM quotations WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


// UPDATE existing quotation
export const updateQuotation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { client_name, client_code, total_amount, project_type, project_location, items } = req.body;
  try {
    const result = await pool.query(`
      UPDATE quotations
      SET client_name=$1, client_code=$2, total_amount=$3, project_type=$4, project_location=$5, items=$6
      WHERE id=$7
      RETURNING *
    `, [client_name, client_code, total_amount, project_type, project_location, items, id]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Quotation not found" });

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Update quotation error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE quotation
export const deleteQuotation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM quotations WHERE id=$1 RETURNING *`, [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Quotation not found" });

    res.json({ success: true, message: "Quotation deleted successfully" });
  } catch (error) {
    console.error("Delete quotation error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

