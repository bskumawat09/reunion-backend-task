# reunion-backend-task

> Build APIs for a social media platform in either NodeJS. The API should support features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post. Design the database schema and implement in PostgreSQL.

## Base url (Heroku)

https://reunion-task.herokuapp.com/api

## Postman collection

https://www.getpostman.com/collections/ced825d6f3aae624c923

## Postman documentation

https://documenter.getpostman.com/view/17116314/UVkpPvuv

## Database schema

```
CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);
```

```
CREATE TABLE posts (
    id serial PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    descript VARCHAR(300) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
    uid INT NOT NULL,
    FOREIGN KEY(uid) REFERENCES users(id) ON DELETE CASCADE
);
```

```
CREATE TABLE comments (
    id serial PRIMARY KEY,
    text VARCHAR(300) NOT NULL,
    pid INT,
    uid INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(pid) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY(uid) REFERENCES users(id) ON DELETE CASCADE
);
```

```
CREATE TABLE likes (
    pid INT,
    uid INT,
    PRIMARY KEY(pid, uid),
    FOREIGN KEY(pid) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY(uid) REFERENCES users(id)
);
```

```
CREATE TABLE follows (
    followee_id INT,
    follower_id INT,
    PRIMARY KEY(followee_id, follower_id),
    FOREIGN KEY(followee_id) REFERENCES users(id),
    FOREIGN KEY(follower_id) REFERENCES users(id)
);
```
