import fs from "fs"

test("true", async () => {
  const apiUrl = fs.readFileSync("test/e2e/api-url.txt", "utf-8")

  await fetch(apiUrl)
  expect(true).toBeTruthy()
})
