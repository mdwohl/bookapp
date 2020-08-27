  DROP TABLE IF EXISTS store_books;
  
  CREATE TABLE store_books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description VARCHAR(255)
);

INSERT INTO book_table (authors, title, isbn, image_url, description) VALUES ('Issac Asimov','Foundations', '1234','imagehere','Book about the foundation');

INSERT INTO book_table (authors, title, isbn, image_url, description) VALUES ('Neil Degrasse Tyson', 'Space Chronicles', '4532', 'imagehere', 'Chronicles of Space');