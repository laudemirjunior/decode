# Documentação

Algumas rotas dessa API requerem autenticação para acessá-la.

API Rest

Base URL: https://delc.herokuapp.com/

Caso queira fazer testes no Insomia: [Download Workspace do Insomnia](https://drive.google.com/file/d/145rtXUuUb17gKAh001Nwa3hZZs8dOL2k/view?usp=sharing)

# Registrar um usuário

Esta rota registra um novo usuário no banco de dados.

`POST /register - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "laudemir",
  "email": "laudemir@gmail.com",
  "password": "laudemir",
  "confirmPassword": "laudemir"
}
```

`FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "msg": "created user"
}
```

# Logar com um usuário

Esta rota faz o login de um usuário.

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "laudemir@gmail.com",
  "password": "laudemir"
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmI5NzU5OTQ5NDZmZGUyOGVjYWZmYSIsImlhdCI6MTY0NzAzNTUzMn0.YAm7mkgRE2RBnGgZtG1S1sqx8eME2dLbHlD7HkXqYZg",
  "id": "622b975994946fde28ecaffa"
}
```

# Buscar informaçãoes do usuário logado

Busca os dados do usuário do banco de dados menos a senha.

Está rota requer autenticação.

`GET /url/:id_usuário - FORMATO DA REQUISIÇÃO`

```
Não há

```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "_id": "622b975994946fde28ecaffa",
  "name": "Laudemir",
  "email": "laudemir@gmail.com",
  "__v": 0
}
```

# Buscar URLs

Buscar todas as URLs do banco de dados como também a quantidade de visitas.

`GET / - FORMATO DA REQUISIÇÃO`

```
Não há

```

`FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"url": "www.submarino.com.br",
		"code": "1EPam",
		"hits": 12
	},
	{
		"url": "https://www.submarino.com.br/",
		"code": "https://delc.herokuapp.com/YnmvZ",
		"hits": 3
	},
	{
]
```

# Criar uam URL

Cria uma nova curta URl ou busca no banco se ela já existir.

`POST / - FORMATO DA REQUISIÇÃO`

```json
{
  "url": "https://www.youtube.com"
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "url": "https://delc.herokuapp.com/XiwDb"
}
```

# Redirenciona para o URL de destino

Acessando essa rota, você será redirecionado para a rota de destino

`GET /:code - FORMATO DA REQUISIÇÃO`

```
Não há
```

`FORMATO DA RESPOSTA - STATUS 200`

```
Site
```

# Criar uma URL logado

Caso esteja logado e a URL não existe no banco de dados ela salvara a nova URL em seu usuário.
Está rota requer autenticação.

`POST / - FORMATO DA REQUISIÇÃO`

```json
{
  "url": "https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress",
  "id_user": "622b975994946fde28ecaffa"
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "url": "https://delc.herokuapp.com/XiwDb"
}
```

# Buscar URLs pertecentes ao meu usuário

Está rota requer autenticação.

`FORMATO DA REQUISIÇÃO`

```
Não há
```

`GET / - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "_id": "622b9e35b84d6231b437dbd1",
    "code": "TTvWT",
    "url": "https://mangalivre.net/",
    "hits": 2,
    "id_user": "622b975994946fde28ecaffa",
    "__v": 0
  },
  {
    "_id": "622ba01bb84d6231b437dbda",
    "code": "YnmvZ",
    "url": "https://www.submarino.com.br/",
    "hits": 3,
    "id_user": "622b975994946fde28ecaffa",
    "__v": 0
  }
]
```

# Deletar uma URL

Está rota requer autenticação.

`DELETE /:code:/id_user - FORMATO DA REQUISIÇÃO`

```
Não há
```

`FORMATO DA RESPOSTA - STATUS 204`

```
Não há
```

&nbsp;

## Utilizando o Back-end da aplicação em sua maquina

&nbsp;

## Instale as dependências do projetos com:

```
yarn install
```

## Inicie o projeto com:

```
yarn start
```

### ou em modo de desenvolvimento com:

```
yarn dev
```

&nbsp;
