function Node(value = 0, children = []) {
	this.value = value;
	this.children = children;
	this.parent = undefined;
}

Node.prototype.add = function(...children) {
	for (child of children) {
		child.parent = this;
		this.children.push(child);
	}
	return this.children.length;
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

Node.prototype.clone = function() {
	let that = Object.assign(new Node(), this);
	that.children = that.children.map(c => c.clone());
	return that;
};

Node.prototype.find = function(callback, breadthFirst = true) {
	let result = undefined;
	this.traverse(n => { if (callback(n) && result === undefined) { result = n; } }, breadthFirst);
	return result;
};

Node.prototype.includes = function(value) {
	return Boolean(this.find(n => n.value === value));
};
