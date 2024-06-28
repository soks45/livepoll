/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "user_answer"(
    user_id smallint NOT NULL,
    poll_id smallint NOT NULL,
    answer_id smallint NOT NULL
);

ALTER TABLE "user_answer" ADD CONSTRAINT fk_userAnswer_user FOREIGN KEY (user_id) REFERENCES "user_data"(id);
ALTER TABLE "user_answer" ADD CONSTRAINT fk_userAnswer_poll FOREIGN KEY (poll_id) REFERENCES "poll"(id);
ALTER TABLE "user_answer" ADD CONSTRAINT fk_userAnswer_answer FOREIGN KEY (answer_id) REFERENCES "answer"(id);
ALTER TABLE "user_answer" ADD CONSTRAINT unique_userAnswer UNIQUE ("user_id", "poll_id", "answer_id");
