function Node(value = 0, children = []) {
	this.value = value;
	this.children = children;
	this.depth = 0;
	this.breadth = 0;
}

Node.prototype.push = function(...children) {
	for (child of children) {
		child.depth = this.depth + 1;
		child.breadth = this.children.length;
		this.children.push(child);
	}
	return this.children.length;
};

Node.prototype.pop = function() { return this.children.pop(); };

Node.prototype.traverse = function(callback, breadthFirst = true) {
	if (breadthFirst) {
		// Breadth First Traversal
		let nodes = [this];
		while (nodes.length > 0) {
			const current = nodes.shift();
			callback(current.value, current.depth, current.breadth);
			nodes = nodes.concat(current.children);
		}
	} else {
		// Depth First Traversal
		callback(this.value, this.depth, this.breadth);
		this.children.forEach(c => c.traverse(callback, false));
	}
};

Node.prototype.map = function(callback) {
	this.traverse(function() {});
};

Node.prototype.filter;

Node.prototype.reduce;

Node.prototype.every;
Node.prototype.fill;
Node.prototype.includes;
Node.prototype.some;
Node.prototype.find; // dfs and bfs?
