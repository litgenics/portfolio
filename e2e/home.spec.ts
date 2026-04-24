import { test, expect } from '@playwright/test';

test.describe('Home Page E2E', () => {
  test('should load the homepage and show the main title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('WE BUILD');
    await expect(page.locator('h1')).toContainText('DIGITAL IMPACT');
  });

  test('should show the litgenics brand in navbar', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('LITGENICS', { exact: false })).toBeVisible();
  });

  test('should navigate to services section when clicking view services', async ({ page }) => {
    await page.goto('/');
    await page.click('text=View Services');
    await expect(page).toHaveURL(/.*#services/);
    await expect(page.locator('#services')).toBeVisible();
  });
});
