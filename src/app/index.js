const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 640;

context.fillRect(0, 0, canvas.width, canvas.height);

class Fighter {
	constructor(position, velocity) {
		this.position = position;
		this.velocity = velocity;
	}

	draw(w, h, c) {
		context.fillStyle = c;
		context.fillRect(this.position.x, this.position.y, w, h);
	}

	update(w, h) {
		this.draw();
		this.position.y = this.position.y + 12;
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

// player.draw(50, 150, 'red');
// enemy.draw(50, 150, 'green');

// console.log(player);

function animate() {
	window.requestAnimationFrame(animate);
	console.log('Test loop');

	player.update();
}

animate();

