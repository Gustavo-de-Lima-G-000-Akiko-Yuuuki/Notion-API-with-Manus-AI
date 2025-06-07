require('dotenv').config();

module.exports = {
  notionApiToken: process.env.NOTION_API_TOKEN,
  databaseId: process.env.DATABASE_ID || '',
  pageId: process.env.PAGE_ID || ''
};

