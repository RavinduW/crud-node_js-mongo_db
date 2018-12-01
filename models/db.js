const mongoose = require('mongoose'); //request statement

mongoose.connect('mongodb://localhost:27017/employeeDB',{ useNewUrlParser:true },(err)=>{
  if(!err){console.log('MongoDB Connection Succeeded')}
  else{console.log('Error in DB Connection: '+err)}
}); //make the db connection with mongoDB database

require('./employee.model'); //employee model(request statement)
