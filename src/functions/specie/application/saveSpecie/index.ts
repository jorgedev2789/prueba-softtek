import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    AWS_BUCKET_NAME: '${self:service}-${self:custom.stage}',
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'specie',
        cors: {
          origin: '*',
          headers: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'X-Amz-Specie-Agent',
            'X-Token',
          ],
          allowCredentials: false,
        },
        private: true,
      },
    },
  ],
  iamRoleStatementsInherit: true,
}
