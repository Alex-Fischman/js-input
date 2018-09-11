//Key tracker
let Keys = {};
window.onkeydown = function(event) { Keys[event.key] = true; };
window.onkeyup = function(event) { Keys[event.key] = false; };
