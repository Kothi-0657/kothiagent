import { Request, Response } from "express";
import pool from "../db";

/**
 * GET ALL USERS (Admin)
 * Includes agents + super admin
 */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        email,
        role,
        is_active,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

/**
 * ENABLE / DISABLE USER (Admin)
 */
export const toggleUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const user = await pool.query(
      "SELECT role FROM users WHERE id = $1",
      [id]
    );

    if (user.rows[0]?.role === "SUPER_ADMIN") {
      return res
        .status(403)
        .json({ message: "Cannot modify Super Admin" });
    }

    await pool.query(
      "UPDATE users SET is_active = $1 WHERE id = $2",
      [active, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Toggle user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

/**
 * DELETE USER (Admin)
 */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await pool.query(
      "SELECT role FROM users WHERE id = $1",
      [id]
    );

    if (user.rows[0]?.role === "SUPER_ADMIN") {
      return res
        .status(403)
        .json({ message: "Cannot delete Super Admin" });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    res.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

/**
 * CREATE AGENT USER (Admin)
 */
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // check duplicate email
    const exists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (exists.rowCount) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await pool.query(
      `
      INSERT INTO users (name, email, password, role, is_active)
      VALUES ($1, $2, $3, 'AGENT', true)
      `,
      [name, email, password] // plain password for now
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [password, id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Failed to change password" });
  }
};
