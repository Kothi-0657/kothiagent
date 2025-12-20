"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const quotation_1 = __importDefault(require("./routes/quotation"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/quotations", quotation_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/services", serviceRoutes_1.default);
app.use("/api/admin/auth", adminAuthRoutes_1.default);
app.use("/api/admin", admin_routes_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running",
        time: new Date().toISOString(),
    });
});
