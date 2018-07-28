users = [];
doodles = [];

module.exports = {



    read: (req, res) => {

        req.app.get('db').get_users()
        .then( users => res.status(200).send( users ) )
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        });
        
    },

    updateUsers: (req, res) => {

        req.app.get('db').fetch_users()
        .then( users => res.status(200).send( users ) )
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        });

    },


    fetch: (req, res) => {

        req.app.get('db').get_doodles()
        .then( doodles => res.status(200).send( doodles ) )
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        });
    },

    getDrawings: (req, res) => {
        const { auth_id } = req.session.user;
        req.app.get('db').get_drawings([auth_id])
        .then( doodles => res.status(200).send( doodles ) )
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
              res.sendStatus(200)
          } )
          .catch( err => {
            console.log(err)
          });
    },

    getUsersById: (req, res) => {
        
        req.app.get('db').getby_doodleid([req.params.id])
        .then( users => res.status(200).send( users ) )
        .catch( err => {
          console.log(err)
        });
        
    },



    delete: ( req, res) => {
        const { auth_id } = req.session.user;
        req.app.get('db').delete_user([ auth_id ])
    },

    deleteDrawing: ( req, res) => {
        const { auth_id } = req.session.user;
        const { id } = req.params;
        
        req.app.get('db').delete_drawing([ id ])
        .then(
        req.app.get('db').get_drawings([auth_id])
        .then( doodles => res.status(200).send( doodles ) )
        )
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        })
    },

    create: (req, res) => {
        const {auth_id} = req.session.user;
        const { doodleId, doodlePassword } = req.body;

        req.app.get('db').create_doodle([ auth_id, doodleId, doodlePassword ])
        .then( (results) => {
            req.session.user = results[0];
        })
        .catch( err => {
            console.log(err)
        });
    },

    upload: (req, res) => {
        const {auth_id} = req.session.user;
        const { dataURL } = req.body;
        
        req.app.get('db').create_image([ auth_id, dataURL ])
        .then( (results) => {
            req.session.user = results[0];
        })
        .catch( err => {
            console.log(err)
        });
    },

    updateUser: (req, res) => {
        const { auth_id } = req.session.user;
        const { doodleId } = req.body;
        

        req.app.get('db').update([auth_id, doodleId])
        .then( user => res.status(200).send(user[0]))
        .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
        })
    },

    send: (req, res ) => {
        const { formname, formemail, formsubject, formmessage } = req.body;
        const output = `
        <div style = 'margin: 0px; height: 750px; width: 450px; background: #2AABE2';>
    
            <img style = 'height: 140px; margin-left: 140px; margin-top: 30px;' src='https://lh3.googleusercontent.com/-Oi24UfENIVw/W1fIlkNZL2I/AAAAAAAAy1o/787LcB9kr7AHw1v-t-hWDDBY2O1HEuFJQCLcBGAs/s0/ninja.png' alt="avatar"/>
            <h3 style = 'color: white; font-size: 50px; margin-left: 65px;'>Doodle Ninja</h3>
            <p style = 'color: white; font-size: 25px;'>You have a new contact request: </p>
            <h3 style = 'color: white; font-size: 25px;'>Contact Details</h3>
            <ul>
                <li style = 'color: white; font-size: 30px;'>Name: ${formname}</li>
                <li style = 'color: white; font-size: 30px;'>Email: ${formemail}</li>
                <li style = 'color: white; font-size: 30px;'>Subject: ${formsubject}</li>
            </ul>
            <h3 style = 'color: white; font-size: 25px;'>Message</h3>
            <p style = 'color: white; font-size: 30px;'>${formmessage}</p>
        </div>
        `;

         // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        name: 'mail.michaeljamiephoto.com',
        host: 'mail.michaeljamiephoto.com',
        port: 26,
        secure: false,
        debug: true,
         // true for 465, false for other ports
        auth: {
            user: 'doodleninja@michaeljamiephoto.com', // generated ethereal user
            pass: 'Hannah1234!' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
        
            
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'doodleninja@michaeljamiephoto.com', // sender address
        to: 'michaeljamiejohnston@gmail.com, familiarfletcher@gmail.com', // list of receivers
        subject: 'Doodle Ninja Contact Request ✔', // Subject line
        text: 'New Message!', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info)
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        
    });

    }


}


