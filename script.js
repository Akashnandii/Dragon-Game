score = 0;
cross = true;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

var isPlaying = false; // Track audio state

document.addEventListener('click', function () {
    if (isPlaying) {
        audio.pause();  // Stop the audio
    }
    else {
        audio.play();   // Play the audio
    }
    isPlaying = !isPlaying; // Toggle state
});

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over";
        obstacle.classList.remove('obstacleAni');
        audiogo.currentTime = 0; // Reset the game-over sound
        audiogo.play();
        audio.pause(); // Pause the background music immediately
        audio.currentTime = 0; // Reset background music to the start
        setTimeout(() => {
            audiogo.pause();
            audiogo.currentTime = 0; // Ensure game-over sound is reset
        }, 1500); // Increase timeout to allow game-over sound to finish properly

        // Show Reset Button
        showResetButton();
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}

// Function to create and display the reset button
function showResetButton() {
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "Restart Game";
    resetBtn.style.position = "absolute";
    resetBtn.style.top = "30%";
    resetBtn.style.left = "50%";
    resetBtn.style.transform = "translate(-50%, -50%)";
    resetBtn.style.padding = "10px 20px";
    resetBtn.style.fontSize = "18px";
    resetBtn.style.cursor = "pointer";
    resetBtn.style.background = "#ff5733";
    resetBtn.style.color = "black";
    resetBtn.style.border = "none";
    resetBtn.style.borderRadius = "5px";
    resetBtn.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.3)";

    document.body.appendChild(resetBtn);

    // Add event listener to reset the game
    resetBtn.addEventListener("click", function () {
        location.reload();
    });
}
