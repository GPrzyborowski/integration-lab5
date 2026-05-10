CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE,

    CONSTRAINT loans_book_id_fkey
        FOREIGN KEY (book_id)
        REFERENCES books(id),

    CONSTRAINT loans_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);