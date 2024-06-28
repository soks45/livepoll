/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "answer"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    pollId smallint NOT NULL
);

ALTER TABLE answer ADD CONSTRAINT fk_answer_poll FOREIGN KEY (pollId) REFERENCES "poll"(id);
