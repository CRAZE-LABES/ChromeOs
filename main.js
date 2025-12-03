const puppeteer = require("puppeteer");
const http = require("http");

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
  console.log("Loaded Title:", await page.title());

  // keep puppeteer alive (optional)
  setInterval(() => {
    console.log("Running…");
  }, 30000);
})();

// REQUIRED FOR RENDER WEB SERVICE
http.createServer((req, res) => {
  res.end("Puppeteer Chrome Service Running");
}).listen(process.env.PORT || 3000, () => {
  console.log("Server started on port", process.env.PORT || 3000);
});
