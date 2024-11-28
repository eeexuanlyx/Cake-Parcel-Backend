CREATE DATABASE cakeparcel;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(10) DEFAULT 'user'
);

INSERT INTO users(user_name, user_email, user_password)VALUES('John', 'john@example.com', 'example321');


--insert users