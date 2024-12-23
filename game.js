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

// Spawn stars
function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = "0px";
    gameContainer.appendChild(star);

    moveStar(star);
}

// Move stars downward
function moveStar(star) {
    const interval = setInterval(() => {
        const starRect = star.getBoundingClientRect();
        const bucketRect = bucket.getBoundingClientRect();

        // Check for collision
        if (
            starRect.bottom >= bucketRect.top &&
            starRect.left >= bucketRect.left &&
            starRect.right <= bucketRect.right
        ) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            star.remove();
            clearInterval(interval);
        }

        // Remove if it falls out of bounds
        if (starRect.top > window.innerHeight) {
            star.remove();
            clearInterval(interval);
        }

        star.style.top = `${star.offsetTop + 5}px`;
    }, 30);
}

// Spawn stars at intervals
setInterval(createStar, 1000);
