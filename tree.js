function Node(value, children) {
	this.value = value || 0;
	this.children = children || [];
}

Node.prototype.depth = function(callback) {
	callback(this.value);
	for (child of this.children) {
		child.depth(callback);
	}
};

Node.prototype.breadth = function(callback) {
	let nodes = [this];
	while (nodes.length > 0) {
		const current = nodes.shift();
		nodes = nodes.concat(current.children);
		callback(current.value);
	}
}

Node.prototype.map;

Node.prototype.filter;

Node.prototype.reduce;

Node.prototype.every;
Node.prototype.fill;
Node.prototype.includes;
Node.prototype.some;
Node.prototype.find; // dfs and bfs?
