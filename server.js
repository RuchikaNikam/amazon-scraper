const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const scrapeAmazon = require("./services/scraperService");
require("./cron/scrapeJob");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api", productRoutes);
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await scrapeAmazon(); // Scrape immediately when server starts
});
