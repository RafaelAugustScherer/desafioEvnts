# Uaifood API (Evnts) 🍔

O desafio consiste na criação de uma API para um aplicativo de entrega/venda de alimentos.

Dentre as funcionalidades está a criação de usuários, vendedores, restaurantes e itens a serem vendidos pelos restaurantes, além de implementações de busca que envolvem geolocalização

> Observação: Os cálculos de geolocalização não envolvem uma API externa, devido à limitação de uso e necessidade de informar dados financeiros para obter acesso. Os cálculos são feitos de acordo com a fórmula *haversine*, onde a distância é calculada através de uma linha reta entre as duas cordenadas. 

---
## Deploy no Heroku

- O Deploy da aplicação é feito a partir do GitHub Actions em forma de Container para o [Heroku](https://www.heroku.com/).

- O back-end está disponibilizado em um servidor Node.js no Heroku a partir do tradicional `npm start`

- O banco de dados não relacional (NoSQL) MongoDB está hospedado no [MongoDB Atlas](https://www.mongodb.com/atlas/database)

- **Link da aplicação em funcionamento: https://uaifood-api.herokuapp.com/**

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
  
  - Rode o comando `npm run dev` para inicializar em modo de desenvolvimento;
  - Rode o comando `npm start` para inicializar em modo de produção;

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
  
  - Rode o comando `npm run dev:docker` para inicializar em modo de desenvolvimento;
  - Rode o comando `npm run start:docker` para inicializar em modo de produção;

  ## Acessar a aplicação 🍕
  
  - Você pode acessar a aplicação via [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
  - **Coleção de Rotas para o Postman está disponibilizada [aqui!](/desafioEvnts.postman_collection.json)**

---
</details>

## Tecnologias e Bibliotecas Utilizadas

  - <img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" alt="Node.js Logo" width="15"/> Node.js
    - Typescript
    - Express
    - Mongoose
    - Mocha
    - Chai + chaiHttp
  - <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB Logo" width="15"/> MongoDB
  - <img src="https://www.docker.com/favicon.ico" alt="Docker Logo" width="15"/> Docker


## Referências a outros projetos

Neste projeto foram utilizados alguns recursos e sintaxe de código inspirados em outros projetos que já havia realizado:

- 🏅 [TrybeRank](https://github.com/RafaelAugustScherer/trybe-rank): Deploy no Heroku

- 🟨 [TodoListChallenge](https://github.com/RafaelAugustScherer/todoListChallenge): Desafio Técnico Fictício da Trybe

- ✏️ [DesafioIK](https://github.com/RafaelAugustScherer/desafioIK): Implementação de API em Typescript
