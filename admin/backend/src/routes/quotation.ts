import { Router } from "express";
import { createQuotation } from "../controllers/quotationController";
import { getAgentQuotations } from "../controllers/quotationController";

const router = Router();
router.post("/", createQuotation);
router.get("/agent/:agentId", getAgentQuotations);
export default router;
