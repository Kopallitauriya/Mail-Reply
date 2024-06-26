const { AzureOpenAI } = require("openai");
const { AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_VERSION } = require('./constants')

class AzureClient {
    constructor() {
        this.client = new AzureOpenAI({ endpoint: AZURE_OPENAI_ENDPOINT, apiKey: AZURE_OPENAI_API_KEY, apiVersion: AZURE_OPENAI_VERSION, deployment: AZURE_OPENAI_DEPLOYMENT });
    }
    async getCompletion(msg) {
        const result = await this.client.chat.completions.create({
            messages: msg
        });
        return result.choices[0].message.content;
    }
}

module.exports = AzureClient;