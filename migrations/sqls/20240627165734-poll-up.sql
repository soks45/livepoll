/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "poll"(
    id smallint NOT NULL,
    name VARCHAR(32) NOT NULL,
    creatorId smallint NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE poll ADD CONSTRAINT fk_poll_user FOREIGN KEY (creatorId) REFERENCES "user"(id);
