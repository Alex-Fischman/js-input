class Node {
	constructor(value = 0, children = []) {
		this.value = value;
		this.children = children;
	}

	// @TODO: implement using traverse
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

	// @TODO: if initial is undefined, set a to the root value and skip the root when iterating
	reduce(callback, initial, traversal) {
		let a = initial;
		this.traverse(n => a = callback(a, n.value), traversal);
		return a;
	}

	// @TODO: implement similar to map, without using Array.prototype.filter
	filter(callback) {
		let that = this.clone();
		that.traverse(n => n.children = n.children.filter(m => callback(m.value)), Node.Traversal.PostOrder);
		return that;
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

// @TODO: move into class block somehow
Node.Traversal = {
	BreadthFirst: function(callback) {
		let nodes = [this];
		while (nodes.length > 0) {
			callback(nodes[0]);
			nodes = nodes.concat(nodes[0].children);
			nodes.shift();
		}      
	},
	PreOrder: function(callback) {
		callback(this);
		this.children.forEach(n => n.traverse(callback, Node.Traversal.DepthFirstPreOrder));
	},
	PostOrder: function(callback) {
		this.children.forEach(n => n.traverse(callback, Node.Traversal.DepthFirstPostOrder));
		callback(this);
	}
};
