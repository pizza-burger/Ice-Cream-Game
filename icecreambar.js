//======================================================================================
// icecreambar.js
//======================================================================================
// This program is an ice cream bar game. Players have to match the randomly generated
// ice cream layers and get as many correct as possible within 60 seconds.
// CREDITS:
// - "correct.wav" by Bertrof (freesound.org)
// - "splat.wav" by Flasher21 (freesound.org)
// - "error.wav" by Autistic Lucario (freesound.org)
// - "gameover.wav" by jivatma07 (freesound.org)
// - Audio help: http://www.w3schools.com/html/html5_audio.asp
// - Click help: http://stackoverflow.com/questions/9880279/how-do-i-add-a-simple-onclick-event-handler-to-a-canvas-element
//======================================================================================
// Actual Program
//======================================================================================

//Global Variables
var surface = document.getElementById("drawing_surface");
var ctx = surface.getContext("2d");
var timeDisplay = document.getElementById("timer");
var scoreDisplay = document.getElementById("score");
var matchFlavour = [];
var playerFlavour = [];
var playerHighScore = [];
var currentLayers = 0;
var playerScore = 0;
var timeRemaining = 60;
var countdown;
var animateInterval;
//This is for the animated icecream droppings, but animation was scrapped:
//var yPos = 150;
var isPlaying = false;

//Sounds
var soundCorrect = new Audio("correct.wav");
var soundSplat = new Audio("splat.wav");
var soundError = new Audio("error.wav");
var soundGameOver = new Audio("gameover.wav");

//Functions: display dispensers
function dispenser1() {
    var dispenserChoco = new Image();
    dispenserChoco.src = 'chocoDisp.png';
    dispenserChoco.onload = function() {
        ctx.drawImage(dispenserChoco, 250, 0);
    };
}

function dispenser2() {
    var dispenserStrawberry = new Image();
    dispenserStrawberry.src = 'strawDisp.png';
    dispenserStrawberry.onload = function() {
        ctx.drawImage(dispenserStrawberry, 450, 0);
    };
}

function dispenser3() {
    var dispenserLemon = new Image();
    dispenserLemon.src = 'lemonDisp.png';
    dispenserLemon.onload = function() {
        ctx.drawImage(dispenserLemon, 650, 0);
    };
}

//Function: Setup function (runs when page is loaded)
var setup = function() {
	lemon = flavour("Lemon", "lemon.png");
	chocolate = flavour("Chocolate", "choco.png");
	strawberry = flavour("Strawberry", "strawberry.png");
	dispenser1();
	dispenser2();
	dispenser3();
	//document.addEventListener("mousedown", detectClick, false);
};

//Ice Cream Flavour Object Constructor
var flavour = function(name, x, y, img) {
	return {
		name: name,
		image: img,
	};
};

//Actual Ice Cream Flavours
var lemon = flavour("Lemon", "lemon.png");
var chocolate = flavour("Chocolate", "choco.png");
var strawberry = flavour("Strawberry", "strawberry.png");
//... and the cone
/*
var cone = {
	name: "Cone",
	image: "icecone.png"
};*/

//Game Timers
var timerCheck = function() {
	if (timeRemaining === 60) {
		timeDisplay.innerHTML = "Time Remaining: 1:00";
		timeRemaining -= 1;
	} else if (timeRemaining < 60 && timeRemaining > 9) {
		timeDisplay.innerHTML = "Time Remaining: 0:" + timeRemaining;
		timeRemaining -= 1;
	} else if (timeRemaining <= 9 && timeRemaining > 0) {
		timeDisplay.innerHTML = "Time Remaining: 0:0" + timeRemaining;
		timeRemaining -= 1;
	} else {
		timeDisplay.innerHTML = "Time Remaining: 0:00";
		clearInterval(countdown);
		endGame();
	}
	//console.log(timeRemaining);
};

var gameTimer = function() {
	countdown = setInterval(timerCheck, 1000);
};

//Function: Generate New Match
var generateMatch = function() {
	matchFlavour = []; //empty the previous flavours to be matched
	for (var i = 1; i <= 3; i += 1) {
		var randomNumber = Math.random();
		if (randomNumber < 0.33) {
			matchFlavour.push(lemon);
		} else if (randomNumber >= 0.33 && randomNumber < 0.67) {
			matchFlavour.push(chocolate);
		} else {
			matchFlavour.push(strawberry);
		}
	}
	//console.log("Flavours to match: " + matchFlavour[0].name + matchFlavour[1].name + matchFlavour[2].name);
};

//Functions: Draw Ice Cream/Cone
var drawMatch = function() { //this function differs with drawMatches because it also draws the cone
    drawCone(38, 135);
    drawMatches();
};

var drawCone = function(x, y) {
    var cone = new Image();
    cone.src = 'icecone.png';
    cone.onload = function() {
        ctx.drawImage(cone, x, y);
    };
};

var drawMatches = function() {
	var icecream1 = new Image(); //bottom layer
	var icecream2 = new Image();
	var icecream3 = new Image(); //top layer
	if (matchFlavour[0] === lemon) {
		icecream1.src = "lemon.png";
	} else if (matchFlavour[0] === chocolate) {
		icecream1.src = "choco.png";
	} else {
		icecream1.src = "strawberry.png";
	}
	if (matchFlavour[1] === lemon) {
		icecream2.src = "lemon.png";
	} else if (matchFlavour[1] === chocolate) {
		icecream2.src = "choco.png";
	} else {
		icecream2.src = "strawberry.png";
	}
	if (matchFlavour[2] === lemon) {
		icecream3.src = "lemon.png";
	} else if (matchFlavour[2] === chocolate) {
		icecream3.src = "choco.png";
	} else {
		icecream3.src = "strawberry.png";
	}
	icecream1.onload = function() {
        ctx.drawImage(icecream1, 30, 90);
    };
	icecream2.onload = function() {
        ctx.drawImage(icecream2, 30, 50);
    };
	icecream3.onload = function() {
        ctx.drawImage(icecream3, 30, 10);
    };
};

//Function: draw player's chosen flavours underneath the dispensers
var drawPlayerFlavours = function() {
	drawCone(438, 435);
	var icecream1 = new Image(); //bottom layer
	var icecream2 = new Image();
	var icecream3 = new Image(); //top layer
	if (playerFlavour[0] === lemon) {
		icecream1.src = "lemon.png";
	} else if (playerFlavour[0] === chocolate) {
		icecream1.src = "choco.png";
	} else if (playerFlavour[0] === strawberry) {
		icecream1.src = "strawberry.png";
	}
	if (playerFlavour[1] === lemon) {
		icecream2.src = "lemon.png";
	} else if (playerFlavour[1] === chocolate) {
		icecream2.src = "choco.png";
	} else if (playerFlavour[1] === strawberry) {
		icecream2.src = "strawberry.png";
	}
	if (playerFlavour[2] === lemon) {
		icecream3.src = "lemon.png";
	} else if (playerFlavour[2] === chocolate) {
		icecream3.src = "choco.png";
	} else if (playerFlavour[2] === strawberry) {
		icecream3.src = "strawberry.png";
	}
	icecream1.onload = function() {
        ctx.drawImage(icecream1, 430, 390);
    };
	icecream2.onload = function() {
        ctx.drawImage(icecream2, 430, 350);
    };
	icecream3.onload = function() {
        ctx.drawImage(icecream3, 430, 310);
    };
};

/*
//Animation functions. Did not function as intended. Scrapped.
function drawIceCream(x, y, flavour) {
	var icecream = new Image();
	if (flavour.name === "Lemon") {
		icecream.src = "lemon.png";
	} else if (flavour.name === "Chocolate") {
		icecream.src = "choco.png";
	} else {
		icecream.src = "strawberry.png";
	}
    icecream.onload = function() {
        ctx.drawImage(icecream, x, y);
    };
};

var animateIceCream = function(flavour) {
	console.log("Ice cream flavour: " + flavour.name);
	var xPos = 0;
	if (flavour === lemon) {
		xPos = 675;
	} else if (flavour === chocolate) {
		xPos = 275;
	} else {
		xPos = 475;
	}
	if (yPos >= 500) {
		clearInterval(animateInterval);
	} else {
		yPos += 10; //the "dy" is 10
		ctx.clearRect(150, 150, surface.width, surface.height - 270);
		drawIceCream(xPos, yPos, flavour);
	}
};

var startAnimate = function(flavour) {
	var theFlavour = flavour;
	yPos = 150;
	animateInterval = setInterval(animateIceCream(theFlavour), 100);
};*/

//Functions: Clicky functions
function getMousePos(surface, evt) {
    var rect = surface.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
};

surface.addEventListener('click', function(event) {
	if (isPlaying) {
		var pos = getMousePos(surface, event);
		var posx = pos.x;
		var posy = pos.y;
		if (currentLayers !== 3) {
			if (posx >= 250 && posx <= 400 && posy > 0 && posy <= 150) {
				playerFlavour.push(chocolate);
				drawPlayerFlavours();
				currentLayers += 1;
				//console.log("chocolate!");
				soundSplat.load();
				soundSplat.play();
			} else if (posx >= 450 && posx <= 600 && posy > 0 && posy <= 150) {
				playerFlavour.push(strawberry);
				drawPlayerFlavours();
				currentLayers += 1;
				//console.log("strawberry!");
				soundSplat.load();
				soundSplat.play();
			} else if (posx >= 650 && posx <= 800 && posy > 0 && posy <= 150) {
				playerFlavour.push(lemon);
				drawPlayerFlavours();
				currentLayers += 1;
				//console.log("lemon!");
				soundSplat.load();
				soundSplat.play();
			}
		}
		//console.log("Number of layers: " + currentLayers);
	}
});

//Function: Check if Match
var checkMatch = function() {
	var correctMatches = 0;
	for (var i = 0; i < 3; i += 1) {
		if (playerFlavour[i] === matchFlavour[i]) {
			correctMatches += 1;
		}
	}
	if (correctMatches === 3) { //if the player gets all 3 matches correct, return true
		return true;
	} else {
		return false;
	}
};

//Function: finish button
var finishIceCream = function() {
    if (isPlaying) { //we don't want anything to happen if the player isn't currently playing a game
        var isCorrect = checkMatch();
        if (isCorrect) {
            playerScore += 1;
			soundCorrect.load();
			soundCorrect.play();
            //tell the player he/she got it correct
        } else {
			soundError.load();
			soundError.play();
            //tell the player he/she got it wrong
        }
        scoreDisplay.innerHTML = "Player score: " + playerScore;
        //update score on HTML
        newRound();
    }
};

//Function: reset scoop button function
var resetScoop = function() {
    ctx.clearRect(150, 150, surface.width, surface.height - 200);
    playerFlavour = [];
	currentLayers = 0;
    drawPlayerFlavours(); //the scoops may not exist, but should draw the empty cone anyway
};

//Function: New Round
var newRound = function() {
	generateMatch();
	drawMatch();
	//console.log("new round!");
	playerFlavour = [];
	currentLayers = 0;
	ctx.clearRect(150, 150, surface.width, surface.height - 200);
	drawPlayerFlavours(); //playerFlavour array is empty, but the empty cone should be drawn
};

//Function: update high score
var updateHighScore = function() {
	playerHighScore.push(playerScore);
	for (var i = 0; i < playerHighScore.length; i++) {
		if (i === 0) {
			highScore.innerHTML = "High Score: " + playerHighScore[i]; 
		} else if (playerHighScore[i] > playerHighScore[i-1]) {
			highScore.innerHTML = "High Score: " + playerHighScore[i];  
		}
	}
};

//Function: New Game
var newGame = function() {
	if (!isPlaying) { //if the player is already playing, don't do anything (it could mess up the program)
		ctx.clearRect(0, 0, surface.width, surface.height);
		setup();
		isPlaying = true;
		newRound();
		timeRemaining = 60;
		playerScore = 0;
		scoreDisplay.innerHTML = "Player Score: ";
		gameTimer();
	}
};

//Function: End Game
var endGame = function() {
	//console.log("Game has ended.");
	isPlaying = false;
	updateHighScore();
	soundGameOver.load();
	soundGameOver.play();
	//end the game
};

setup();

//======================================================================================
// End of Program
//======================================================================================