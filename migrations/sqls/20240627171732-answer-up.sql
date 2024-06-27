/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "answer"(
    id smallint NOT NULL,
    name VARCHAR(32) unique NOT NULL,
    pollId smallint NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE answer ADD CONSTRAINT fk_answer_poll FOREIGN KEY (pollId) REFERENCES "poll"(id);
