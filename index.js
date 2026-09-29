const { Client } = require('whatsapp-web.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const qrcode = require('qrcode-terminal');

const genAI = new GoogleGenerativeAI("Ab8RN6LD9DYA5dFmkcEv6xAp9rrGPKaOtq5DHJKMQzEXGEAIeA");

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
