const notion = require('../notion-client');
const config = require('../config');

/**
 * Cria uma nova página no Notion
 * @param {string} parentPageId - ID da página pai onde a nova página será criada
 * @param {string} title - Título da página
 * @returns {Promise<Object>} - A página criada
 */
async function createPage(parentPageId, title) {
  try {
    const response = await notion.pages.create({
      parent: {
        type: 'page_id',
        page_id: parentPageId,
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: 'Esta página foi criada via API do Notion.',
                },
              },
            ],
          },
        },
      ],
    });

    console.log('Página criada com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao criar página:', error.body || error);
    throw error;
  }
}

/**
 * Recupera o conteúdo de uma página no Notion
 * @param {string} pageId - ID da página
 * @returns {Promise<Object>} - A página recuperada
 */
async function getPage(pageId) {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });

    console.log('Página recuperada com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao recuperar página:', error.body || error);
    throw error;
  }
}

/**
 * Atualiza o título de uma página no Notion
 * @param {string} pageId - ID da página
 * @param {string} newTitle - Novo título da página
 * @returns {Promise<Object>} - A página atualizada
 */
async function updatePageTitle(pageId, newTitle) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        title: {
          title: [
            {
              text: {
                content: newTitle,
              },
            },
          ],
        },
      },
    });

    console.log('Título da página atualizado com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao atualizar título da página:', error.body || error);
    throw error;
  }
}

module.exports = {
  createPage,
  getPage,
  updatePageTitle,
};

