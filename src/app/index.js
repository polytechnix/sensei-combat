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

	draw(color) {
		context.fillStyle = color;
		context.fillRect(this.position.x, this.position.y, 50, 150);
	}

	update(w, h) {
		this.draw();
		this.position.y += this.velocity.y;
	}
}

const player = new Fighter({
	position: {
		x: 0,
		y: 0,
	},

	velocity: {
		x: 0,
		y: 12,
	},
})

const enemy = new Fighter({
	position: {
		x: canvas.width - 50,
		y: 0,
	},

	velocity: {
		x: 0,
		y: 12,
	},
})

function animate() {
	window.requestAnimationFrame(animate);
	context.fillStyle = '#000';
	context.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	enemy.update();
}

animate();

