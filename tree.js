class Node {
	constructor(value = 0, children = []) {
		this.value = value;
		this.children = children;
	}

	add(...children) {
		this.children = this.children.concat(children);
		return this;
	}

	// Can this be implemented using traverse?
	clone() {
		let that = Object.assign(new Node(), this);
		that.children = this.children.map(n => n.clone());
		return that;
	}

	traverse(callback, traversal = Node.Traversal.BreadthFirst) {
		traversal.call(this, callback);
		return this;
	}

	map(callback) {
		let that = this.clone();
		that.traverse(n => n.value = callback(n.value));
		return that;
	}

	reduce(callback, initial, traversal) {
		let a = initial;
		this.traverse(n => a = callback(a, n.value), traversal);
		return a;
	}

	every(callback) {
		return this.reduce((a, b) => a && callback(b), true);
	}

	some(callback) {
		return this.reduce((a, b) => a || callback(b), false);
	}

	find(callback, traversal) {
		return this.reduce((a, b) => a || (callback(b)? b: null), null, traversal);
	}

	includes(value) {
		return this.some(a => a === value);
	}
}

Node.Traversal = {
	BreadthFirst: function(callback) {
		let nodes = [this];
		while (nodes.length > 0) {
			callback(nodes[0]);
			nodes = nodes.concat(nodes[0].children);
			nodes.shift();
		}      
	},
	DepthFirstPreOrder: function(callback) {
		callback(this);
		this.children.forEach(n => n.traverse(callback, Node.Traversal.DepthFirstPreOrder));
	},
	DepthFirstPostOrder: function(callback) {
		this.children.forEach(n => n.traverse(callback, Node.Traversal.DepthFirstPostOrder));
		callback(this);
	}
};
