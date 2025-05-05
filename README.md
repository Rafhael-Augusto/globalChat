Como rodar o projeto:

1- Crie uma pasta e faca o clone do projeto, no terminal:

mkdir chatGlobal
cd chatGlobal
git clone git@github.com:Rafhael-Augusto/globalChat.git
cd globalChat

2- Crie um banco de dados, no terminal:
 
sudo -u postgres psql
CREATE DATABASE messages;
\q

3- Crie o arquivo .env no back end

entre na pasta chatGlobal > globalCharBackEnd
crie um arquivo chamado '.env' ( sem aspas )

dentro desse arquivo, cole o seguinte:

DB_NAME=messages
DB_USER=**seu usuario psql**
DB_PASSWORD=**senha do banco de dados**
DB_HOST=db
DB_POST=5432

3- Build usando docker, no terminal na pasta 'globalChat':

docker-compose build
docker-compose up

4- Migracoes do bando de dados:

abra outro terminal
use cd para ir para a pasta 'globalChat' no novo terminal
cole o comando: docker-compose exec backend python manage.py makemigrations
em seguida, cole: docker-compose exec backend python manage.py migrate

5- Clique nos links para acessar o Front end e o Back end:

Front end: http://localhost:3000/
Back end: http://localhost:8000/
