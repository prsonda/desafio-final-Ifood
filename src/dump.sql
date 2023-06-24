CREATE DATABASE pdv

CREATE TABLE users (
    id serial PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table categories (
    id serial PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

INSERT INTO categories (description) VALUES 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table products (
    id serial PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    quantity_stock INTEGER NOT NULL,
    value INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    image_id INTEGER,
    FOREIGN KEY (image_id) REFERENCES images (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

create table clients (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    cep VARCHAR(8),
    street VARCHAR(255),
    number VARCHAR(255),
    district VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255) 
);

create table requests (
    id serial PRIMARY KEY,
    client_id INTEGER NOT NULL,
    observação VARCHAR(255),
    value_total NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id)
);

create table request_products (
    id serial PRIMARY KEY,
    request_id INTEGER NOT NULL,
    products_id INTEGER NOT NULL,
    amount_products NUMERIC(10,2) NOT NULL,
    value_products NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (request_id) REFERENCES requests (id),
    FOREIGN KEY (products_id) REFERENCES products (id)
);

create table images (
    id serial PRIMARY KEY,
    products_id INTEGER ,
    url VARCHAR(255) ,
    name_new VARCHAR(255) NOT NULL,
    size NUMERIC(10,2) 
);