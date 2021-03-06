const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
      viewTitle:"Insert Employee"
    });
});

//routes to update or insert
router.post('/',(req,res)=>{
  if(req.body._id == ""){
   insertRecord(req,res);
  }else{
    updateRecord(req,res);
  }
});

//insert method
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

//update function
function updateRecord(req,res){
  Employee.findOneAndUpdate(
    {_id:req.body._id},req.body,{new:true},(err,doc)=>{
      if(!err){
        res.redirect('employee/list');
      }else{
        if(err.name == 'ValidationError'){
          handleValidationError(err,req.body);
          res.render("employee/addOrEdit",{
            viewTitle:"Update Employee",
            employee:req.body
          });
        }else{
          console.log('Error occured during update:'+err);
        }
      }
    }
  );
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

//validation errors
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

//for update a particular entity
router.get('/:id',(req,res)=>{
  Employee.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.render("employee/addOrEdit",{
        viewTitle:"Update Employee",
        employee: doc
      });
    }
  }
  )
});

//delete route
router.get('/delete/:id',(req,res)=>{
  Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err){
      res.redirect('/employee/list');
    }else{
      console.log('Error occured when deleting:'+err);
    }
  });
});

module.exports = router;
