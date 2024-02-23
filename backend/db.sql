/*

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birth DATE,
    cpf VARCHAR(14),
    cep VARCHAR(9),
    picture LONGBLOB
);

CREATE TABLE wallets (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT REFERENCES users(id),
    conta VARCHAR(20) UNIQUE,
    saldo DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE ativo (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    wallet_id INT REFERENCES wallet(id),
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL,
    corretora VARCHAR(255)
);

CREATE TABLE despesa (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    wallet_id INT REFERENCES wallet(id),
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(255)
);