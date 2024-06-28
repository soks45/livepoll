/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "userAnswer"(
    id SERIAL PRIMARY KEY,
    userId smallint NOT NULL,
    pollId smallint NOT NULL,
    answerId smallint NOT NULL
);

ALTER TABLE "userAnswer" ADD CONSTRAINT fk_userAnswer_user FOREIGN KEY (userId) REFERENCES "user_data"(id);
ALTER TABLE "userAnswer" ADD CONSTRAINT fk_userAnswer_poll FOREIGN KEY (pollId) REFERENCES "poll"(id);
ALTER TABLE "userAnswer" ADD CONSTRAINT fk_userAnswer_answer FOREIGN KEY (answerId) REFERENCES "answer"(id);
