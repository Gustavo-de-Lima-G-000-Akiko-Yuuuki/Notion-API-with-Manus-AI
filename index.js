require('dotenv').config();
const config = require('./config');
const databaseExamples = require('./examples/database-examples');
const pageExamples = require('./examples/page-examples');
const blockExamples = require('./examples/block-examples');

// Verifica se o token da API do Notion está configurado
if (!config.notionApiToken) {
  console.error('Erro: Token da API do Notion não configurado. Crie um arquivo .env com NOTION_API_TOKEN=seu_token_aqui');
  process.exit(1);
}

async function runDatabaseExamples() {
  console.log('\n=== Exemplos de Banco de Dados ===\n');

  // Para executar este exemplo, você precisa fornecer o ID de uma página pai
  // onde o banco de dados será criado
  if (config.pageId) {
    try {
      // Criar um banco de dados
      const database = await databaseExamples.createDatabase(
        config.pageId,
        'Tarefas'
      );
      
      console.log(`Banco de dados criado: ${database.id}`);
      
      // Adicionar itens ao banco de dados
      const item1 = await databaseExamples.addDatabaseItem(database.id, {
        nome: 'Implementar integração com API',
        status: 'Em Progresso',
        prioridade: 'Alta',
        dataVencimento: '2025-06-15',
        notas: 'Integrar com a API do Notion para sincronizar dados',
      });
      
      const item2 = await databaseExamples.addDatabaseItem(database.id, {
        nome: 'Testar funcionalidades',
        status: 'Pendente',
        prioridade: 'Média',
        dataVencimento: '2025-06-20',
        notas: 'Realizar testes de integração e unitários',
      });
      
      // Consultar itens no banco de dados
      const items = await databaseExamples.queryDatabase(database.id);
      console.log('Itens no banco de dados:');
      items.forEach((item) => {
        console.log(`- ${item.properties.Nome.title[0]?.text.content || 'Sem título'}`);
      });
      
      // Atualizar um item no banco de dados
      if (items.length > 0) {
        await databaseExamples.updateDatabaseItem(items[0].id, {
          Status: {
            select: {
              name: 'Concluído',
            },
          },
        });
        console.log('Primeiro item atualizado para "Concluído"');
      }
    } catch (error) {
      console.error('Erro ao executar exemplos de banco de dados:', error);
    }
  } else {
    console.log('Para executar exemplos de banco de dados, configure PAGE_ID no arquivo .env');
  }
}

async function runPageExamples() {
  console.log('\n=== Exemplos de Páginas ===\n');

  // Para executar este exemplo, você precisa fornecer o ID de uma página pai
  if (config.pageId) {
    try {
      // Criar uma página
      const page = await pageExamples.createPage(
        config.pageId,
        'Minha Página de Teste'
      );
      
      console.log(`Página criada: ${page.id}`);
      
      // Recuperar a página
      const retrievedPage = await pageExamples.getPage(page.id);
      console.log('Página recuperada:', retrievedPage.id);
      
      // Atualizar o título da página
      await pageExamples.updatePageTitle(page.id, 'Minha Página Atualizada');
      console.log('Título da página atualizado');
    } catch (error) {
      console.error('Erro ao executar exemplos de páginas:', error);
    }
  } else {
    console.log('Para executar exemplos de páginas, configure PAGE_ID no arquivo .env');
  }
}

async function runBlockExamples() {
  console.log('\n=== Exemplos de Blocos ===\n');

  // Para executar este exemplo, você precisa fornecer o ID de uma página
  if (config.pageId) {
    try {
      // Adicionar blocos a uma página
      const blocks = [
        blockExamples.createHeadingBlock('Seção de Exemplo', '1'),
        blockExamples.createParagraphBlock('Este é um parágrafo de exemplo criado via API do Notion.'),
        blockExamples.createHeadingBlock('Lista de Tarefas', '2'),
        blockExamples.createBulletedListItemBlock('Tarefa 1: Implementar integração'),
        blockExamples.createBulletedListItemBlock('Tarefa 2: Testar funcionalidades'),
        blockExamples.createBulletedListItemBlock('Tarefa 3: Documentar código'),
        blockExamples.createHeadingBlock('Exemplo de Código', '2'),
        blockExamples.createCodeBlock('console.log("Hello, Notion API!");', 'javascript'),
      ];
      
      const addedBlocks = await blockExamples.addBlocks(config.pageId, blocks);
      console.log(`${addedBlocks.results.length} blocos adicionados`);
      
      // Recuperar blocos filhos
      const childBlocks = await blockExamples.getChildBlocks(config.pageId);
      console.log('Blocos filhos recuperados');
      
      // Atualizar um bloco (se houver algum bloco de parágrafo)
      const paragraphBlock = childBlocks.find(block => block.type === 'paragraph');
      if (paragraphBlock) {
        await blockExamples.updateBlock(paragraphBlock.id, {
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: 'Este parágrafo foi atualizado via API do Notion.',
                },
              },
            ],
          },
        });
        console.log('Bloco de parágrafo atualizado');
      }
    } catch (error) {
      console.error('Erro ao executar exemplos de blocos:', error);
    }
  } else {
    console.log('Para executar exemplos de blocos, configure PAGE_ID no arquivo .env');
  }
}

async function main() {
  console.log('Iniciando exemplos de integração com a API do Notion...\n');
  
  if (!config.pageId) {
    console.log('Aviso: Para executar todos os exemplos, configure PAGE_ID no arquivo .env');
    console.log('Alguns exemplos serão ignorados.\n');
  }
  
  // Executar exemplos
  await runDatabaseExamples();
  await runPageExamples();
  await runBlockExamples();
  
  console.log('\nExemplos concluídos!');
}

main().catch(error => {
  console.error('Erro ao executar exemplos:', error);
  process.exit(1);
});

