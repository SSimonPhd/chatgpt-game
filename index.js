const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 1000;
canvas.height = 500;

const robot = {
	x:50,
	y:50,
	width: 50,
	height: 50,
};

function drawRobot() {
	ctx.fillStyle = 'red';
	ctx.fillRect(robot.x, robot.y, robot.width, robot.height);

	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.arc(robot.x + 20, robot.y + 20, 10/2, 0, 2 * Math.PI);
	ctx.arc(robot.x + 30, robot.y + 20, 10/2, 0, 2 * Math.PI);
	ctx.fill();

	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.arc(robot.x + 20, robot.y + 20, 5/2, 0, 2 * Math.PI);
	ctx.arc(robot.x + 30, robot.y + 20, 5/2, 0, 2 * Math.PI);
	ctx.fill();

	ctx.fillStyle = 'black';
	ctx.fillRect(robot.x + 20, robot.y + 30 - 5, 10, 5);
}

document.addEventListener('keydown', (event) => {
	if (event.keyCode === 37) {
		robot.x -= 10;
	} else if (event.keyCode === 38) { 
		robot.y -=10;
	} else if (event.keyCode === 39) {
		robot.x += 10;
	} else if (event.keyCode === 40) {
		robot.y += 10;
	}
});

const bombs = [];

function dropBomb() {
	const bomb = {
		x: robot.x,
		y: robot.y,
		radius: 10,
	};
	bombs.push(bomb);
}

document.addEventListener('keydown', (event) => {
	if (event.keyCode === 32) {
		dropBomb();
	}
});

function drawBombs() {
	ctx.fillStyle = 'black';
	for (const bomb of bombs) {
		ctx.beginPath();
		ctx.arc(bomb.x, bomb.y, bomb.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function updateBombs() {
	for (const bomb of bombs) {
		bomb.y += 5;
	}
}

const chickens = [];

function addChicken() {
	const chicken = {
		x: Math.random() * canvas.width,
		y: canvas.height - 50,
		width: 50,
		height: 50,
		speed: Math.random() * 10 + 5,
		direction: 1,
		color: `rgb(${Math.random() * 255}, ${Math.random() * 255},
		${Math.random() * 255})`,
	};
	chickens.push(chicken);
}

addChicken();
addChicken();
addChicken();

function drawChickens() {
	ctx.fillStyle = 'yellow';
	for (const chicken of chickens) {
		ctx.fillStyle = chicken.color;
		ctx.fillRect(chicken.x, chicken.y, chicken.width, chicken.height);
	}
}

function updateChickens() {
	for (const chicken of chickens) {
		chicken.x += chicken.speed * chicken.direction;
		if (chicken.x + chicken.width >= canvas.width || chicken.x <= 0) {
			chicken.direction *= -1;
		}	 
	}
}

function checkCollisions() {
	for (let i = 0; i < chickens.length; i++) {
		const chicken = chickens[i];
		for (let j = 0; j < bombs.length; j++) {
			const bomb = bombs[j];
			const dx = chicken.x - bomb.x;
			const dy = chicken.y - bomb.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < chicken.width / 2 + bomb.radius) {
				chickens.splice(i, 1);
				i--;
				break;
			}
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	updateBombs();
	updateChickens();

	checkCollisions();
	
	drawRobot();
	drawBombs();
	drawChickens();

	requestAnimationFrame(animate);
}

animate();