var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
};

util.inherits(Person, events.EventEmitter); //Person object constructor can be inherited from EventEmitter

var sunil = new Person('sunil');
var nimal = new Person('nimal');
var kamal = new Person('kamal');

var people = [sunil,nimal,kamal];

people.forEach(function(person){
    person.on('speak',function(msg){
        console.log(person.name+ 'said: '+msg);
    });
});

sunil.emit('speak','Hello world');
nimal.emit('speak','Hello Friends');
kamal.emit('speak','do we need a project?');

