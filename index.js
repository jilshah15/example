// var express = require('express');
// //var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var bodyParser=require(body-parser);
// //app.use(cookieParser());
// var app = express();

// app.use(session({secret: "Shh, its a secret!",
//                   resave: false,
//                   saveUninitialized: true,
//                   cookie: { secure: true }
//                 }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', function (req, res) {
//    res.sendFile('layout.html', { root: __dirname })
// });

// app.listen(3000, function () {
//   console.log('app listening on port 3000!');
// });
///////////////////////////////////////
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
//const router = express.Router();


app.use(session({

  secret: 'abcd',
  saveUninitialized: false,
  resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  //res.send("hello");
  res.sendFile('layout.html', { root: __dirname })
});

app.post('/login', (req, res) => {
  var sess = req.session;
  sess.user = req.body.user;
  sess.email = req.body.email;
  var a = res.send(`<h1>Hello ${sess.user + " " + sess.email} </h1><br>`);
  console.log(a);
  
  res.write("response status Code::" + res.statusCode + '<br>');
  res.write("session id is::" + req.sessionID);
})

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});


















//////////////////////////////////////////////
// var sess = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {secure: true},
//   saveUninitialized: true,
//   resave: false
// }
//app.use(session(sess));
// app.get('/login', function (req, res) {

//   req.session.user = req.query.email;
//   res.redirect("/");
// });



