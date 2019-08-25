class Node {
	constructor(value = 0, children = []) {
		this.value = value;
		this.children = children;
	}

	// @TODO: clean up inorder?
	traverse({ levelorder, preorder, inorder, postorder }) {
		if (levelorder) {
			let nodes = [this];
			while (nodes.length > 0) {
				const current = nodes.shift();
				nodes = nodes.concat(current.children);
				levelorder(current);
			}
		}
		else {
			if (preorder) preorder(this);
			if (this.children.length > 0) {
				this.children[0].traverse({ preorder, inorder, postorder });
				if (inorder) inorder(this);
				this.children.slice(1).forEach(n => n.traverse({ preorder, inorder, postorder }));
			}
			if (postorder) postorder(this);
		}
		return this;
	}

	// @TODO: implement using traverse?
	clone() {
		let that = Object.assign(new Node(), this);
		that.children = this.children.map(n => n.clone());
		return that;
	}

	map(callback) {
		let that = this.clone();
		that.traverse({ levelorder: n => n.value = callback(n.value) });
		return that;
	}

	// @TODO: if initial is undefined, set a to the root value and skip the root when iterating
	reduce(callback, initial) {
		let a = initial;
		this.traverse({ levelorder: n => a = callback(a, n.value) });
		return a;
	}

	// @TODO: implement similarly to map, without using Array.prototype.filter
	filter(callback) {
		let that = this.clone();
		that.traverse({ postorder: n => n.children = n.children.filter(m => callback(m.value)) });
		return that;
	}

	every(callback) {
		return Boolean(this.reduce((a, b) => a && callback(b), true));
	}

	some(callback) {
		return Boolean(this.reduce((a, b) => a || callback(b), false));
	}

	find(callback) {
		return this.reduce((a, b) => a || (callback(b)? b: null), null);
	}

	includes(value) {
		return this.some(a => a === value);
	}
}
