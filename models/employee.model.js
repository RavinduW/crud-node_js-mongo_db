//to create the structure of employee db document

const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName:{
      type:String,
      required: 'This field is required' //validation
    },
    email:{
      type:String
    },
    mobile:{
      type:String
    },
    city:{
      type:String,
      required: 'This field is required' //validation
    }
});

//custom validation for e-mail
employeeSchema.path('email').validate((val)=>{
emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return emailregex.test(val);
},'Invalid e-mail');

//custom validation for mobile-number
employeeSchema.path('mobile').validate((val)=>{
  mobileregex = /^[0]{1}[0-9]{9}$/;
  return mobileregex.test(val);
  },'Invalid mobile-number');

mongoose.model('Employee',employeeSchema);

