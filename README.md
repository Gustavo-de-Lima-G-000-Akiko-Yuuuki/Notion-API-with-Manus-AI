# Exemplo de Integração com a API do Notion

Este é um exemplo prático de como integrar a API do Notion com uma aplicação Node.js. O exemplo demonstra como criar, ler, atualizar e excluir conteúdo no Notion usando a API oficial.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Uma conta no Notion
- Um token de integração do Notion

## Instalação

1. Clone este repositório
2. Execute `npm install` para instalar as dependências
3. Crie um arquivo `.env` na raiz do projeto e adicione seu token de integração fiz um exemplo de .env exemple:

```
NOTION_API_TOKEN=seu_token_aqui
```

## Estrutura do Projeto

- `index.js`: Ponto de entrada da aplicação
- `config.js`: Configurações da aplicação
- `notion-client.js`: Cliente para interagir com a API do Notion
- `examples/`: Exemplos de uso da API do Notion
  - `database-examples.js`: Exemplos de operações com bancos de dados
  - `page-examples.js`: Exemplos de operações com páginas
  - `block-examples.js`: Exemplos de operações com blocos

## Como Usar

Execute `node index.js` para iniciar a aplicação. Você pode modificar o arquivo `index.js` para testar diferentes exemplos.

## Exemplos Incluídos

- Criar um banco de dados
- Adicionar itens a um banco de dados
- Consultar itens em um banco de dados
- Atualizar itens em um banco de dados
- Criar uma página
- Adicionar blocos a uma página
- Atualizar blocos em uma página

