var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  department: String,
  name: String,
  contact: String,
  description: String,
  remarks: String,
  instructions: String,
  dob: { type: Date, default: Date.now },
});
module.exports =  mongoose.model('Blob', blobSchema);