var mongoose = require('mongoose');  
var router = express.Router();
var restify = require('express-restify-mongoose');

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