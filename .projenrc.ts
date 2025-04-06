import fs from "fs"
import path from "path"
import { awscdk, javascript } from "projen"

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "simple-email-service",
  projenrcTs: true,
  packageManager: javascript.NodePackageManager.NPM,

  deps: ["hono", "@aws-sdk/client-ses"],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  gitignore: ["test/e2e/api-url.txt"],
})
project.eslint?.addRules({ quotes: ["error", "double"] })
project.eslint?.addRules({ semi: ["error", "never"] })

project.prettier?.addOverride({
  files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
  options: {
    semi: false,
  },
})

fs.writeFileSync(
  path.join(project.outdir, "jest.e2e.config.json"),
  JSON.stringify(
    {
      preset: "ts-jest",
      testEnvironment: "node",
      roots: ["<rootDir>/test/e2e"],
      testMatch: ["**/*.e2e.ts"],
      transform: {
        "^.+\\.ts$": "ts-jest",
      },
    },
    null,
    2,
  ),
)
project.addTask("test:e2e", {
  exec: "jest --config jest.e2e.config.json --runInBand --passWithNoTests",
})

project.synth()
