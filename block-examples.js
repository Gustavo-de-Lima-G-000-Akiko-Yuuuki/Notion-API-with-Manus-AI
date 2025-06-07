const notion = require('../notion-client');
const config = require('../config');

/**
 * Adiciona blocos a uma página no Notion
 * @param {string} pageId - ID da página
 * @param {Array} blocks - Blocos a serem adicionados
 * @returns {Promise<Object>} - Resposta da API
 */
async function addBlocks(pageId, blocks) {
  try {
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: blocks,
    });

    console.log('Blocos adicionados com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao adicionar blocos:', error.body || error);
    throw error;
  }
}

/**
 * Recupera os blocos filhos de um bloco ou página no Notion
 * @param {string} blockId - ID do bloco ou página
 * @returns {Promise<Array>} - Lista de blocos filhos
 */
async function getChildBlocks(blockId) {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });

    console.log(`${response.results.length} blocos encontrados.`);
    return response.results;
  } catch (error) {
    console.error('Erro ao recuperar blocos:', error.body || error);
    throw error;
  }
}

/**
 * Atualiza um bloco no Notion
 * @param {string} blockId - ID do bloco
 * @param {Object} content - Novo conteúdo do bloco
 * @returns {Promise<Object>} - O bloco atualizado
 */
async function updateBlock(blockId, content) {
  try {
    const response = await notion.blocks.update({
      block_id: blockId,
      ...content,
    });

    console.log('Bloco atualizado com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao atualizar bloco:', error.body || error);
    throw error;
  }
}

/**
 * Exclui um bloco no Notion
 * @param {string} blockId - ID do bloco
 * @returns {Promise<Object>} - Resposta da API
 */
async function deleteBlock(blockId) {
  try {
    const response = await notion.blocks.delete({
      block_id: blockId,
    });

    console.log('Bloco excluído com sucesso!');
    return response;
  } catch (error) {
    console.error('Erro ao excluir bloco:', error.body || error);
    throw error;
  }
}

/**
 * Cria um bloco de parágrafo
 * @param {string} text - Texto do parágrafo
 * @returns {Object} - Objeto de bloco de parágrafo
 */
function createParagraphBlock(text) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: text,
          },
        },
      ],
    },
  };
}

/**
 * Cria um bloco de título
 * @param {string} text - Texto do título
 * @param {string} level - Nível do título (1, 2 ou 3)
 * @returns {Object} - Objeto de bloco de título
 */
function createHeadingBlock(text, level = '1') {
  const headingType = `heading_${level}`;
  return {
    object: 'block',
    type: headingType,
    [headingType]: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: text,
          },
        },
      ],
    },
  };
}

/**
 * Cria um bloco de lista com marcadores
 * @param {string} text - Texto do item da lista
 * @returns {Object} - Objeto de bloco de lista com marcadores
 */
function createBulletedListItemBlock(text) {
  return {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: text,
          },
        },
      ],
    },
  };
}

/**
 * Cria um bloco de lista numerada
 * @param {string} text - Texto do item da lista
 * @returns {Object} - Objeto de bloco de lista numerada
 */
function createNumberedListItemBlock(text) {
  return {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: text,
          },
        },
      ],
    },
  };
}

/**
 * Cria um bloco de código
 * @param {string} code - Código
 * @param {string} language - Linguagem do código
 * @returns {Object} - Objeto de bloco de código
 */
function createCodeBlock(code, language = 'javascript') {
  return {
    object: 'block',
    type: 'code',
    code: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: code,
          },
        },
      ],
      language,
    },
  };
}

module.exports = {
  addBlocks,
  getChildBlocks,
  updateBlock,
  deleteBlock,
  createParagraphBlock,
  createHeadingBlock,
  createBulletedListItemBlock,
  createNumberedListItemBlock,
  createCodeBlock,
};

