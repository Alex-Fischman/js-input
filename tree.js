class Node {
	constructor(value = 0, children = []) {
		this.value = value;
		this.children = children;
	}

	add(...children) {
		this.children = this.children.concat(children);
		return this;
	}

	traverse(callback, traversal = Node.Traversal.BreadthFirst) {
		traversal.call(this, callback);
		return this;
	}

	map(callback) {
		let that = this.clone();
		that.traverse(n => n = callback(n));
		return that;
	}

	reduce(callback, initial, traversal) {
		let a = initial;
		this.traverse(n => a = callback(a, n), traversal);
		return a;
	}

	filter(callback) {
		let that = this.clone();
		that.traverse((n, t) => {
			if (!callback(n)) {
				const parent = that.find(m => m.children.includes(n));
				if (!parent) return; // Can't return root node, but would rather make filter also return undefined
				const index = parent.children.findIndex(o => o === n);
				parent.children.splice(index, 1);
			}
		}, Node.Traversal.BreadthFirst);
		return that;
	}

	every(callback) {
		return this.reduce((a, n) => a && callback(n), true);
	}

	some(callback) {
		return this.reduce((a, n) => a || callback(n), false);
	}

	// Can this be implemented using traverse?
	clone() {
		let that = Object.assign(new Node(), this);
		that.children = this.children.map(n => n.clone());
		return that;
	}

	find(callback, traversal) {
		return this.reduce((a, n) => a || (callback(n)? n: false), false, traversal);
	}

	includes(value) {
		return this.some(n => n.value === value);
	}
}

Node.Traversal = {
	BreadthFirst: function(callback) {
		let nodes = [this];
		while (nodes.length > 0) {
			const current = nodes.shift();
			callback(current);
			nodes = nodes.concat(current.children);
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
