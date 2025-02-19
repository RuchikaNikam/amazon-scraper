const cron = require("node-cron");
const scrapeAmazon = require("../services/scraperService");

cron.schedule("0 * * * *", async () => {
    console.log("Running cron job: Scraping Amazon...");
    await scrapeAmazon();
});
