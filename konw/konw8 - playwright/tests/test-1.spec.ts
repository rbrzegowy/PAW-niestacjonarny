import { test, expect } from '@playwright/test'

test('wsei - plan zajec', async ({ page }) => {
  await page.goto('https://wsei.edu.pl/')
  await page.getByRole('link', { name: ' Studenci' }).hover()
  await page.getByRole('link', { name: 'Dziekanat ' }).hover()
  await page.getByRole('link', { name: 'Plany zajęć' }).click()
  const downloadPromise = page.waitForEvent('download')

  await page.getByRole('link', { name: 'Sprawdź terminy zjazdów ' }).click()
  const download = await downloadPromise
  expect(download.url()).toBe('https://wsei.edu.pl/download/405/nowa-kategoria/22461/terminy-zjazdow-sem-lato-2023-2.xls')
})