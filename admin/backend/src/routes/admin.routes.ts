import { Router } from "express";
import {
  getUsers,
  toggleUserStatus,
  deleteUser,
  createUser,
} from "../controllers/adminusercontroller";
import {
  getAllQuotations,
  updateQuotation,
  deleteQuotation
} from "../controllers/adminquotationcontroller";

import { changeUserPassword } from "../controllers/adminusercontroller";
import { getQuotationByIdAdmin, deleteQuotationAdmin } from "../controllers/adminquotationcontroller";
import { createQuotation } from "../controllers/quotationController";

const router = Router();

// USERS
router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users/:id/status", toggleUserStatus);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/password", changeUserPassword);


// QUOTATIONS
// QUOTATIONS
router.get("/quotations", getAllQuotations);
router.get("/quotations/:id", getQuotationByIdAdmin);  // single quotation for edit / PDF
router.post("/quotations", createQuotation);
router.put("/quotations/:id", updateQuotation);
router.delete("/quotations/:id", deleteQuotationAdmin);


export default router;
