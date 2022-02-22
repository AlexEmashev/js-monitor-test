/**
 * LCD display checking utility.
 * Can be used to check a display for dead pixels and ghosting.
 *
 * Copyright 2022 Alexander Emashev The MIT license.
 */

const startScreen = document.querySelector('#StartScreen');
const endScreen = document.querySelector('#EndScreen');
const startButton = document.querySelector('#StartButton');
const finishButton = document.querySelector('#FinishButton');
const startOverButton = document.querySelector('#StartOverButton');
const runningSquare = document.querySelector('.running-square');
const controlsForm = document.forms['animationTest'];

let animationRunning = true;
let currentTestNumber = 0;
let animationSpeed = 30;

// Set initial value for speed control
controlsForm.speed.value = animationSpeed;
controlsForm.speed.oninput = setSpeed;


document.documentElement.addEventListener('click', (event) => {
  if (event.target === document.documentElement) {
    switchTest();
  }
});

startButton.addEventListener('click', startTest);

finishButton.addEventListener('click', finishTest);

startOverButton.addEventListener('click', startTest);

function startTest() {
  hideEndScreen(); // In case of start all over again
  hideStartScreen();
  enterFullScreen();
  goFirstTest();
}

function finishTest() {
  hideEndScreen();
  exitFullScreen();
  showStartScreen();
}

function exitFullScreen() {
  document.exitFullscreen();
}

function enterFullScreen() {
  document.documentElement.requestFullscreen();
}

function setSpeed() {
  animationSpeed = parseInt(controlsForm.speed.value);
}

function showStartScreen() {
  hideAnimationTest();
  exitFullScreen();
  startScreen.style.display = 'flex';
}

function hideStartScreen() {
  startScreen.style.display = 'none';
}

function showEndScreen() {
  endScreen.style.display = 'flex';
}

function hideEndScreen() {
  endScreen.style.display = 'none';
}

function showAnimationTest(isDarkMode) {
  animationRunning = true;

  runningSquare.style.display = 'block';
  controlsForm.style.display = 'flex';

  if (isDarkMode) {
    runningSquare.style.backgroundColor = 'white';
    document.body.style.backgroundColor = 'black';
    controlsForm.style.color = 'white';
  } else {
    runningSquare.style.backgroundColor = 'black';
    document.body.style.backgroundColor = 'white';
    controlsForm.style.color = 'black';
  }

  runAnimation();
}

function hideAnimationTest() {
  stopAnimation();
  runningSquare.style.display = 'none';
  controlsForm.style.display = 'none';
}

function goFirstTest() {
  currentTestNumber = 0;
  switchTest();
}

function switchTest() {
  // ToDo: Add text scrolling
  switch(currentTestNumber) {
  case 0:
    hideEndScreen();
    document.body.style.backgroundColor = 'black';
    currentTestNumber += 1;
    return;
  case 1:
    document.body.style.backgroundColor = 'white';
    currentTestNumber += 1;
    return;
  case 2:
    document.body.style.backgroundColor = 'red';
    currentTestNumber += 1;
    return;
  case 3:
    document.body.style.backgroundColor = 'green';
    currentTestNumber += 1;
    return;
  case 4:
    document.body.style.backgroundColor = 'blue';
    currentTestNumber += 1;
    return;
  case 5:
    document.body.style.backgroundColor = 'gray';
    currentTestNumber += 1;
    return;
  case 6:
    showAnimationTest(false);

    currentTestNumber += 1;
    return;
  case 7:
    showAnimationTest(true);

    currentTestNumber += 1;
    return;
  default:
    hideAnimationTest();
    showEndScreen();
    currentTestNumber = 0;
    return;
  }
}

function stopAnimation() {
  animationRunning = false;
}

function runAnimation() {
  if (!animationRunning) return;

  let currentPosition = parseInt(runningSquare.style.left.replace(' px', ''));

  if (currentPosition + runningSquare.offsetWidth >= window.innerWidth) {
    currentPosition = 0;
  }

  runningSquare.style.left = currentPosition + animationSpeed + 'px';

  window.requestAnimationFrame(runAnimation);
}
