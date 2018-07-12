const express = require('express'),
  axios = require('axios'),
  massive = require('massive'),
  session = require('express-session'),
  socket = require('socket.io');
  bodyParser = require('body-parser');
require('dotenv').config();
const ctrl = require('./controller')



const app = express()
    , io = socket(app.listen(3005, () => console.log('Server listening on port: 3005')));


    io.on('connection', socket => {

        console.log('User Connected');

        socket.emit("welcome", {user: socket.id})
        
        socket.on('message sent', data => {
            const { id, user_name, user_pic, message } = data;
            const response = {
                id: id,
                user_name: user_name,
                user_pic: user_pic,
                message: message
          }
          io.emit(`message dispatched`, response);
        });

        //message dispatched to ${doodleId}

        socket.on('addItem', data => {
            console.log(data);
            socket.broadcast.emit('addItem', data)
        })

        socket.on('disconnect', () => {
            console.log('User Disconnected');
          })
        });



app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`))

let {
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

app.use(
session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})
);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
});


// app.use(ctrl.bypassAuthInDevelopment)

app.get('/auth/callback', async (req, res) => {
    // code from auth0 on req.query.code
    let payload = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };
  
    // post request to exchange the code for a token
    let responseWithToken = await axios.post(
      `https://${REACT_APP_DOMAIN}/oauth/token`,
      payload
    );
    // use token to get user data of whom just logged in
    let userData = await axios.get(
      `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
        responseWithToken.data.access_token
      }`
    );
    const db = req.app.get('db');
    let { sub, name, picture } = userData.data;
    let userExists = await db.find_user([sub]);
    if (userExists[0]) {
      req.session.user = userExists[0];
      res.redirect('http://localhost:3000/#/dashboard');
    } else {
      db.create_user([sub, name, picture]).then(createdUser => {
        req.session.user = createdUser[0];
        res.redirect('http://localhost:3000/#/dashboard');
      });
      // let createdUser = await db.create_user([sub, name, picture]);
      // req.session.user = createdUser[0];
      // res.redirect('/')
    }
  });
  
app.get('/api/user-data', ( req, res ) => {
if (req.session.user) {
    res.status(200).send(req.session.user)
   
}
else {
    res.status(401).send('Unauthorized')
}
})
  
app.get('/api/logout', (req, res) => {
    req.session.destroy()
    
})

app.get('/api/users-data', ctrl.read)
app.post('/api/update', ctrl.update)
app.delete('/api/delete', ctrl.delete)
app.post('/api/createdoodle', ctrl.create)
