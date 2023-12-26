import express from "express";
import middlewareGlobal from "./app-middlewareGlobal";
import appRoutes from "./configRoute";
import Banner from "./app-banner";
import ConnectDbMongoose from "./app-mongoDbConfig";
import "module-alias/register";

// Initialize express app
const app = express();

//Connect to database
ConnectDbMongoose();

// Routes Config
appRoutes(app);

// BANNER
Banner();

//Middleware Global
app.use(express.json());
const server = middlewareGlobal(app);

// Start server
const port = process.env.PORT;
const type_env = process.env.NODE_ENV;
server.listen(port, () => {
  console.log(`Application run in ${type_env} - PORT: ${port}`);
});
