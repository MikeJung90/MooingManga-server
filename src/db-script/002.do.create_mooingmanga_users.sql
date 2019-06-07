CREATE TABLE mooingmanga_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

ALTER TABLE mooingmanga_manga
  ADD COLUMN
    user_id INTEGER REFERENCES mooingmanga_users(id)
    ON DELETE SET NULL;