-- Active: 1709580924174@@127.0.0.1@3306
-- Active: 1704402367109@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'NORMAL' NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--  DROP TABLE IF EXISTS users;

INSERT INTO users (id, username, email, password, role, created_at)
VALUES 
    ('u1', 'Amanda', 'amanda@email.com', 'amanda123', 'NORMAL', CURRENT_TIMESTAMP),
    ('u2', 'Jéssica', 'jessica@email.com', 'jessica123', 'NORMAL', CURRENT_TIMESTAMP),
    ('u3', 'Ana', 'ana@email.com', 'ana123', 'ADMIN', CURRENT_TIMESTAMP),
    ('u4','Milena', 'milena@email.com','milena123', 'NORMAL', CURRENT_TIMESTAMP );

INSERT INTO users (id, username, email, password, role, created_at)
VALUES 
   ('u5', 'Estrela', 'estrela@email.com', 'estrela123', 'NORMAL', CURRENT_TIMESTAMP);
-- DELETE FROM users;
SELECT * FROM users;

CREATE TABLE posts (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    comment TEXT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO posts (id, user_id, content, likes, dislikes, comment, created_at, updated_at)
VALUES
  ('p1', 'u1', 'Conteúdo do Post 1', 0, 0, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('p2', 'u2', 'Conteúdo do Post 2', 0, 0, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('p3', 'u3', 'Conteúdo do Post 3', 0, 0, '', CURRENT_DATE, CURRENT_DATE);


SELECT * FROM users WHERE id = 'u3';


SELECT * FROM POSTS;


CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    
    Foreign Key (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    
    Foreign Key (post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
  ('u1', 'p1', 1),
  ('u2', 'p1', 0),
  ('u1', 'p2', 1),
  ('u2', 'p2', 0);

SELECT * FROM likes_dislikes;

-- -- DELETE  FROM likes_dislikes;
-- DROP TABLE IF EXISTS likes_dislikes;

CREATE TABLE comments_posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    
    Foreign Key (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    
    Foreign Key (post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO comments_posts (id, user_id, post_id, content, likes, dislikes, created_at, updated_at)
VALUES
  ('cp1', 'u1', 'p1', 'Comentário no Post 1', 0, 0, CURRENT_DATE, CURRENT_DATE),
  ('cp2', 'u2', 'p1', 'Outro Comentário no Post 1', 0, 0, CURRENT_DATE, CURRENT_DATE),
  ('cp3', 'u1', 'p2', 'Comentário no Post 2', 0, 0, CURRENT_DATE, CURRENT_DATE),
  ('cp4', 'u2', 'p2', 'Outro Comentário no Post 2', 0, 0, CURRENT_DATE, CURRENT_DATE);

-- DROP TABLE IF EXISTS comments_posts;

SELECT * FROM comments_posts;

-- DELETE FROM comments_posts;

CREATE TABLE comments_likes(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER,
    
    Foreign Key (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    
    Foreign Key (comment_id) REFERENCES comments_posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
-- DROP TABLE IF EXISTS comments_likes;
INSERT INTO comments_likes (user_id, comment_id, like)
VALUES
  ('u1', 'cp1', 1),
  ('u2', 'cp1', 0),
  ('u1', 'cp3', 1),
  ('u2', 'cp3', 0),
  ('u1', 'cp4', 1),
  ('u2', 'cp4', 0);

SELECT * FROM comments_likes;

-- DELETE FROM comments_likes;

SELECT * FROM users;
SELECT * FROM posts;


DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS likes_dislikes;

DROP TABLE IF EXISTS comments_posts;

DROP TABLE IF EXISTS likes_dislikes_post_comment;

DELETE FROM users;
DELETE FROM posts;
DELETE FROM likes_dislikes;
DELETE FROM comments_posts;
DELETE FROM likes_dislikes_post_comment;