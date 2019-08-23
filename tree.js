function Node(value = 0, children = []) {
	this.value = value;
	this.children = children;
	this.parent = undefined;
}

Node.from = function(node) {
	let tree = Object.assign(new Node(), node);
	tree.children = node.children.map(n => Node.from(n));
	return tree;
};

Node.root = function(node) {
	return node.parent === undefined;
}

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
};

Node.prototype.reduce = function(callback, initial, mode) {
	let acc = initial === undefined? this: initial;

	this.traverse(function(node) {
		if (!Node.root(node) || initial !== undefined) {
			acc = callback(acc, node);
		}
	}, mode);

	return acc;
};

Node.prototype.includes = function(value, mode) {
	return this.reduce((a, n) => a || n.value === value, false, mode);
};

Node.prototype.find = function(callback, mode) {
	return this.reduce((a, n) => a || (callback(n)? n: false), false, mode);
};

Node.prototype.every;
Node.prototype.some;
