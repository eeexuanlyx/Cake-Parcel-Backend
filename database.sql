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

CREATE TABLE user_data (
    user_id uuid PRIMARY KEY,                          
    street_name VARCHAR(255) NOT NULL,                 
    unit_number VARCHAR(50) NOT NULL,                           
    postal_code VARCHAR(20) NOT NULL,                           
    contact_number VARCHAR(20) NOT NULL,                        
    FOREIGN KEY (user_id) REFERENCES users(user_id)   
);