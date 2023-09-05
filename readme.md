# Api de gerenciamento de tarefas(CRUD)

## Sobre o projeto:
Projeto de uma API RESTful completa, pronta para integração com frontend, todo seu código esta organizado utilizando o padrão MSC (Model-Service-Controller).
Para maior segurança, foi utilizado token JWT para proteger as rotas de criação, atualização e exclusão de tarefas. Fora isso, também foi usada criptografia(bcrypt) para proteger a senha do usuário durante o fluxo de cadastro e login

# Tecnologias utilizadas
## Back end
- Javascript
- Node.js
- Express
- Express validator
- Bcrypt
- Jsonwebtoken
- Sequelize

## Banco de dados
- postgreSQL

## Container
- Docker

# Como executar o projeto
Pré-requisitos: Docker

```bash
# clonar repositório
git clone https://github.com/Rdemora2/api-gerenciamento-tarefas.git

# buildar os containers docker
docker compose build

# subir os containers
docker compose up -d

# abrir shell no container
docker exec -ti nodeApp-task-manager bash

# fazer migrações
npx sequelize-cli db:migrate

# acessar a url da api
backend: http://localhost:3000/
```

# Portas utilizadas
- Backend: 3000
- PostgreSQL: 5432

# Endpoints:
## Registro de Usuário

**Endpoint:** http://localhost:3000/api/auth/register

**Método:** POST

**Formato de Requisição:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "password": "senha_secreta"
}
```

**Formato de Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkzODY3ODQyLCJleHAiOjE2OTM5NTQyNDJ9.5oekHX_68fXeVdAGuB7EtOmHDdrJMzUkVdhe-OAL31s"
}
```
- OBS: token JWT válido por 1 dia

## Login de Usuário

**Endpoint:** http://localhost:3000/api/auth/login

**Método:** POST

**Formato de Requisição:**
```json
{
  "email": "usuario@example.com",
  "password": "senha"
}
```

**Formato de Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkzODY3ODQyLCJleHAiOjE2OTM5NTQyNDJ9.5oekHX_68fXeVdAGuB7EtOmHDdrJMzUkVdhe-OAL31s"
}
```
- OBS: token JWT válido por 1 dia

## Criação de Tarefa

**Endpoint:** http://localhost:3000/api/tasks

**Método:** POST

**Formato de Requisição:**
```json
{
    "title": "Nome da Tarefa",
    "description": "Descrição da tarefa",
    "status": "Status da tarefa",
    "token": "Token de Acesso JWT"
}
```
- Campos de status Aceitos: 'pendente', 'em andamento', 'concluída'

**Formato de Resposta:**
```json
{
  "id": 1,
    "title": "Nome da Tarefa",
    "description": "Descrição da tarefa",
    "status": "Status da tarefa",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
}
```

## Listagem geral de Tarefas

**Endpoint:** http://localhost:3000/api/tasks

**Método:** GET

**Formato de Requisição:**
```json
```
- Esse endpoint não necessita de nada na requisição, nem do token, pois serve apenas para visualização das tarefas

**Formato de Resposta:**
```json
[
  {
    "id": 1,
    "title": "Nome da Tarefa",
    "description": "Descrição da tarefa",
    "status": "Status da tarefa",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  },
  {
    "id": 2,
    "title": "Nome da Tarefa 2",
    "description": "Descrição da tarefa 2",
    "status": "Status da tarefa",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
]
```

## Listagem Tarefa por ID

**Endpoint:** http://localhost:3000/api/tasks/{taskID_desejado}

**Método:** GET

**Formato de Requisição:**
```json
```
- Esse endpoint não necessita de nada na requisição, nem do token, pois serve apenas para visualização da tarefa

**Formato de Resposta:**
```json
{
  "id": "{taskID}",
  "title": "Minha Tarefa",
  "description": "Esta é uma descrição da minha tarefa",
  "status": "em andamento",
  "createdAt": "Data de Criação",
  "updatedAt": "Data de Atualização"
}
```

## Listagem Tarefa por status

**Endpoint:** http://localhost:3000/api/tasks/status/{status_desejado}

**Método:** GET

**Formato de Requisição:**
```json
```
- Esse endpoint não necessita de nada na requisição, nem do token, pois serve apenas para visualização das tarefas

**Formato de Resposta:**
```json
[
  {
    "id": 1,
    "title": "Nome da Tarefa",
    "description": "Descrição da tarefa",
    "status": "Status da tarefa",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  },
  {
    "id": 2,
    "title": "Nome da Tarefa 2",
    "description": "Descrição da tarefa 2",
    "status": "Status da tarefa",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
  }
]
```

## Edição de Tarefa

**Endpoint:** http://localhost:3000/api/tasks/{taskID_desejado}

**Método:** PUT

**Formato de Requisição:**
```json
{
    "title": "Nome da Tarefa",
    "description": "Descrição da tarefa",
    "status": "Status da tarefa",
    "token": "Token de Acesso JWT"
}
```
- Campos de status Aceitos: 'pendente', 'em andamento', 'concluída'

**Formato de Resposta:**
```json
{
    "id": "{taskID}",
    "title": "Nome da Tarefa",
    "description": "Descrição da tarefa",
    "status": "Status da tarefa",
    "createdAt": "Data de Criação",
    "updatedAt": "Data de Atualização"
}
```

## Exclusão de Tarefa

**Endpoint:** http://localhost:3000/api/tasks/{taskID_desejado}

**Método:** DELETE

**Formato de Requisição:**
```json
{
  "token": "Token de Acesso JWT"
}
```
- Campos de status Aceitos: 'pendente', 'em andamento', 'concluída'

**Formato de Resposta:**
```json
```
- Esse endpoint não retorna nada, caso obtenha sucesso na exclusão

# Autor

Roberto de Moraes

https://www.linkedin.com/in/robertomoraeszarzur/