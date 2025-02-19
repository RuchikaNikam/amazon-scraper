const { chromium } = require("playwright");
const Product = require("../models/productModel");

const scrapeAmazon = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://www.amazon.com/s?k=laptop", { waitUntil: "load" });

    const products = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".s-result-item")).map(item => {
            return {
                name: item.querySelector("h2 a span")?.innerText || "No name",
                price: item.querySelector(".a-price-whole")?.innerText || "N/A",
                image: item.querySelector(".s-image")?.src || "",
                rating: item.querySelector(".a-icon-alt")?.innerText || "No rating",
            };
        });
    });

    await browser.close();

    if (products.length > 0) {
        await Product.deleteMany(); // Clear old data
        await Product.insertMany(products);
        console.log("Amazon Data Scraped & Stored Successfully!");
    } else {
        console.log("No Products Found!");
    }
};

module.exports = scrapeAmazon;
