INSERT INTO doodles
(user_id, doodleId, doodlepassword)
VALUES
($1, $2, $3)
RETURNING *;
