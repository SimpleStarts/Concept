
let colors = require('colors');
let express = require('express');
var mongoose = require('mongoose');  // lookie here http://mongoosejs.com/docs/lambda.html

// Mongoose connections
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', (err) => {
  throw new Error(' You probably need to start your database, try calling '.bgBlack.green + 'mongod --dbpath=./'.bgBlack.red + ' in a new terminal window '.bgBlack.green)
});

db.once('open', function() {
  console.log(' Connected to Mongodb '.bgRed.bold.blue);
});

// Mongoose schema
var ClockInOutSchema = mongoose.Schema({
  action: {
    type: String,
    enum: ['in', 'out'],
    required:[true, 'You gots ta choose'],
  },
  actionTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  reportTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  isCorrection: {
    type: Boolean,
    default: false
  }
})

var ClockInOut = mongoose.model('ClockInOut', ClockInOutSchema);
var aCIO = new ClockInOut ({action: 'in'});
console.log(aCIO);
aCIO.save();

// MIDDLEWARE, probably should be broken out into a new file but Aay Law Veeeeeeee
var requestTimeMiddleware = function (req, res, next) {
  req.requestTime = Date.now()
  next()
};

var loggingMiddleware = function (req, res, next) {
  if (process.env.NODE_ENV === 'local') {
    console.log(('[' + new Date(req.requestTime).toUTCString() + ']').gray, req.url.underline);
  } 
  next();
};

let app = express();

app.use(requestTimeMiddleware);
app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.send('<div><header><img src="https://media.giphy.com/media/HsasKIyUAfCSc/giphy.gif" alt="logo" /><h1>Welcome to the Rest API</h1></header><p>To get started, do things.</p></div>');
});

app.get('/clock/in', (req, res) => {

})

app.post('/clock/in', (req, res) => {

})

app.listen(3001, () => {
  console.log(' Rest API started and listening on 3001 '.bold.bgRed.blue);
})

process.on('exit', () => {
  db.close();
});
