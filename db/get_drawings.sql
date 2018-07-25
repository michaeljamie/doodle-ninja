select * from users
INNER JOIN drawings
ON users.auth_id = drawings.user_id
where auth_id = $1