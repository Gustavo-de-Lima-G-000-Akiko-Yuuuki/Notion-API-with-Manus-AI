const { Client } = require('@notionhq/client');
const config = require('./config');

// Inicializa o cliente da API do Notion
const notion = new Client({
  auth: config.notionApiToken,
});

module.exports = notion;

