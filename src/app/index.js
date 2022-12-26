const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 640;
canvas.gravity = 0.8;

context.fillRect(0, 0, canvas.width, canvas.height);

class Fighter {
	constructor(position, velocity) {
		this.position = position;
		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKeyPressed;
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
	// Player 1 (player)
	w: {
		pressed: false
	},

	a: {
		pressed: false
	},

	s: {
		pressed: false
	},

	d: {
		pressed: false
	},

	// Player 2 (enemy)
	ArrowUp: {
		pressed: false
	},

	ArrowLeft: {
		pressed: false
	},

	ArrowDown: {
		pressed: false
	},

	ArrowRight: {
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
	enemy.velocity.x = 0;

	// Player 1 (player)
	if(keys.a.pressed && player.lastKeyPressed === 'a') {
		player.velocity.x = -5;
	}
 	else if(keys.d.pressed && player.lastKeyPressed === 'd') {
		player.velocity.x = 5;
	}

	// Player 2 (enemy)
	if(keys.ArrowLeft.pressed && enemy.lastKeyPressed === 'ArrowLeft') {
		enemy.velocity.x = -5;
	}
 	else if(keys.ArrowRight.pressed && enemy.lastKeyPressed === 'ArrowRight') {
		enemy.velocity.x = 5;
	} 
}

animate();

window.addEventListener('keydown', (event) => {
	// console.log(event.key);

	switch (event.key) {
		// Player 1 (player)
		case 'w':
			player.velocity.y = -15;
			keys.a.pressed = true;
			player.lastKeyPressed = 'w';
			break;

		case 'a':
			// player.velocity.x = -1;
			keys.a.pressed = true;
			player.lastKeyPressed = 'a';
			break;

		case 's':
			keys.a.pressed = true;
			player.lastKeyPressed = 's';
			break;

		case 'd':
			// player.velocity.x = 1;
			keys.d.pressed = true;
			player.lastKeyPressed = 'd';
			break;

		// Player 2 (enemy)
		case 'ArrowUp':
			player.velocity.y = -15;
			keys.ArrowUp.pressed = true;
			enemy.lastKeyPressed = 'ArrowUp';
			break;

		case 'ArrowLeft':
			// player.velocity.x = -1;
			keys.ArrowLeft.pressed = true;
			enemy.lastKeyPressed = 'ArrowLeft';
			break;

		case 'ArrowDown':
			keys.ArrowDown.pressed = true;
			enemy.lastKeyPressed = 'ArrowDown';
			break;

		case 'ArrowRight':
			// player.velocity.x = 1;
			keys.ArrowRight.pressed = true;
			enemy.lastKeyPressed = 'ArrowRight';
			break;
	}
});

window.addEventListener('keyup', (event) => {
	// console.log(event.key);

	switch (event.key) {
		case 'w':
			// player.velocity.y = 0;
			keys.w.pressed = false;
			break;

		case 'a':
			// player.velocity.x = 0;
			keys.a.pressed = false;
			break;

		case 's':
			keys.s.pressed = false;
			break;

		case 'd':
			// player.velocity.x = 0;
			keys.d.pressed = false;
			break;

		// Player 2 (enemy)
		case 'ArrowUp':
			// enemy.velocity.y = 0;
			keys.ArrowUp.pressed = false;
			break;

		case 'ArrowLeft':
			// enemy.velocity.x = 0;
			keys.ArrowLeft.pressed = false;
			break;

		case 'ArrowDown':
			keys.ArrowDown.pressed = false;
			break;

		case 'ArrowRight':
			// enemy.velocity.x = 0;
			keys.ArrowRight.pressed = false;
			break;
	}
});