const bucket = document.getElementById("bucket");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const bucketSpeedDisplay = document.getElementById("bucketSpeed");
let score = 0;
let bucketSpeed = 20; // Initial bucket movement speed

// Move the bucket with arrow keys
document.addEventListener("keydown", (e) => {
    const bucketRect = bucket.getBoundingClientRect();
    if (e.key === "ArrowLeft" && bucketRect.left > 0) {
        bucket.style.left = `${bucket.offsetLeft - bucketSpeed}px`;
    }
    if (e.key === "ArrowRight" && bucketRect.right < window.innerWidth) {
        bucket.style.left = `${bucket.offsetLeft + bucketSpeed}px`;
    }
});

// Spawn objects (star, blue circle, or red circle)
function createObject() {
    const randomChoice = Math.random();
    let objectClass;
    if (randomChoice < 0.2) {
        objectClass = "blue-circle"; // 20% chance for blue circle
    } else if (randomChoice < 0.4) {
        objectClass = "red-circle"; // 20% chance for red circle
    } else {
        objectClass = "star"; // 60% chance for yellow star
    }

    const object = document.createElement("div");
    object.classList.add(objectClass);
    object.style.left = `${Math.random() * window.innerWidth}px`;
    object.style.top = "0px";
    gameContainer.appendChild(object);

    moveObject(object, objectClass);
}

// Move objects downward
function moveObject(object, objectClass) {
    const interval = setInterval(() => {
        const objectRect = object.getBoundingClientRect();
        const bucketRect = bucket.getBoundingClientRect();

        // Check for collision
        if (
            objectRect.bottom >= bucketRect.top &&
            objectRect.left >= bucketRect.left &&
            objectRect.right <= bucketRect.right
        ) {
            if (objectClass === "blue-circle") {
                // Increase bucket size
                const currentWidth = parseInt(window.getComputedStyle(bucket).width);
                bucket.style.width = `${currentWidth + 20}px`;
            } else if (objectClass === "red-circle") {
                // Increase bucket speed
                bucketSpeed += 5;
                bucketSpeedDisplay.textContent = `Bucket Speed: ${bucketSpeed}`;
            } else if (objectClass === "star") {
                // Increase score
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
