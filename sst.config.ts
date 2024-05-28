/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: 'sst-chatgpt-invoice-extractor',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws',
            providers: {
                aws: {
                    region: 'sa-east-1'
                }
            }
        }
    },
    async run() {
        const api = new sst.aws.ApiGatewayV2('MyApi')

        api.route('GET /', {
            handler: 'src/index.handler',
            environment: {
                OPENAI_API_KEY: process.env.OPENAI_API_KEY!
            }
        })
    }
})
