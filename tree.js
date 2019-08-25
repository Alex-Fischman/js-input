class Node {
	constructor(value = 0, children = []) {
		this.value = value;
		this.children = children;
	}

	// @TODO: get height()? other getters?
	// @TODO: is there a way to detect loops? is it worth complicating other stuff?

	traverse({ preorder, inorder, postorder, levelorder }) {
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
			for (let i in this.children) {
				this.children[i].traverse({ preorder, inorder, postorder });
				if (inorder && i == 0) inorder(this);
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

	reduce(callback, initial) {
		let a = initial;
		this.traverse({	levelorder: n => a = (n === this && initial === undefined)? n.value: callback(a, n.value) });
		return a;
	}

	filter(callback) {
		let that = this.clone();
		that.traverse({ postorder: n => n.children = n.children.filter(m => callback(m.value)) });
		//that.traverse({ postorder: n => n = callback(n.value)? n: undefined }); // @TODO: What I want to say
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
