require('./models/db'); //use the models-db.js file in the server(root) file

const express = require('express'); //express server
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
  extended:true
}));
app.use(bodyparser.json());

app.set('views',path.join( __dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultname:'mainLayout',layoutsDir: __dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3000,()=>{
  console.log('Express server started at port : 3000');  //start the server at port 3000
});

app.use('/employee',employeeController); //'use' middleware, base url of employee
