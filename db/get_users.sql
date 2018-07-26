select * from users
INNER JOIN doodles
ON users.auth_id = doodles.user_id