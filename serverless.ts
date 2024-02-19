import Functions from '@functions/index'
import Resources from '@functions/resources'
import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'prueba-softtek',
  frameworkVersion: '3',
  useDotenv: true,
  provider: {
    name: 'aws',
    deploymentMethod: 'direct',
    runtime: 'nodejs20.x',
    apiGateway: {
      binaryMediaTypes: ['*/*'],
      apiKeys: [
        {
          name: '${opt:stage}-rop-permissionsKey',
        },
      ],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MSQLUSER: '${env:MSQLUSER}',
      MSQLHOST: '${env:MSQLHOST}',
      MSQLDATABASE: '${env:MSQLDATABASE}',
      MSQLPASSWORD: '${env:MSQLPASSWORD}',
      MSQLPORT: '${env:MSQLPORT}',
      SWAPI_URL: '${env:SWAPI_URL}',
      NODE_ENV: '${env:NODE_ENV}',
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-prune-plugin', 'serverless-iam-roles-per-function'],
  functions: Functions,
  resources: { Resources },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    stages: ['staging', 'prd'],
    stage: "${opt:stage, 'local'}",
    prune: {
      automatic: true,
      number: 3,
    },
  },
}

module.exports = serverlessConfiguration
