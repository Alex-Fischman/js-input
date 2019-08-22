function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

Vector.fromScalar = s => new Vector(s, s);

Vector.fromArray = a => new Vector(a[0], a[1]);
Vector.prototype.toArray = function() { return [this.x, this.y] };

Vector.fromObject = o => new Vector(o.x, o.y);
Vector.prototype.toObject = function() { return { x: this.x, y: this.y }; };

Vector.prototype.clone = function() { return new Vector(this.x, this.y); };
Vector.prototype.copy = function(v) { this.x = v.x; this.y = v.y; return this; };

Vector.prototype.add = function(v) { this.x += v.x; this.y += v.y; return this; };
Vector.prototype.sub = function(v) { this.x -= v.x; this.y -= v.y; return this; };

Vector.prototype.length = function() { return Math.sqrt(this.x * this.x + this.y * this.y); };
Vector.prototype.scale = function(s) { this.x *= s;   this.y *= s;   return this; };
Vector.prototype.normalize = function() { return this.scale(1 / this.length()); };

Vector.prototype.distance = function(v) {
	const d = this.clone().sub(v);
	return Math.sqrt(d.x * d.x + d.y * d.y);
};

Vector.prototype.dot = function(v) { return this.x * v.x + this.y * v.y; };
Vector.prototype.cross = function(v) { return (this.x * v.y) - (this.y * v.x); };

Vector.prototype.lerp = function(v, s) {
	this.x = this.x * (1 - s) + v.x * s;
	this.y = this.y * (1 - s) + v.y * s;
	return this;
};
