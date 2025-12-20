"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quotationController_1 = require("../controllers/quotationController");
const quotationController_2 = require("../controllers/quotationController");
const router = (0, express_1.Router)();
router.post("/", quotationController_1.createQuotation);
router.get("/agent/:agentId", quotationController_2.getAgentQuotations);
exports.default = router;
