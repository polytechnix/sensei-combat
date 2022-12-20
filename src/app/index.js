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

function animate() {
	window.requestAnimationFrame(animate);
	context.fillStyle = '#000';
	context.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	enemy.update();
}

animate();