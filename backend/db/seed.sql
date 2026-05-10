-- USERS
INSERT INTO users (name, email)
VALUES
('Jan Kowalski', 'jan@example.com'),
('Anna Nowak', 'anna@example.com'),
('Piotr Wiśniewski', 'piotr@example.com');

-- BOOKS
INSERT INTO books (title, author)
VALUES 
('Władca Pierścieni', 'J.R.R. Tolkien'),
('Ojciec chrzestny', 'Mario Puzo'),
('Hobbit', 'J.R.R. Tolkien'),
('Diuna', 'Frank Herbert');

-- LOANS
INSERT INTO loans (book_id, user_id, loan_date, return_date)
VALUES
(1, 1, CURRENT_DATE, NULL),
(2, 2, CURRENT_DATE, NULL),
(3, 3, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE),
(4, 1, CURRENT_DATE - INTERVAL '3 days', NULL);