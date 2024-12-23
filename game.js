const bucket = document.getElementById("bucket");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Move the bucket with arrow keys
document.addEventListener("keydown", (e) => {
    const bucketRect = bucket.getBoundingClientRect();
    if (e.key === "ArrowLeft" && bucketRect.left > 0) {
        bucket.style.left = `${bucket.offsetLeft - 20}px`;
    }
    if (e.key === "ArrowRight" && bucketRect.right < window.innerWidth) {
        bucket.style.left = `${bucket.offsetLeft + 20}px`;
    }
});

// Spawn objects (star or blue circle)
function createObject() {
    const isBlueCircle = Math.random() < 0.2; // 20% chance to spawn a blue circle
    const object = document.createElement("div");
    object.classList.add(isBlueCircle ? "blue-circle" : "star");
    object.style.left = `${Math.random() * window.innerWidth}px`;
    object.style.top = "0px";
    gameContainer.appendChild(object);

    moveObject(object, isBlueCircle);
}

// Move objects downward
function moveObject(object, isBlueCircle) {
    const interval = setInterval(() => {
        const objectRect = object.getBoundingClientRect();
        const bucketRect = bucket.getBoundingClientRect();

        // Check for collision
        if (
            objectRect.bottom >= bucketRect.top &&
            objectRect.left >= bucketRect.left &&
            objectRect.right <= bucketRect.right
        ) {
            if (isBlueCircle) {
                // Increase bucket size
                const currentWidth = parseInt(window.getComputedStyle(bucket).width);
                bucket.style.width = `${currentWidth + 20}px`;
            } else {
                // Increase score for catching stars
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
            object.remove();
            clearInterval(interval);
        }

        // Remove if it falls out of bounds
        if (objectRect.top > window.innerHeight) {
            object.remove();
            clearInterval(interval);
        }

        object.style.top = `${object.offsetTop + 5}px`;
    }, 30);
}

// Spawn objects at intervals
setInterval(createObject, 1000);
