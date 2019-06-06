CREATE TABLE mooingmanga_manga (
  id SERIAL PRIMARY KEY,
  image TEXT,
  title TEXT NOT NULL,
  description TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);