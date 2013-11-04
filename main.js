function EventEmitter(){
	if (!(this instanceof EventEmitter))
		return new EventEmitter();
	this.callbacks = {};
}

EventEmitter.prototype= {
	on: function(event, fn) {
		this.times(event, -1, fn);
		return this;
	},
	once: function(event, fn) {
		this.times(event, 1, fn);
		return this;
	},
	times: function(event, num, fn) {
		if (!this.callbacks[event]) {
			this.callbacks[event] = [];
		}
		this.callbacks[event].push({func:fn, times: num});
		return this;
	},
	
	off: function(event, fn) {
		var self = this;
		if (!this.callbacks[event]) {
			return;
		}
		this.callbacks[event].forEach(function(value, index) { //filter
			if (value.func == fn)
				delete self.callbacks[event][index];
		});
		return this;
	},
	
	emit: function(event) {
		var self = this;
		if (!this.callbacks[event]) {
			return;
		}
		var args = Array.prototype.slice.call(arguments);
		args.shift();
		this.callbacks[event].forEach(function(value) {
			value.func.apply(null, args);
			if (value.times != -1) {
				value.times--;
			}
			if (value.times == 0) {
				this.off(event, value.func);
			}
		}.bind(this)); // => mdc bind
		return this;
	}
}


function answer(name, answer) {
	console.log("Listen " + name + ", the answer to The Ultimate Question of Life, the Universe, and Everything is " + answer);
}

function kill(name) {
	console.log("HEY " + name + " ! I'LL KILL YOU MADAFAKA !");
}

EventEmitter().once("ev1", answer).emit("ev1", "MARTIN", 42).emit("ev1", "MARTIN", 42);

var fn = function(arg) {
	console.log(arg);
};

EventEmitter().times("event1", 2, fn)
		.emit("event1", "hello should be print")
		.emit("event1", "world should be print")
		.emit("event1", "SHOULD NOT BE PRINTED");



var EventEmitter = require('events').EventEmitter;

var em = new EventEmitter();

em.on('salut', function rendresalut(nom){
  console.log("salut", nom);
});

em.on('bonjour', function(){
  console.log('Bonjour !', arguments);
});

em.emit('salut', 'paul');

em.emit('bonjour', 1, 2, 3, 4);

