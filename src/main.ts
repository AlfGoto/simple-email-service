import { App } from "aws-cdk-lib"
import { MyStack } from "./simple-email-service"

const Env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
}

const app = new App()

new MyStack(app, "simple-email-service", { env: Env })

app.synth()
