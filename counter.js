var count = function(arr){
    return "There are "+arr.length+" elements in this array";
};

//console.log(count(['shaun','crystal','ryu']));

var adder = function(a,b){
    return `The sum of 2 numbers is ${a+b}`;
};

var x = 3.23;

module.exports.count = count; //export the count variable to other files
module.exports.adder = adder; //export adder variable
module.exports.x = x; //export x

//another method for export

// module.exports = {
// count: count,
// adder: adder,
// x:x
//};
