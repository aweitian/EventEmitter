function EventEmitter() {
	this.listener = {};
}

/**
 * name : event name
 * callback function
 * return callback id
 */
EventEmitter.prototype.on = function(name,callback) {
	if (!(name in this.listener)) {
		this.listener[name] = [];
	}
	//args = (typeof args == "object" && args.constructor === Object) ? args || (args ? [args] : []);
	this.listener[name].push(callback);
	return this.listener.length - 1;
};

/**
 * name : event name
 * callback function
 * return this
 */
EventEmitter.prototype.once = function(name,callback) {
	this.listener[name] = [callback];
	return this;
};

/**
 * name : event name
 * int callback_id
 * callback function
 * return callback
 */
EventEmitter.prototype.removeListener = function(name,callback_id) {
	return this.listener[name].splice(callback_id,1);
};

/**
 * name : event name
 * callback function
 * return this
 */
EventEmitter.prototype.removeAllListeners = function(name) {
	this.listener[name] = [];
	return this;
};

EventEmitter.prototype.listeners = function(name) {
	return this.listener[name];
};

/**
 * myEmitter.emit('event', 'a', 'b');
 * return void
 */
EventEmitter.prototype.emit = function(name) {
	var args = [];
	for(var i=1;i<arguments.length;i++) {
		args.push(arguments[i]);
	}
	if (name in this.listener) {
		for(i=0;i<this.listener.length;i++) {
			this.listener[name][i].apply(this,args);
		}
	}
};