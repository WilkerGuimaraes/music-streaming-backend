# Music Streaming Backend

## 📃 Descrição

Este é um projeto backend de streaming de música desenvolvido com Node, Fastify, TypeScript, Prisma e Zod. A aplicação fornece uma API RESTful para gerenciar músicas, artistas, álbuns e playlists, incluindo funcionalidades como adicionar músicas, criar playlists, adicionar músicas a playlists e mais. O projeto utiliza o banco de dados PostgreSQL, gerenciado pelo Prisma, e validação de dados com Zod.

## Requisitos

### Requisitos funcionais

- **Criação de Música:** Endpoint `POST /songs` para adicionar uma nova música.
- **Listagem de Músicas:** Endpoint `GET /songs` para listar todas as músicas. Suporta filtros por `title`, `artistName` e `albumTitle`.
- **Criação de Artista:** Endpoint `GET /artists` para listar todos os artistas, com contagem de músicas e álbuns.
- **Criação de Playlist:** Endpoint `POST /playlists` para criar uma playlist.
- **Adicionar Músicas a Playlist:** Endpoint `PUT /playlists/{playlistId}/songs` para adicionar músicas a uma playlist.
- **Listagem de Playlists:** Endpoint `GET /playlists` para listar todas as playlists.
- **Deleção de Playlist:** Endpoint `DELETE /playlists/{playlistId}` para deletar uma playlist.
- **Deleção de Música:** Endpoint `DELETE /songs/{songId}` para deletar uma música de uma playlist.

### Regras de negócio

- **Validação de Músicas:** Ao criar uma música, o título deve ter pelo menos 3 caracteres e o nome do artista também deve ter pelo menos 3 caracteres.
- **Validação de Playlists:** As playlists devem ter um nome com pelo menos 3 caracteres.
- **Paginação e Pesquisa:** Suporte para paginação nas listagens de músicas e artistas, com filtro opcional por nome, título ou artista.

## 🛠 Tecnologias

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Este projeto utiliza as seguintes tecnologias:

- **Fastify:** Framework web rápido e eficiente.
- **Prisma:** ORM para facilitar a interação com o banco de dados PostgreSQL.
- **Zod:** Biblioteca de validação para garantir que os dados recebidos estejam no formato correto.
- **PostgreSQL:** Banco de dados relacional utilizado para persistência de dados.

## 🧰 Configuração

1. **Instalação das dependências:**

   Instale as dependências do projeto com o seguinte comando:

   ```bash
   npm install
   ```
2. **Configuração do banco de dados:**
    
    Configure o banco de dados PostgreSQL utilizando o Docker Compose. O arquivo `docker-compose.yml` já está configurado para rodar um banco PostgreSQL.
    
    Para iniciar o banco de dados com Docker, execute:
    
    ```bash
    docker-compose up
    ```
        
    Isso irá iniciar o PostgreSQL na porta `5432`.
    
2. **Rodar o servidor de desenvolvimento:**
    
    Após instalar as dependências e configurar o banco de dados, inicie o servidor de desenvolvimento com:
    
    ```bash
    npm run dev
    ```
    
3. **Rodar o seed de dados (opcional):**
    
    Se desejar popular o banco de dados com dados iniciais, execute:
    
    ```bash
    npm run seed
    ```
    

## 📜 Documentação da API

A API está documentada utilizando o Fastify Swagger. Para acessar a documentação interativa, abra o seguinte endereço no seu navegador:

```
http://localhost:3333/docs
```

## 🙋‍♂️ Colaboradores

Este projeto foi desenvolvido por Wilker Guimarães. Acesse o repositório frontend relacionado [aqui](https://github.com/WilkerGuimaraes/music-streaming-frontend).
