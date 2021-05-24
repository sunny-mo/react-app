const express = require('express');
const bodyParser = require('body-parser');
const MoJwt = require('./miniorange-jwt-connector.node');
const path = require('path');

const app = express();
const port = process.env.PORT || 15000;
// let jwtBuilder = new MoJwt.jwtBuilder;

app.use(express.static(path.join(__dirname, './build')));
// app.use(express.static(__dirname + '/'));
// app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/jwtparser",(req, res) => {
   console.log("id_token: "+req.query.id_token);
      

  //  var url = req.protocol + '://' + req.get('host') + req.originalUrl;
  //  console.log(url);
  //  var params;
  //  var queryString = url.split('#')[1];
  //  var arr = queryString.split('&');
  //  for (var i = 0; i < arr.length; i++) {
  //   var a = arr[i].split('=');
  //   params[a[0]] = a[1];
  //   console.log(a[0]+" : "+params(a[0]))
  //  }

   // let jwtBuilder = new JWTBuilder()
   var jwtBuilder = new MoJwt.JWTBuilder();
   // let signedJwt = req.query.id_token;
   if(req.query.id_token == null){
    res.render('./rd.html');
   }
   jwtBuilder.parseJwt(req.query.id_token); // JWT String
   // jwtBuilder.setSecret(getSharedSecret());
   // var verified = jwtBuilder.verifyJwt();
   var payload = jwtBuilder.getPayload();
   res.render('./login.html',{ express: JSON.stringify(payload, undefined, 4), user: payload.NameID });
});

// app.get('/', (req,res) => {
//   res.send({express: "Hello from Node.JS. The server is working"});
// });

app.get('/hello', (req,res) => {
  res.send({express: "Hello from Express"});
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));