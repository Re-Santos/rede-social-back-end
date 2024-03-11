# Labeddit 🚀

## Descrição
Este é o back-end do projeto Labeddit, um projeto integrador que visa criar uma plataforma interativa para compartilhamento de conteúdo. Projeto de conclusão do curso FullStack na Labenu.

## Links de Acesso 🌐
- **Deploy:** [Labeddit no Render](https://labeddit-o4al.onrender.com)
- **API Postman:** [Documentação da API no Postman](https://documenter.getpostman.com/view/28316428/2s9Yyy7d9g)
- **LabEddit Front-End:** [Repositório do LabEddit Front-End](https://github.com/Re-Santos/projeto-fullStack-front)

## Tecnologias Utilizadas 🛠️
- Node.js 
- TypeScript
- Express.js
- SQLite 
- JSON Web Token (JWT) para autenticação

## Requisitos Prévios ⚙️
- Node.js 
- NPM 

## Configuração do Ambiente 🚧
1. Clone este repositório.
2. Abra o terminal e navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências.

## Scripts NPM 
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o código TypeScript.
- `npm start`: Inicia a aplicação em modo de produção.
- `npm test`: Executa os testes unitários. 🧪

## Configuração do Banco de Dados 💾
Certifique-se de ter o SQLite instalado.

## Autenticação 🔐
A autenticação é realizada utilizando JSON Web Token (JWT). Certifique-se de incluir o token no cabeçalho das requisições autorizadas.

## Endpoints da API:

## Users 👥
**Endpoints:**

- **POST /signup**: Cria um novo usuário.
  - Body:
    ```json
    {
      "username": "exemplo",
      "email": "exemplo@email.com",
      "password": "senha123"
    }
    ```

- **POST /login**: Realiza o login e retorna um token JWT.
  - Body:
    ```json
    {
      "email": "exemplo@email.com",
      "password": "senha123"
    }
    ```
- **GET /all**: Busca todos os usuários. (Somente perfis admin, podem realizar a busca)
  - Headers:
    ```
    Authorization: Bearer SEU_TOKEN_JWT
    ```
## Posts 📝
**Endpoints:**
  
- **POST /posts**: Cria uma nova postagem (requer autenticação).
  - Headers:
    ```
    Authorization: Bearer SEU_TOKEN_JWT
    ```
  - Body:
    ```json
    {
      "content": "Conteúdo da postagem"
    }
    ```
- **GET /posts**: Busca todas as postagens.
  - Headers:
    ```
    Authorization: Bearer SEU_TOKEN_JWT
    ```
    
Lembre-se de incluir o token JWT no cabeçalho das requisições autorizadas.

## Testes de Login e Signup 🧪
- **Descrição:** Testes unitários para as funcionalidades de login e signup.
- **Comando:** `npm test`
- **Detalhes:** Os testes garantem o correto funcionamento das rotas de login e signup, verificando se a autenticação e a criação de usuários estão ocorrendo conforme o esperado.

## Como Contribuir 🤝
Sinta-se à vontade para contribuir! Abra uma issue ou envie uma solicitação de pull.

## Contato 📬
Para mais informações, entre em contato com Renata via renata.prog@gmail.com ou [LinkedIn](https://www.linkedin.com/in/s-renata-santos/)
