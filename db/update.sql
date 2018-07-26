UPDATE users
set currentdoodleid = $2
where auth_id = $1
RETURNING *;