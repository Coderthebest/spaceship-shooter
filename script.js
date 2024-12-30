// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let spaceship = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    color: 'blue'
};

let bullets = [];
let enemies = [];
let score = 0;

// Create spaceship
function drawSpaceship() {
    ctx.fillStyle = spaceship.color;
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Create bullets
function drawBullets() {
    bullets.forEach(bullet => {
        ctx.fillStyle = 'white';
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

// Create enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, 40, 40);
    });
}

// Move spaceship
function moveSpaceship(e) {
    if (e.key === 'ArrowLeft' && spaceship.x > 0) spaceship.x -= 10;
    if (e.key === 'ArrowRight' && spaceship.x < canvas.width - spaceship.width) spaceship.x += 10;
}

// Shoot bullets
function shootBullet() {
    bullets.push({ x: spaceship.x + spaceship.width / 2 - 2.5, y: spaceship.y });
}

// Update bullets
function updateBullets() {
    bullets.forEach(bullet => {
        bullet.y -= 5;
    });
    bullets = bullets.filter(bullet => bullet.y > 0);
}

// Update enemies
function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.y += 2;
    });
    enemies = enemies.filter(enemy => enemy.y < canvas.height);
}

// Collision detection
function checkCollisions() {
    bullets.forEach(bullet => {
        enemies.forEach((enemy, index) => {
            if (
                bullet.x < enemy.x + 40 &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + 40 &&
                bullet.y + 10 > enemy.y
            ) {
                enemies.splice(index, 1);
                score++;
            }
        });
    });
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSpaceship();
    drawBullets();
    drawEnemies();

    updateBullets();
    updateEnemies();
    checkCollisions();

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    requestAnimationFrame(gameLoop);
}

// Generate enemies
function generateEnemies() {
    if (Math.random() < 0.02) {
        let enemy = {
            x: Math.random() * (canvas.width - 40),
            y: 0
        };
        enemies.push(enemy);
    }
    setTimeout(generateEnemies, 1000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') shootBullet();
    moveSpaceship(e);
});

generateEnemies();
gameLoop();
