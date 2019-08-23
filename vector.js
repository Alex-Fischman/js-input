class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	static fromScalar(scalar) {
		return new Vector(s, s);
	}

	static fromArray(array) {
		return new Vector(...array);
	}

	toArray() {
		return [this.x, this.y];
	}

	static fromObject(object) {
		return new Vector(object.x, object.y);
	}

	toObject() {
		return { x: this.x, y: this.y };
	}

	clone() {
		return new Vector(this.x, this.y);
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	sub(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	scale(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	normalize() {
		return this.scale(1 / this.length);
	}

	distance(vector) {
		const difference = this.clone().sub(vector);
		return difference.length;
	}

	dot(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	cross(vector) {
		return this.x * vector.y - this.y * vector.x;
	}

	lerp(vector, scalar) {
		this.x = this.x * (1 - scalar) + vector.x * scalar;
		this.y = this.y * (1 - scalar) + vector.y * scalar;
		return this;
	}
}
