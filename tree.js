class Node {
	constructor(value = 0, children = []) {
		this.value = value;
		this.children = children;
	}

	traverse({ preorder, postorder, levelorder }) {
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
			this.children.forEach(n => n.traverse({ preorder, postorder }));
			if (postorder) postorder(this);
		}
		return this;
	}

	clone() {
		const copy = n => Object.assign(new Node(), n);
		let that = copy(this);
		that.traverse({ preorder: n => n.children = n.children.map(copy) });
		return that;
	}

	map(callback) {
		let that = this.clone();
		that.traverse({ levelorder: n => n.value = callback(n.value) });
		return that;
	}

	reduce(callback, initial) {
		let a = initial;
		this.traverse({	levelorder: n => a = (n === this && initial === undefined)? n.value: callback(a, n.value) });
		return a;
	}

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
