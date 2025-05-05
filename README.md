# Global Chat

Minha primeira tentativa em criar um chat global

## Como rodar o projeto:

### 1. Crie uma pasta e faça o clone do projeto, no terminal:

```
mkdir chatGlobal
cd chatGlobal
git clone git@github.com:Rafhael-Augusto/globalChat.git
cd globalChat
```

2. Crie o arquivo .env no back-end:

   Entre na pasta chatGlobal
   
   Crie um arquivo chamado '.env' (sem aspas)

   Dentro desse arquivo, cole o seguinte:
```
DB_NAME=messages
DB_USER=**seu usuário psql**
DB_PASSWORD=**senha do banco de dados**
DB_HOST=db
DB_PORT=5433
```
3. Build usando Docker, no terminal na pasta globalChat:
```
docker-compose build
docker-compose up
```
4. Migrações do banco de dados:

   Abra outro terminal
   
   Use cd para ir para a pasta globalChat no novo terminal
   
   Cole os comandos abaixo:
```
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```
5. Acesse o front-end e o back-end:

Front-end: http://localhost:3000/

Back-end: http://localhost:8000/

--

Tecnologias utilizadas:

React Vite

TypeScript

Styled Components

React Router DOM

Consumo de API

Django

PostgreSQL

JSON Web Tokens (JWT)

Docker

Docker Compose


IMAGENS UTILIZADAS:

https://icon-icons.com/icon/email-envelope-outline-shape-with-rounded-corners/56530

https://icon-icons.com/icon/username-user/97587

https://icon-icons.com/icon/key-silhouette-security-tool-interface-symbol-of-password/54503

https://br.pinterest.com/joanaloly21/perfil-do-tik-tok/

