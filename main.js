const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
      "--single-process"
    ]
  });

  const page = await browser.newPage();
  await page.goto("https://example.com");

  console.log("Loaded:", await page.title());

  // FIX: prevent Render from stopping the app
  setInterval(() => {
    console.log("Running...");
  }, 30000);
})();
