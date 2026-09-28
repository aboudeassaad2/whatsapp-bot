const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AQ.Ab8RN6LD9DYA5dFmkcEv6xAp9rrGPKaOtq5DHJKMQzEXGEAIeA");
const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash"});
        const chat = model.startChat({history: []});
        const result = await chat.sendMessage(message.body);
        const response = await result.response;
        const text = response.text();
        message.reply(text);
    } catch (error) {
        console.error(error);
    }
});

client.initialize();