var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db("mydb");
    var query = {address:"Colombo"};
    dbo.collection("students").find(query).toArray(function(err,result){
        if(err) throw err;
        console.log(result);
        db.close();
    });
});