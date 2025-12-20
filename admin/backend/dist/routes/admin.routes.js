"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminusercontroller_1 = require("../controllers/adminusercontroller");
const adminquotationcontroller_1 = require("../controllers/adminquotationcontroller");
const adminusercontroller_2 = require("../controllers/adminusercontroller");
const adminquotationcontroller_2 = require("../controllers/adminquotationcontroller");
const quotationController_1 = require("../controllers/quotationController");
const router = (0, express_1.Router)();
// USERS
router.get("/users", adminusercontroller_1.getUsers);
router.post("/users", adminusercontroller_1.createUser);
router.patch("/users/:id/status", adminusercontroller_1.toggleUserStatus);
router.delete("/users/:id", adminusercontroller_1.deleteUser);
router.patch("/users/:id/password", adminusercontroller_2.changeUserPassword);
// QUOTATIONS
// QUOTATIONS
router.get("/quotations", adminquotationcontroller_1.getAllQuotations);
router.get("/quotations/:id", adminquotationcontroller_2.getQuotationByIdAdmin); // single quotation for edit / PDF
router.post("/quotations", quotationController_1.createQuotation);
router.put("/quotations/:id", adminquotationcontroller_1.updateQuotation);
router.delete("/quotations/:id", adminquotationcontroller_2.deleteQuotationAdmin);
exports.default = router;
