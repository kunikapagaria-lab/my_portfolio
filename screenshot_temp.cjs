const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('http://localhost:5200');
  await page.waitForTimeout(2000);

  // Switch to 3D mode
  await page.click('button:has-text("3D View")');
  await page.waitForTimeout(2500);

  // Click the book cover to open it
  await page.mouse.click(700, 450);
  await page.waitForTimeout(2000);

  // One ArrowRight → journey page (page 2)
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(6000);  // wait for book tilt + camera to settle

  await page.screenshot({ path: 'journey_screenshot.png' });
  console.log('done');
  await browser.close();
})();
