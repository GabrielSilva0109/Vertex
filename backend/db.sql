/*
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