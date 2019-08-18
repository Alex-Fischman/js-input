let input = {};
window.onkeydown     = e => input[event.key] = true;
window.onkeyup       = e => input[event.key] = false;
window.onpointerdown = _ => input.pressed    = true;
window.onpointerup   = _ => input.pressed    = false;
window.onpointermove = e => input.position   = [e.x, e.y];
