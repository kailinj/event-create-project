import { faker } from '@faker-js/faker/locale/en';
import { test, expect, Page } from '@playwright/test';

const gotoHome = async ({ page }: { page: Page }) => await page.goto('/');
const openDialog = async (page: Page) => {
  await page.click('text="Add user"');
  await expect(
    page.locator('div[role="dialog"][data-state="open"]')
  ).toBeVisible();
};

test.beforeEach(gotoHome);

test('Users page displays the Users table', async ({ page }) => {
  await expect(page.locator('div.data-table')).toBeVisible();
});

test('Clicking "Add user" opens the create dialog', async ({ page }) => {
  await openDialog(page);
  await expect(page.locator('h2:text("Add new user")')).toBeVisible();
});

test('Create dialog fields are empty on open', async ({ page }) => {
  await openDialog(page);
  const inputs = page.locator('div[role="dialog"] input');
  await expect(inputs).toHaveCount(await inputs.count());
  await Promise.all(
    [...Array(await inputs.count()).keys()].map((i) =>
      expect(inputs.nth(i)).toHaveValue('')
    )
  );
});

test('Submitting empty form shows errors', async ({ page }) => {
  await openDialog(page);
  await page.click('button:text("Create")');
  const nameError = page.locator('input[name="name"] ~ p.text-destructive');
  await expect(nameError).toBeVisible();
  await expect(nameError).toHaveText('Please enter your name.');
});

test('Can add users & see them in table', async ({ page }) => {
  await openDialog(page);
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.exampleEmail(),
    age: faker.number.int({ min: 1, max: 99 }),
  };
  await page.getByLabel('name').fill(user.name);
  await page.getByLabel('email').fill(user.email);
  await page.getByLabel('age').fill(String(user.age));
  await page.click('button[type="submit"]');
  await expect(page.locator(`td:text("${user.name}")`)).toBeVisible();
});

test('"Add custom field" button works', async ({ page }) => {
  await openDialog(page);
  const dialog = page.locator('div[role="dialog"]');
  const addButton = dialog.locator('button:text("Add custom field")');
  await page.click('button:text("Add custom field")');
  await expect(dialog.locator('label:text("Custom field")')).toBeVisible();
  await expect(dialog.locator('input[placeholder="Label"]')).toBeVisible();
  await expect(dialog.locator('input[placeholder="Value"]')).toBeVisible();
  await page.click('button:text("Remove")');
  await expect(dialog.locator('label:text("Custom field")')).not.toBeVisible();
  await expect(addButton).toBeVisible();
});
