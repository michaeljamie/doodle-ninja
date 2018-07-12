users = []

// imposterUser = {
//     auth_id: ''
//     user_name: 'Chuck Norris',
//     user_pic: 
// }

module.exports = {

    // bypassAuthInDevelopment: (req, res, next) => {
    //     if(process.env.NODE_ENV === 'development' && !req.session.user){
    //         req.session.user = imposterUser
    //         next()
    //     } else {
    //         next()
    //     }
    // },

    read: (req, res) => {

        req.app.get('db').get_users()
        .then( users => res.status(200).send( users ) )
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        });
    },


    update: ( req, res) => {
        const { auth_id } = req.session.user;
        const { user_name, user_pic } = req.body;
    
        req.app.get('db').update_user([ auth_id, user_name, user_pic ])
          .then( (results) => {
              req.session.user = results[0];
              
          } )
          .catch( err => {
            console.log(err)
          });
    },



    delete: ( req, res) => {
        const { auth_id } = req.session.user;
        req.app.get('db').delete_user([ auth_id ])
    },

    create: (req, res) => {
        const {auth_id} = req.session.user;
        const { doodleId, doodlepassword } = req.body;

        req.app.get('db').create_doodle([ auth_id, doodleId, doodlepassword ])
        .then( (results) => {
            req.session.user = results[0];
        })
        .catch( err => {
            console.log(err)
        });
    }


}


