const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 640;
canvas.gravity = 0.8;

context.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
	position: {
		x: 0,
		y: 0
	},

	imgSrc: './img/sprites/background.png'
});

const tree = new Sprite({
	position: {
		x: 150,
		y: 0
	},

	imgSrc: './img/sprites/tree.png',
	scale: 3.2,
	frames: 5,
});

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

	// imgSrc: './img/sprites/player/idle.png',
	// frames: 8,

	scale: 2.8,

	offset = { 
		x: 25, 
		y: 18 
	},

	sprites = { 
		idle: {
			imgSrc: './img/sprites/player/idle.png',
			frames: 8,
		},
 
		run: {
			imgSrc: './img/sprites/player/run.png',
			frames: 2,
		},

		jump: {
			imgSrc: './img/sprites/player/jump.png',
			frames: 2,
		},

		fall: {
			imgSrc: './img/sprites/player/fall.png',
			frames: 2,
		},

		attack1: {
			imgSrc: './img/sprites/player/attack1.png',
			frames: 8,
		},

		// ... 
	}
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

	// imgSrc: './img/sprites/enemy/idle.png',
	// frames: 8,

	scale: 2.8,

	offset = { 
		x: 25, 
		y: 18 
	},

	sprites = { 
		idle: {
			imgSrc: './img/sprites/enemy/idle.png',
			frames: 8,
		},
 
		run: {
			imgSrc: './img/sprites/enemy/run.png',
			frames: 2,
		},

		jump: {
			imgSrc: './img/sprites/enemy/jump.png',
			frames: 2,
		},

		fall: {
			imgSrc: './img/sprites/enemy/fall.png',
			frames: 2,
		},

		attack1: {
			imgSrc: './img/sprites/enemy/attack1.png',
			frames: 8,
		},

		// ... 
	}
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

let timer = 30;
let timerId;

function timeCounting() {
	if(timer > 0) {
		timerId = setTimeout(timeCounting, 1000);
		document.querySelector('.timer').innerHTML = timer;
		timer--;
	}
	
	if(timer === 0) {
		roundWinner({player, enemy, timerId});
	}
}

function roundWinner({player, enemy, timerId}) {
	clearTimeout(timerId);

	if(player.health === enemy.health) {
		document.querySelector('.alert').innerHTML = 'Drawn game!!!';
	} else if(player.health > enemy.health) {
		document.querySelector('.alert').innerHTML = 'Player wins!!!';
	} else if(player.health < enemy.health) { 
		document.querySelector('.alert').innerHTML = 'Enemy wins!!!';
	}

	document.querySelector('.alert').style.display = block;
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

	background.update();
	player.update();
	enemy.update();

	player.velocity.x = 0;
	enemy.velocity.x = 0;

	// Player 1 (player)
	if(keys.a.pressed && player.lastKeyPressed === 'a') {
		player.velocity.x = -5;
		player.switchSprite('run');
	}
 	else if(keys.d.pressed && player.lastKeyPressed === 'd') {
		player.velocity.x = 5;
		player.switchSprite('run');
	} else {
		player.switchSprite('idle');
	}
	
	// Jumping
	if(player.velocity.y < 0) {
		player.switchSprite('jump');	
	} else if(player.velocity.y > 0) {
		player.switchSprite('fall');	
	}

	// Player 2 (enemy)
	if(keys.ArrowLeft.pressed && enemy.lastKeyPressed === 'ArrowLeft') {
		enemy.velocity.x = -5;
		enemy.switchSprite('run');
	}
 	else if(keys.ArrowRight.pressed && enemy.lastKeyPressed === 'ArrowRight') {
		enemy.velocity.x = 5;
		enemy.switchSprite('run');
	} else {
		enemy.switchSprite('idle');
	}

	// Jumping
	if(enemy.velocity.y < 0) {
		enemy.switchSprite('jump');	
	} else if(enemy.velocity.y > 0) {
		enemy.switchSprite('fall');	
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
		enemy.health -= 20;
		document.querySelector('#enemyBalanceHealth') = enemy.health + '%';
	}

	if(detectCollision({field1: enemy, field2: player}) && enemy.isAttacking) {
		console.log('Enemy attack successful');
		enemy.isAttacking = false;
		player.health -= 20;
		document.querySelector('#playerBalanceHealth') = player.health + '%';
	}

	// end health -> stop round or game over
	if(player.health <= 0 || enemy.health <= 0) {
		roundWinner({player, enemy, timerId});
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

		case 'm':
			enemy.attack();
			console.log('Test attack');
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