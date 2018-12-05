const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
      viewTitle:"Insert Employee"
    });
});

router.post('/',(req,res)=>{
   insertRecord(req,res);
});

function insertRecord(req,res){
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.mobile = req.body.mobile;
  employee.email = req.body.email;
  employee.city = req.body.city;
  employee.save((err,doc)=>{
    if(!err)
      res.redirect('employee/list');
      else{
        if(err.name == 'ValidationError'){
        handleValidationError(err,req.body);
        res.render("employee/addOrEdit",{
          viewTitle:"Insert Employee",
          employee: req.body
        }); 
        }else{
        console.log('Errror during record insertion : ' +err);
        }
      } 
  });
}

//get the employee data
router.get('/list',(req,res)=>{
  //res.json('from list');
  Employee.find( (err,docs)=>{
    if(!err){
      res.render("employee/list",{
        list:docs
      });
    }else{
      console.log("Error in retrieving employee list: "+err);
    }
  });
});

function handleValidationError(err,body){
  for(field in err.errors){
    switch(err.errors[field].path){
      case 'fullName' :
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email' :
        body['emailError'] = err.errors[field].message;
        break;  
      case 'mobile' :
        body['mobileError'] = err.errors[field].message;
        break;
      case 'city' :
        body['cityError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

module.exports = router;
