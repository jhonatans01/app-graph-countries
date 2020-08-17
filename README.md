## Contexto

A aplicação foi desenvolvida em [React.JS](https://pt-br.reactjs.org/), usando o [Apollo Client](https://www.apollographql.com/docs/react/)
para gerenciamento de estado.

Para alteração em local, foram usadas [variáveis reativas](https://www.apollographql.com/docs/react/local-state/reactive-variables/),
portanto é necessário usar as rotas do sistema para alterações locais
(barra de busca, link de início, botão de detalhes, etc).
Ao dar refresh no browser, as alterações locais serão apagadas, e os dados
do servidor serão retornados.  

A aplicação não é responsiva, e adaptada somente em resoluções mais altas
(computadores de mesa, laptops, etc).

Para abrir a aplicação online, usar este link: https://app-graph-countries.herokuapp.com/


## Scripts úteis

### `npm install` ou `npm i`

Instala as dependências do projeto

### `npm run start:dev`

Roda o app em modo de desenvolvimento <br />

Abrir [http://localhost:8080](http://localhost:8080) para ver no browser.

### `npm run start  `

Roda o app em modo de deploy (não faz reload em caso de modificação e necessita dos arquivos gerados pelo build) <br />

Para usar a aplicação com este comando, é necessário rodar `npm build` antes.

Abrir [http://localhost:8080](http://localhost:8080) para ver no browser.

### `npm test` ou `npm t`

Roda todos os testes.

### `npm test -- --coverage` ou `npm t -- --coverage`

Roda todos os testes e gera um relatório de cobertura.

### `npm run test:watch`

Abre o jest em modo de watch. Ver a [documentação do JEST](https://jestjs.io/docs/en/cli#--watchall) para mais detalhes.

### `npm build`

Constrói a pasta `dist` que contém os arquivos para deploy em produção.