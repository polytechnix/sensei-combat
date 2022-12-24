const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 640;
canvas.gravity = 0.2;

context.fillRect(0, 0, canvas.width, canvas.height);

class Fighter {
	constructor(position, velocity) {
		this.position = position;
		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
	}

	draw(color) {
		context.fillStyle = color;
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(w, h) {
		this.draw();

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if(this.position.y + this.height + this.velocity.y >= canvas.height) {
			this.velocity.y = 0;
		} else {
			this.velocity.y += gravity;
		}
	}
}

const player = new Fighter({
	position: {
		x: 0,
		y: 0,
	},

	velocity: {
		x: 0,
		y: 0,
	},
})

const enemy = new Fighter({
	position: {
		x: canvas.width - 50,
		y: 0,
	},

	velocity: {
		x: 0,
		y: 0,
	},
})

const keys = {
	a: {
		pressed: false
	},

	d: {
		pressed: false
	},
}

function animate() {
	window.requestAnimationFrame(animate);
	context.fillStyle = '#000';
	context.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	enemy.update();

	player.velocity.x = 0;

	if(keys.a.pressed) {
		player.velocity.x = -1;
	}
 	else if(keys.d.pressed) {
		player.velocity.x = 1;
	} 
}

animate();

window.addEventListener('keydown', (event) => {
	// console.log(event.key);

	switch (event.key) {
		case 'w':
			// ...
			break;

		case 'a':
			// player.velocity.x = -1;
			keys.a.pressed = true;
			break;

		case 's':
			// ...
			break;

		case 'd':
			// player.velocity.x = 1;
			keys.d.pressed = true;
			break;
	}
});

window.addEventListener('keyup', (event) => {
	// console.log(event.key);

	switch (event.key) {
		case 'w':
			// ...
			break;

		case 'a':
			// player.velocity.x = 0;
			keys.a.pressed = false;
			break;

		case 's':
			// ...
			break;

		case 'd':
			// player.velocity.x = 0;
			keys.d.pressed = false;
			break;
	}
});