# Dashboard APP

Este projeto é um aplicativo simples de Dashborad desenvolvido Typescript com ReactJS para o frontend e Node com Express para o backend. Ele permite aos usuários gerenciar suas finanças.

**Certifique-se de ter o Node.js instalado em sua máquina.**

## Como Começar

1. **Clone este repositório:**
```
git clone https://github.com/GabrielSilva0109/Vertex.git
``` 

2. **Navegue para o diretório do frontend:**

```
cd frontend
``` 

3. *Instale as dependências do frontend:*

```
npm install react styled-components react-beautiful-dnd
``` 

4. *Navegue para o diretório do backend:*

```
cd backend
``` 

5. *Instale as dependências do backend:*
```
npm install cors express google-auth 
```

6. *Crie a table no MySQL*
```
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    birth DATE,
    cpf VARCHAR(14),
    cep VARCHAR(9),
    picture LONGBLOB
);

CREATE TABLE wallets (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES users(id),
    conta VARCHAR(20) UNIQUE,
    saldo DECIMAL(10, 2) DEFAULT 0.00,
    ativos DECIMAL(10, 2) DEFAULT 0.00,
    despesas DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE ativos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    wallet_id INT,
    titulo VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    observacao VARCHAR(255),
    categoria VARCHAR(255),
    fonte VARCHAR(255),
    data DATE,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id)
);

CREATE TABLE despesas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    wallet_id INT,
    titulo VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    observacao VARCHAR(255),
    categoria VARCHAR(255),
    fonte VARCHAR(255),
    data DATE,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id)
);

CREATE TABLE investimentos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    wallet_id INT,
    titulo VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    quantidade DECIMAL(10, 2) NOT NULL,
    observacao VARCHAR(255),
    categoria ENUM("Ação", "Crypto", "Moeda", "FIIs", "Renda Fixa", "Poupança"),
    data DATE,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id)
);

``` 

## Estrutura do Projeto
O projeto está organizado da seguinte forma:

frontend: Contém o código do frontend desenvolvido com ReactJS.
backend: Contém o código do backend desenvolvido com Node.js e Express.
Configuração

Certifique-se de configurar corretamente as credenciais do banco de dados no arquivo backend/src/db.js.

Configuração do Backend:

Configure a porta que o servidor backend irá utilizar no arquivo backend/index.js.

javascript
Copy code
// backend/index.js

Executando o Projeto
Executando o Backend:

No diretório backend, execute o seguinte comando:
```
npm start
```

O servidor backend estará rodando em http://localhost:3333.

Executando o Frontend:
No diretório frontend, execute o seguinte comando:
```
npm start
```
O aplicativo frontend estará disponível em http://localhost:3000.
## APIs Usadas
1-Coincheko - Forcece preço e demais informações sobre Cryptoativos.

2-NewAPI - Fornece noticias sobre finanças e tecnologia.

3-Alpha Vantage - Forcese Preço e demais informações sobre Ações, ETFs, FIIs e Moedas.

4-Google OAuth - Fornecendo mais segurança a aplicação, envio de Emails, autenticação.


## Backend API
As APIs oferecem os seguintes endpoints:

User
```
GET /users: Retorna todos os Usuarios.
GET /user/:id Retorna Usuario por ID.
POST /user: Cria um novo Usuario.
PUT /user/:id: Atualiza os dados do usuario.
DELETE /user/:id: Exclui o Usuario.
```
Wallet
```
GET /wallets - Retorna todas as Wallets.
GET /wallet/:id - Retorna Wallet por ID.
POST /wallet - Cria uma nova Wallet.
PUT /wallet/:id - Atualiza os dados da Wallet.
DELETE /wallet/:id - Exclui a Wallet.
```
Ativo
```
GET /ativos - Retorna todos os Ativos.
GET /ativo/:id - Retorna Ativo por ID.
POST /ativo - Cria um novo Ativo.
PUT /ativo/:id - Atualiza os dados do Ativo.
DELETE /ativo/:id - Exclui o Ativo.
```

Despesa
```
GET /despesas - Retorna todas as Despesas.
GET /despesa/:id - Retorna Despesa por ID.
POST /despesa - Cria uma nova Despesa.
PUT /despesa/:id - Atualiza os dados da Despesa.
DELETE /despesa/:id - Exclui a despesa.
```

## Tecnologias Utilizadas

ReactJS
Node.js
Express
MySQL
Recharts Graficos
Styled-components


