function Node(value = 0, children = []) {
	this.value = value;
	this.children = children;
	this.parent = undefined;
}

Node.prototype.push = function(...children) {
	for (child of children) {
		child.parent = this;
		this.children.push(child);
	}
	return this.children.length;
};

Node.prototype.pop = function() {
	return this.children.pop();
};

Node.prototype.traverse = function(callback, breadthFirst = true) {
	if (breadthFirst) {
		let nodes = [this];
		while (nodes.length > 0) {
			const current = nodes.shift();
			callback(current);
			nodes = nodes.concat(current.children);
		}
	} else {
		callback(this);
		this.children.forEach(c => c.traverse(callback, false));
	}
};

Node.prototype.map = function(callback) {
	let that = callback(Object.assign(new Node(), this));
	that.children = that.children.map(c => c.map(callback));
	return that;
};

Node.prototype.filter;
Node.prototype.reduce;

Node.prototype.every;
Node.prototype.fill;
Node.prototype.includes;
Node.prototype.some;
Node.prototype.find;
