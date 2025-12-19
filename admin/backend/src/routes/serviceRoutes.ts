import { Router } from "express";
import { getServices, searchServices } from "../controllers/serviceController";

const router = Router();

router.get("/", getServices);
router.get("/search", searchServices);

export default router;
