var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err) throw err;

    var dbo = db.db("mydb");

    var myobj = {name:"Company Inc", address:"Highway 37"};

    //insert a one record
    dbo.collection("students").insertOne(myobj,function(err,res){
        if(err) throw err;
        console.log("1 document inserted");
        db.close();
    });


    var myobjs = [{name:"ucsc", address:"Colombo 7"},
                  {name:"syscoLabs", address:"Colombo"}
                 ];
    //insert many records
    dbo.collection("students").insertMany(myobjs,function(err,res){
        if(err) throw err;
        console.log("Records inserted");
        db.close();
    });

});
