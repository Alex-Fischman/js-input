function Node(value = 0, children = []) {
	this.value = value;
	this.children = children;
	this.parent = undefined;
}

Node.from = function(node) {
	let that = Object.assign(new Node(), node);
	that.parent = undefined;
	that.children = node.children.map(n => (Node.from(n), n.parent = that));
	return that;
};

Node.prototype.add = function(...children) {
	for (child of children) {
		child.parent = this;
		this.children.push(child);
	}
};

Node.Traversal = {
	BreadthFirst: 1,
	DepthFirst: 2
};

Node.prototype.traverse = function(callback, mode = Node.Traversal.BreadthFirst) {
	if (mode == Node.Traversal.BreadthFirst) {
		let nodes = [this];
		while (nodes.length > 0) {
			const current = nodes.shift();
			callback(current);
			nodes = nodes.concat(current.children);
		}
	} else if (mode == Node.Traversal.DepthFirst) {
		callback(this);
		this.children.forEach(n => n.traverse(callback, false));
	}
	return this;
};

Node.prototype.reduce = function(callback, initial, mode) {
	let acc = initial;
	this.traverse(n => acc = callback(acc, n), mode);
	return acc;
};

Node.prototype.every = function(callback) {
	return this.reduce((a, n) => a && callback(n), true);
};

Node.prototype.some = function(callback) {
	return this.reduce((a, n) => a || callback(n), false);
};

Node.prototype.find = function(callback, mode) {
	return this.reduce((a, n) => a || (callback(n)? n: false), false, mode);
};

Node.prototype.includes = function(value) {
	return this.some(n => n.value === value);
};
