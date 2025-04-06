import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { Hono } from "hono"
import { handle } from "hono/aws-lambda"

const app = new Hono()
const ses = new SESClient()

app.get("/", async (c) => {
  try {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: ["alfgoto@gmail.com"],
      },
      Message: {
        Body: {
          Text: {
            Data: "Quel beau mail",
          },
        },
        Subject: {
          Data: "T'es beau mec",
        },
      },
      Source: "alfgoto@gmail.com",
    })

    await ses.send(command)
    return c.text("success")
  } catch (err) {
    return c.text("error:" + JSON.stringify(err), 401)
  }
})

export const handler = handle(app)
