var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  department: String,
  name: String,
  contact: Number,
  email: String,
  twitter: String,
  facebook: String,
  description: String,
  remarks: String,
  instructions: String,
  dob: { type: Date, default: Date.now },
});
mongoose.model('Blob', blobSchema);