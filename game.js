// Select DOM elements
const bucket = document.getElementById("bucket");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const bucketSpeedDisplay = document.getElementById("bucketSpeed");

// Initial game state
let score = 0;
let bucketSpeed = 20;

// Event Listeners
document.addEventListener("keydown", handleKeyboardInput);
gameContainer.addEventListener("touchstart", handleTouchInput);

// Function: Handle keyboard input
function handleKeyboardInput(event) {
    const bucketRect = bucket.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    if (event.key === "ArrowLeft") {
        moveBucket(-bucketSpeed, bucketRect, containerRect);
    } else if (event.key === "ArrowRight") {
        moveBucket(bucketSpeed, bucketRect, containerRect);
    }
}

// Function: Handle touch input
function handleTouchInput(event) {
    const touchX = event.touches[0].clientX;
    const containerWidth = gameContainer.offsetWidth;

    const bucketRect = bucket.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    if (touchX < containerWidth / 2) {
        moveBucket(-bucketSpeed, bucketRect, containerRect);
    } else {
        moveBucket(bucketSpeed, bucketRect, containerRect);
    }
}

// Function: Move the bucket
function moveBucket(speed, bucketRect, containerRect) {
    const newLeft = bucket.offsetLeft + speed;

    if (speed < 0 && bucketRect.left > containerRect.left) {
        bucket.style.left = `${Math.max(newLeft, 0)}px`;
    } else if (speed > 0 && bucketRect.right < containerRect.right) {
        bucket.style.left = `${Math.min(newLeft, containerRect.width - bucketRect.width)}px`;
    }
}

// Function: Spawn objects
function createObject() {
    const objectClass = getRandomObjectClass();
    const object = document.createElement("div");
    object.classList.add(objectClass);
    object.style.left = `${Math.random() * window.innerWidth}px`;
    object.style.top = "0px";
    gameContainer.appendChild(object);

    moveObject(object, objectClass);
}

// Helper Function: Randomly choose object type
function getRandomObjectClass() {
    const randomValue = Math.random();
    if (randomValue < 0.2) return "blue-circle"; // 20% chance
    if (randomValue < 0.4) return "red-circle";  // 20% chance
    return "star";                               // 60% chance
}

// Function: Move objects downward
function moveObject(object, objectClass) {
    const interval = setInterval(() => {
        const objectRect = object.getBoundingClientRect();
        const bucketRect = bucket.getBoundingClientRect();

        if (checkCollision(objectRect, bucketRect)) {
            handleCollision(objectClass);
            object.remove();
            clearInterval(interval);
        } else if (objectRect.top > window.innerHeight) {
            object.remove();
            clearInterval(interval);
        } else {
            object.style.top = `${object.offsetTop + 5}px`;
        }
    }, 30);
}

// Helper Function: Check for collision
function checkCollision(objectRect, bucketRect) {
    return (
        objectRect.bottom >= bucketRect.top &&
        objectRect.left >= bucketRect.left &&
        objectRect.right <= bucketRect.right
    );
}

// Function: Handle object collisions
function handleCollision(objectClass) {
    if (objectClass === "blue-circle") {
        increaseBucketSize();
    } else if (objectClass === "red-circle") {
        increaseBucketSpeed();
    } else if (objectClass === "star") {
        updateScore();
    }
}

// Function: Increase bucket size
function increaseBucketSize() {
    const currentWidth = parseInt(window.getComputedStyle(bucket).width);
    bucket.style.width = `${currentWidth + 20}px`;
}

// Function: Increase bucket speed
function increaseBucketSpeed() {
    bucketSpeed += 5;
    updateBucketSpeedDisplay();
}

// Function: Update the score
function updateScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function: Update bucket speed display
function updateBucketSpeedDisplay() {
    bucketSpeedDisplay.textContent = `Bucket Speed: ${bucketSpeed}`;
}

// Initialize object spawning
setInterval(createObject, 1000);
