/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "poll"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    creatorId smallint NOT NULL
);

ALTER TABLE poll ADD CONSTRAINT fk_poll_user FOREIGN KEY (creatorId) REFERENCES "user_data"(id);
