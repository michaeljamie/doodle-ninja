update users
set user_name = $2, user_pic = $3
where auth_id = $1
returning *;