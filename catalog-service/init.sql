-- Criar tabela de itens
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL
);

-- Inserir alguns itens iniciais
INSERT INTO items (name, price, stock) VALUES
('Produto A', 10.50, 100),
('Produto B', 20.00, 50),
('Produto C', 15.75, 75);


--Sobe o container do Postgres
-- docker run --name catalog-db -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=catalog -p 5432:5432 -d postgres

-- Copiar o init.sql para dentro do container
-- docker cp init.sql catalog-db:/caminho/init.sql

-- Ao entrar no container do Postgres, execute o script SQL
-- docker exec -it catalog-db psql -U postgres -d catalog -f /caminho/init.sql

-- No serviço Node (catalog-service), a DATABASE_URL deve ficar assim:
-- postgres://postgres:123@catalog-db:5432/catalog
