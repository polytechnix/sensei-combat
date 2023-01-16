// Basic models

class Sprite {
	constructor(position, imgSrc, scale = 1, frames = 1, currentFrame = 0, elapsedFrames = 0, holdFrames = 10, offset = { x: 0, y: 0 }) {
		this.position = position
		this.width = 50
		this.height = 150
		this.image = new Image()
		this.image.src = imgSrc
		this.scale = scale
		this.frames = frames
		this.currentFrame = currentFrame
		this.elapsedFrames = elapsedFrames
		this.holdFrames = holdFrames
		this.offset = offset
	}

	draw() {
		context.drawImage(this.image, 
		this.currentFrame * (this.image.width / this.frames), 0, 
		this.image.width / this.frames, 
		this.image.height, 
		this.position.x - this.offset.x, 
		this.position.y - this.offset.y, 
		this.image.width / this.frames * this.scale, 
		this.image.height * this.scale
	)}

	animateFrames() {
		this.elapsedFrames++;

		if(this.elapsedFrames % this.holdFrames === 0) {		
			if(this.currentFrame < this.frames - 1) {
				this.currentFrame++;
			} else {
				this.currentFrame = 0; 
			}
		}
	}

	update() {
		this.draw();
		this.animateFrames();
	}
}

class Fighter extends Sprite {
	constructor(position, velocity, color, imgSrc, scale = 1, frames = 1,  offset = { x: 0, y: 0 }, sprites, attackField = {offset: {}, width: undefined, height: undefined}) {
		super({
			position,
			imgSrc,
			scale,
			frames,
			offset
		})
		
		this.velocity = velocity
		this.width = 50
		this.height = 150
		this.lastKeyPressed
		this.attackField = {
			width: attackField.width,
			height: attackField.height,
			offset: attackField.offset,
			position: {
				x: this.position.x,
				y: this.position.y
			} 
		}
		this.color = color
		this.health = 100
		this.isAttacking
		this.currentFrame = 0
		this.elapsedFrames = 0
		this.holdFrames = 10
		this.sprites = sprites

		for (const sprite in this.sprites) {
			sprites[sprite].image = new Image();
			sprites[sprite].image.src = sprites[sprite].imgSrc;
		}

		// console.log(this.sprites);
	}

	draw() {
		this.animateFrames();

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

		context.fillRect(this.attackField.position.x, this.attackField.position.y, this.attackField.width, this.attackField.height);

		this.attackField.position.x = this.position.x - this.attackField.offset.x;
		this.attackField.position.y = this.position.y - this.attackField.offset.y;

		if(this.position.y + this.height + this.velocity.y >= canvas.height - 50) {
			this.velocity.y = 0;
		} else {
			this.velocity.y += gravity;
		}

		// console.log(this.position.y);
	}

	attack() {
		this.switchSprite('attack1');
		this.isAttacking = true;

		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
	}

	switchSprite(sprite) {
		if(this.image === this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.frames - 1) {
			return;
		}

		switch(sprite) {
			case 'idle':
				if(this.image !== this.sprites.idle.image) {
					this.image = this.sprites.idle.image;
					this.frames = this.sprites.idle.frames;
					this.currentFrame = 0;
				}
		  
				break;

			case 'run':
				if(this.image !== this.sprites.run.image) {
					this.image = this.sprites.run.image;
					this.frames = this.sprites.run.frames;
					this.currentFrame = 0;
				}
		  
				break;

			case 'jump':
				if(this.image !== this.sprites.jump.image) {
					this.image = this.sprites.jump.image;
					this.frames = this.sprites.jump.frames;
					this.currentFrame = 0;
				}
		  
				break;

			case 'fall':
				if(this.image !== this.sprites.fall.image) {
					this.image = this.sprites.fall.image;
					this.frames = this.sprites.fall.frames;
					this.currentFrame = 0;
				}
		  
				break;

			case 'attack1':
				if(this.image !== this.sprites.attack1.image) {
					this.image = this.sprites.attack1.image;
					this.frames = this.sprites.attack1.frames;
					this.currentFrame = 0;
				}
		  
				break;

			//...
		}
	}
}