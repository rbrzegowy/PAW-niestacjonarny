import { test, expect } from '@playwright/test'

test.describe("Recording 30.06.2023 at 19:46:10", () => {
  test("tests Recording 30.06.2023 at 19:46:10", async ({ page }) => {
    await page.setViewportSize({
      width: 1744,
      height: 620
    })
    await page.goto("https://www.onet.pl/")
    await page.locator("div.ImportantFeed_Column1__dIvSO > article:nth-of-type(2) h3").click()
    expect(page.url()).toBe('https://wiadomosci.onet.pl/swiat/ukraina-reaguje-na-przerzucenie-wagnerowcow-na-bialorus-decyzja-dowodcow-relacja-na/btd0714')
    await page.locator("a.BackToMainPage").click()
    expect(page.url()).toBe('https://www.onet.pl/')
  })
})
