var mongoose = require('mongoose');
var express = require('express');  
var router = express.Router();
var restify = require('express-restify-mongoose');
var app = express();
var bodyParser = require('nody-parser');
var methodOverride = require('method-override');

var blobSchema = new mongoose.Schema({  
  department: String,
  name: String,
  contact: String,
  description: String,
  remarks: String,
  instructions: String,
  dob: { type: Date, default: Date.now },
});

var blob = mongoose.model('Blob', blobSchema);

restify.serve(router, blob);

app.use(router);
app.use(bodyParser.json());
app.use(methodOverride());

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})