CREATE DATABASE cakeparcel;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(10) DEFAULT 'user'
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sizes JSONB NOT NULL,
    img TEXT NOT NULL, --url
    type VARCHAR(100),
    flavours TEXT[] NOT NULL
);

