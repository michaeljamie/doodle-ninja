INSERT INTO users
(auth_id, user_name, user_pic)
VALUES
($1, $2, $3)
RETURNING *;