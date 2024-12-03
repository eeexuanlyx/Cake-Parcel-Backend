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

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    selected_size VARCHAR(255) NOT NULL,
    selected_flavour TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY, 
    user_id UUID NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL, 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    shipped_date TIMESTAMP NULL, 
    status VARCHAR(50) DEFAULT 'Pending', 
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE invoice_products (
    invoice_product_id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL, 
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

