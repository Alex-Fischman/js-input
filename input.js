let input = {wheel: 0};
document.addEventListener("keydown",     e => input[event.key] = true);
document.addEventListener("keyup",       e => input[event.key] = false);
document.addEventListener("pointerdown", _ => input.pressed    = true);
document.addEventListener("pointerup",   _ => input.pressed    = false);
document.addEventListener("pointermove", e => input.position   = {x: e.x, y: e.y});
document.addEventListener("wheel",       e => input.wheel     += e.deltaY);
