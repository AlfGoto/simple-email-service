import fs from "fs"
import { waitForMailEvent } from "mail-catcher"

const SECONDS = 1000
jest.setTimeout(70 * SECONDS)

test("Test one mail", async () => {
  const apiUrl = fs.readFileSync("test/e2e/api-url.txt", "utf-8")

  const random = Math.random().toString()
  await fetch(apiUrl + random)

  const mailEvent = await waitForMailEvent({
    filter: { subject: random },
  })
  expect(mailEvent.subject).toMatch(random)
})

test("Test on of two mails", async () => {
  const apiUrl = fs.readFileSync("test/e2e/api-url.txt", "utf-8")

  const random = Math.random().toString()
  await fetch(apiUrl + "IRRELEVANT")
  await fetch(apiUrl + random)

  const mailEvent = await waitForMailEvent({
    filter: { subject: random },
  })
  expect(mailEvent.subject).toMatch(random)
})
