const express = require('express'),
  axios = require('axios'),
  massive = require('massive'),
  session = require('express-session'),
  socket = require('socket.io');
  bodyParser = require('body-parser');
  ctrl = require('./controller');
  nodemailer = require('nodemailer')
  
require('dotenv').config();





const app = express()
    , io = socket(app.listen(3005, () => console.log('Server listening on port: 3005')));


    io.on('connection', socket => {

        console.log('User Connected');



        socket.emit("welcome", {user: socket.id})

        socket.on('join', data => {
          console.log('join data =', data)
          
          socket.join(data)
          console.log('client joined room =', data)
        })

        socket.on('joinexisting', data => {
          console.log('join existing data =', data)

          socket.join(data)
          console.log('client joined room =', data)

        })
        
        socket.on('message sent', data => {
          console.log(data)
            const { id, user_name, user_pic, message, currentdoodleid } = data;
            const response = {
                id: id,
                user_name: user_name,
                user_pic: user_pic,
                message: message,
                currentdoodleid: currentdoodleid
          }
          console.log('currentdoodleid', currentdoodleid)
          io.emit(`message dispatched-${currentdoodleid}`, response);
          console.log('message sent to=', currentdoodleid)
        });

        socket.on('addItem', data => {
          const {i, currentdoodleid, username, userpic} = data;
          const response = {
            i: i,
            sockcurrentdoodleid: currentdoodleid,
            sockusername: username,
            sockuserpic: userpic
          }
          
          console.log('currentdoodleid', currentdoodleid)
            socket.broadcast.emit(`draw-${currentdoodleid}`, response)
            console.log('drawing sent to=', currentdoodleid)
        });


        socket.on('leave', data => {
          console.log('leave data =', data)

          socket.leave(data)
          console.log('client left room =', data)
        })

        socket.on('sendImage', data => {
          const {imageUrl, currentdoodleid} = data;
          const response = {
            imageUrl: imageUrl
          }
          console.log('currentdoodleid =', currentdoodleid)
          console.log('response =', response)
          io.emit(`addImage-${currentdoodleid}`, response)
          socket.emit('addImage', data)
        });

        socket.on('clearImage', data => {
          const {currentdoodleid} = data;
          socket.emit(`clearcanvas-${currentdoodleid}`, data)
        })

        socket.on('downloadBlob', data => {
            const {currentdoodleid, datastring} = data;
          socket.emit(`downloadCanvas-${currentdoodleid}`, datastring)
          // socket.emit('downloadCanvas', data)
        });

        socket.on('disconnect', () => {
            console.log('User Disconnected');

          })
        });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../build`))

let {
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

const secret = SESSION_SECRET

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
      redirect_uri: `${process.env.PROTOCOL}://${req.headers.host}/auth/callback`
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
      res.redirect(`${process.env.FRONTEND_DOMAIN}/#/dashboard`);
    } else {
      db.create_user([sub, name, picture]).then(createdUser => {
        req.session.user = createdUser[0];
        res.redirect(`${process.env.FRONTEND_DOMAIN}/#/dashboard`);
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

app.get('/api/user-data', ctrl.read)
app.get('/api/users-data', ctrl.updateUsers)
app.get(`/api/users/:id`, ctrl.getUsersById)
app.get('/api/doodles', ctrl.fetch)
app.get('/api/drawings', ctrl.getDrawings)
app.put(`/api/users/:id`, ctrl.updateUser)
app.delete('/api/delete', ctrl.delete)
app.delete(`/api/deleteDrawing/:id`, ctrl.deleteDrawing)
app.post('/api/update', ctrl.update)
app.post('/api/createdoodle', ctrl.create)
app.post('/api/send', ctrl.send)
app.post('/api/upload', ctrl.upload)
