const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');

const YOUR_USER_ID = '1257675618175422576'; // Замени на свой ID
let currentStatus = 'offline'; // по умолчанию

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

client.on('ready', () => {
    console.log(`✅ Бот ${client.user.tag} запущен!`);
    console.log(`🌐 Следим за статусом пользователя: ${YOUR_USER_ID}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence.userId === YOUR_USER_ID) {
        const status = newPresence.status; // 'online', 'idle', 'dnd', 'offline'
        currentStatus = status;
        console.log(`🔄 Статус обновлён: ${status}`);
    }
});

// Express сервер для API
const app = express();
app.use(cors());

app.get('/api/status', (req, res) => {
    res.json({ status: currentStatus });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`📡 API запущен на порту ${PORT}`);
});

// Запуск бота
client.login(process.env.DISCORD_TOKEN); // токен бота
