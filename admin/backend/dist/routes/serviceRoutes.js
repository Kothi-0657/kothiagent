"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const router = (0, express_1.Router)();
router.get("/", serviceController_1.getServices);
router.get("/search", serviceController_1.searchServices);
exports.default = router;
