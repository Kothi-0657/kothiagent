import { Request, Response } from "express";
import pool from "../db";

/* ---------------- GET ALL SERVICES ---------------- */
export const getServices = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM services ORDER BY service_name`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ---------------- SEARCH SERVICES ---------------- */
export const searchServices = async (req: Request, res: Response) => {
  const q = req.query.q as string;

  if (!q || !q.trim()) {
    return res.json({ success: true, data: [] });
  }

  try {
    const result = await pool.query(
      `
      SELECT *
      FROM services
      WHERE service_name ILIKE $1
         OR description ILIKE $1
      ORDER BY service_name
      `,
      [`%${q}%`]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("Error searching services:", err);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};
