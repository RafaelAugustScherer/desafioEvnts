# Uaifood API (Evnts) 🍔

O desafio consiste na criação de uma API para um aplicativo de entrega/venda de alimentos.

Dentre as funcionalidades está a criação de usuários, vendedores, restaurantes e itens a serem vendidos pelos restaurantes, além de implementações de busca que envolvem geolocalização

> Observação: Os cálculos de geolocalização não envolvem uma API externa, devido à limitação de uso e necessidade de informar dados financeiros para obter acesso. Os cálculos são feitos de acordo com a fórmula *haversine*, onde a distância é calculada através de uma linha reta entre as duas cordenadas. 

---
## Deploy no Heroku

- O Deploy da aplicação é feito a partir do GitHub Actions em forma de Container para o [Heroku](https://www.heroku.com/).

- O back-end está disponibilizado em um servidor Node.js no Heroku a partir do tradicional `npm start`

- O banco de dados não relacional (NoSQL) MongoDB está hospedado no [MongoDB Atlas](https://www.mongodb.com/atlas/database)

- **Link da aplicação em funcionamento: https://uaifood-back.herokuapp.com/**

---
## Como rodar o projeto

<details>
  <summary>📦Rodar localmente com NPM 📦</summary>

  ## Requisitos 📝

  - [Node.js](https://nodejs.org/)

  ## Setup 🔧

  Antes de iniciar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

  ### Configurar o ambiente (.env)

  - Altere o arquivo `.env.example` com as suas variáveis de ambiente:
  
    ```
      MONGODB_USERNAME=user_example // Usuário do banco MongoDB
      MONGODB_PASSWORD=Strong_Password123 // Senha do banco MongoDB
      JWT_SECRET=Strong_Password123 // Senha para encriptar tokens de autenticação do usuário
      PORT=3001 // Opcional - Porta onde a sua aplicação vai rodar (Padrão 3001)
    ```
  - Renomeie o arquivo para `.env`
  
  ### Instalar dependências
  
  - Rode o comando `npm install` na raiz do projeto

  ## Inicializar a aplicação ▶️
  
  - Rode o comando `npm run dev` para inicializar em modo de desenvolvimento **(banco de dados isolado)**
    - Você precisa de um banco de dados MongoDB rodando em `localhost:3002` para que esse comando funcione
    - Verifique a [Sessão de Docker](#inicializar-a-aplica%C3%A7%C3%A3o-%EF%B8%8F-1) para uma maneira mais simples de executar esse comando.
  - Rode o comando `npm start` para inicializar em modo de produção **(banco de dados da aplicação)**

  ## Acessar a aplicação 🍕
  
  - Você pode acessar a aplicação via [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
  - **Coleção de Rotas para o Postman está disponibilizada [aqui!](/desafioEvnts.postman_collection.json)**
  ---
</details>

<details>
  <summary>🐋 Rodar localmente com o Docker 🐋</summary>

  ## Requisitos 📝

  - [Docker](https://www.docker.com/get-started/)

  ## Setup 🔧

  Antes de iniciar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

  ### Configurar o ambiente (.env)

  - Altere o arquivo `.env.example` com as suas variáveis de ambiente:
  
    ```
      MONGODB_USERNAME=user_example // Usuário do banco MongoDB
      MONGODB_PASSWORD=Strong_Password123 // Senha do banco MongoDB
      JWT_SECRET=Strong_Password123 // Senha para encriptar tokens de autenticação do usuário
      PORT=3001 // Opcional - Porta onde a sua aplicação vai rodar (Padrão 3001)
    ```
  - Renomeie o arquivo para `.env`

  ## Inicializar a aplicação ▶️
  
  - Rode o comando `npm run dev:docker` para inicializar em modo de desenvolvimento **(banco de dados isolado)**
  - Rode o comando `npm run start:docker` para inicializar em modo de produção **(banco de dados da aplicação)**

  ## Acessar a aplicação 🍕
  
  - Você pode acessar a aplicação via [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
  - **Coleção de Rotas para o Postman está disponibilizada [aqui!](/desafioEvnts.postman_collection.json)**

---
</details>

## Como Testar a aplicação

### Requisitos 📝
  - [Node.js](https://nodejs.org/)
  - [Docker](https://www.docker.com/get-started/)
  
### Setup 🔧

Execute o comando `npm install` para instalar as dependências do projeto.
  
### Rodando os testes ▶️

Rode o comando `npm run test` e veja a mágica acontecer! Os testes executam em um banco de dados isolado, por isso não é necessária nenhuma configuração adicional.

## Tecnologias e Bibliotecas Utilizadas

  - <img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" alt="Node.js Logo" width="15"/> Node.js
    - Typescript
    - ESLint
    - Express
    - Mongoose
    - Mocha
    - Chai + chaiHttp
    - jsonwebtoken + md5
  - <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB Logo" width="15"/> MongoDB
  - <img src="https://www.docker.com/favicon.ico" alt="Docker Logo" width="15"/> Docker

### Node.js <img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" alt="Node.js Logo" width="20"/>

O Node.js foi escolhido porque promove alta compatibilidade e bibliotecas focadas em aplicações web. Junto disso, posso apontar a familiaridade que já tenho com a ferramenta.

 - Dentre as bibliotecas usei o **TypeScript** e o **ESLint**, que serviram como testes estáticos e facilitaram a identificação de erros durante o desenvolvimento.
- O **Express** foi usado junto do **Mongoose** para criar a aplicação em si. Essas bibliotecas permitiram a criação de uma API que responde à requisições HTTP e conecta ao banco de dados para enviar e receber dados.
- O **Mocha** foi usado junto da biblioteca **chai** e o plug-in **chaiHttp** para criar os testes de integração.
- As bibliotecas **jsonwebtoken** e **md5** foram utilizadas para lidar com questões de autenticação de usuário e criptografia.

### MongoDB <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB Logo" width="20"/>

O MongoDB foi escolhido como tecnologia de banco de dados não relacional para salvar os dados da aplicação. A escolha se deu especialmente pela facilidade de uso, criação e manipulação de dados, além da facilidade de disponibilizar o banco de dados através do MongoDB Atlas.

Dependendo do caso de uso, onde questões estruturais e de confiança do banco de dados são importantes (salvar dados de usuários/financeiros), pessoalmente prefiro um banco de dados relacional como MySQL ou PostgreSQL.

### Docker <img src="https://www.docker.com/favicon.ico" alt="Docker Logo" width="20"/>

Escolhi usar o Docker como mecanismo principal para executar a API. Tanto o deploy como os testes de integração dependem de uma ou mais implementações Docker.

É uma decisão que para mim faz sentido visando descomplicar ao máximo os requisitos necessários para rodar a aplicação, além de padronizar o banco de dados e o ambiente de desenvolvimento para o time de desenvolvimento.

## Referências a outros projetos

Neste projeto foram utilizados alguns recursos e sintaxe de código inspirados em outros projetos que já havia realizado:

- 🏅 [TrybeRank](https://github.com/RafaelAugustScherer/trybe-rank): Deploy no Heroku

- 🟨 [TodoListChallenge](https://github.com/RafaelAugustScherer/todoListChallenge): Desafio Técnico Fictício da Trybe

- ✏️ [DesafioIK](https://github.com/RafaelAugustScherer/desafioIK): Implementação de API em Typescript
