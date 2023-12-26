"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_middlewareGlobal_1 = __importDefault(require("./app-middlewareGlobal"));
const configRoute_1 = __importDefault(require("./configRoute"));
const app_banner_1 = __importDefault(require("./app-banner"));
const app_mongoDbConfig_1 = __importDefault(require("./app-mongoDbConfig"));
require("module-alias/register");
// Initialize express app
const app = (0, express_1.default)();
//Connect to database
(0, app_mongoDbConfig_1.default)();
// Routes Config
(0, configRoute_1.default)(app);
// BANNER
(0, app_banner_1.default)();
//Middleware Global
app.use(express_1.default.json());
const server = (0, app_middlewareGlobal_1.default)(app);
// Start server
const port = process.env.PORT;
const type_env = process.env.NODE_ENV;
server.listen(port, () => {
    console.log(`Application run in ${type_env} - PORT: ${port}`);
});
