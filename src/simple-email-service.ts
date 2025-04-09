import * as cdk from "aws-cdk-lib"
import * as apigw from "aws-cdk-lib/aws-apigateway"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"
import { MailCatcher } from "mail-catcher"

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const fn = new NodejsFunction(this, "simple-email-service-API-FUNCTION", {
      entry: "src/functions/apiFunction.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
    })
    fn.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
      }),
    )
    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    })
    new apigw.LambdaRestApi(this, "simple-email-service-API", {
      handler: fn,
    })

    new MailCatcher(this, "MailCatcher", "contact@alfredgauthier.com")
  }
}
