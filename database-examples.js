const notion = require('../notion-client');
const config = require('../config');

/**
 * Cria um novo banco de dados no Notion
 * @param {string} parentPageId - ID da página pai onde o banco de dados será criado
 * @param {string} title - Título do banco de dados
 * @returns {Promise<Object>} - O banco de dados criado
 */
async function createDatabase(parentPageId, title) {
  try {
    const response = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: parentPageId,
      },
      title: [
        {
          type: 'text',
          text: {
            content: title,
          },
        },
      ],
      properties: {
        Nome: {
          title: {},
        },
        Status: {
          select: {
            options: [
              {
                name: 'Pendente',
                color: 'red',
              },
              {
                name: 'Em Progresso',
                color: 'yellow',
              },
              {
                name: 'Concluído',
                color: 'green',
              },
            ],
          },
        },
        Prioridade: {
          select: {
            options: [
              {
                name: 'Baixa',
                color: 'blue',
              },
              {
                name: 'Média',
                color: 'yellow',
              },
              {
                name: 'Alta',
                color: 'red',
              },
            ],
          },
        },
        'Data de Vencimento': {
          date: {},
        },
        Responsável: {
          people: {},
        },
        Notas: {
          rich_text: {},
        },
      },
    });

    console.log('Banco de dados criado com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao criar banco de dados:', error.body || error);
    throw error;
  }
}

/**
 * Adiciona um item a um banco de dados no Notion
 * @param {string} databaseId - ID do banco de dados
 * @param {Object} item - Dados do item a ser adicionado
 * @returns {Promise<Object>} - O item criado
 */
async function addDatabaseItem(databaseId, item) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Nome: {
          title: [
            {
              text: {
                content: item.nome,
              },
            },
          ],
        },
        Status: {
          select: {
            name: item.status,
          },
        },
        Prioridade: {
          select: {
            name: item.prioridade,
          },
        },
        'Data de Vencimento': {
          date: {
            start: item.dataVencimento,
          },
        },
        Notas: {
          rich_text: [
            {
              text: {
                content: item.notas || '',
              },
            },
          ],
        },
      },
    });

    console.log('Item adicionado com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao adicionar item:', error.body || error);
    throw error;
  }
}

/**
 * Consulta itens em um banco de dados no Notion
 * @param {string} databaseId - ID do banco de dados
 * @param {Object} filter - Filtro para a consulta (opcional)
 * @returns {Promise<Array>} - Lista de itens encontrados
 */
async function queryDatabase(databaseId, filter = null) {
  try {
    const queryParams = {
      database_id: databaseId,
    };

    if (filter) {
      queryParams.filter = filter;
    }

    const response = await notion.databases.query(queryParams);
    console.log(`${response.results.length} itens encontrados.`);
    return response.results;
  } catch (error) {
    console.error('Erro ao consultar banco de dados:', error.body || error);
    throw error;
  }
}

/**
 * Atualiza um item em um banco de dados no Notion
 * @param {string} pageId - ID da página (item) a ser atualizada
 * @param {Object} properties - Propriedades a serem atualizadas
 * @returns {Promise<Object>} - O item atualizado
 */
async function updateDatabaseItem(pageId, properties) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties,
    });

    console.log('Item atualizado com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao atualizar item:', error.body || error);
    throw error;
  }
}

module.exports = {
  createDatabase,
  addDatabaseItem,
  queryDatabase,
  updateDatabaseItem,
};

