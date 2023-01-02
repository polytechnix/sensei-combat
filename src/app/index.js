const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 640;
canvas.gravity = 0.8;

context.fillRect(0, 0, canvas.width, canvas.height);

class Fighter {
	constructor(position, velocity, color, offset) {
		this.position = position;
		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKeyPressed;
		this.attackField = {
			width: 100,
			height: 50,
			position: {
				x: this.position.x,
				y: this.position.y
			} 
		};
		this.color = color;
		this.isAttacking;
		offset;
	}

	draw() {
		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y, this.width, this.height);

		// attack field
		if(this.isAttacking) {
			context.fillStyle = '#e2e2e2';
			context.fillRect(this.attackField.position.x, this.attackField.position.y, this.attackField.width, this.attackField.height);
		}
	}

	update(w, h) {
		this.draw();

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.attackField.position.x = this.position.x - this.attackField.offset.x;
		this.attackField.position.y = this.position.y - this.attackField.offset.y;

		if(this.position.y + this.height + this.velocity.y >= canvas.height) {
			this.velocity.y = 0;
		} else {
			this.velocity.y += gravity;
		}
	}

	attack() {
		this.isAttacking = true;

		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
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

	offset = { 
		x: 0,
		y: 0
	},

	color: 'red'
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

	offset = { 
		x: -50,
		y: 0
	},
	
	color: 'orange'
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

function detectCollision({field1, field2}) {
	return (
		field1.attackField.position.x + field1.attackField.width >= field2.position.x && 
		field1.attackField.position.x <= field2.position.x + field2.width && 
		field1.attackField.position.y + field1.attackField.height >= field2.position.y && 
		field1.attackField.position.y <= field2.position.y + field2.height
	) /* return true/false */
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

	// Collision (detect collision) detectCollision
	/* 
	  player.attackField.position.x + player.attackField.width >= enemy.position.x && 
	  player.attackField.position.x <= enemy.position.x + enemy.width && 
	  player.attackField.position.y + player.attackField.height >= enemy.position.y && 
	  player.attackField.position.y <= enemy.position.y + enemy.height
	*/

	if(detectCollision({field1: player, field2: enemy}) && player.isAttacking) {
		console.log('Player attack successful');
		player.isAttacking = false;
	}

	if(detectCollision({field1: enemy, field2: player}) && enemy.isAttacking) {
		console.log('Enemy attack successful');
		enemy.isAttacking = false;
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

		case 'h':
			player.attack();
			console.log('Test attack');
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