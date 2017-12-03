//========================================================================
// Global Vars
var currentTrivia;
var ranPicker;
var timeLeft = 16;
var clearingVariable;
var mainMenu= true;
var triviaScreen = false;
var isWinScreen = false;
var results = false;
var wins = 0;
var loses = 0;
var tries = 0;
var correctAnswer;
var guessedAnswer = 5 ;
var clickChecker = false;
var currentGuess = "none";

//========================================================================
// Reset Game Variables
function resetVar()
{
currentTrivia;
ranPicker;
timeLeft = 16;
clearingVariable;
mainMenu= true;
triviaScreen = false;
isWinScreen = false;
results = false;
wins = 0;
loses = 0;
correctAnswer;
guessedAnswer = 5 ;
clickChecker = false;
currentGuess = "none";
tries = 0;	
}

//========================================================================
// Array Random Object Picker
function randomObjectPicker()
{
  ranPicker = Math.floor( Math.random() * Object.values(trivia)[0].length);
  console.log("random number generated " + ranPicker);
  console.log("random question generated " + Object.values(trivia)[0][ranPicker]);
  currentTrivia = Object.values(trivia)[0][ranPicker]; // the zero means the index 0 in the object i created, which holds the questions
  return Object.values(trivia)[0][ranPicker];
}


//========================================================================
// Timer for questions starts here


function timer() 
{
	timeLeft--;
	console.log("secs passed " + (timeLeft - 5));
	timeChecker();
	isWin();
}

//========================================================================
// Checks if time's up

function timeChecker()
{
	screenSwitcher();
	if ( timeLeft === 0)
	{
		guessedAnswer =5; // reset the guessed answer
		clearInterval(clearingVariable);
		console.log("Time check time's up");
		// $("#isWinScreen").append('<div>Time s Up</div>');
		// $("#isWinScreen").append("Wrong Answer, the correct answer was: " + Object.values(trivia)[1][0]);	
		timeLeft = 16;
		clearingVariable = setInterval(timer, 1000);
	} else
	{
		$("#timer").html("Time left : " + (timeLeft - 5));
	}
}

//========================================================================
// Reset Timer

function resettime(currentGuessOp)
{
	timeLeft = 5;

	if ( timeLeft < 6 && currentGuessOp === true)
	{
		console.log("You Guessed Correctly");
		$("#correctAnswer").html("You Guessed Correctly!!!");
		//$("#correctAnswer").append("<img class='featurette-image img-fluid' alt='Responsive image' src=" + Object.values(trivia)[3][ranPicker] + ">" )	
		$("#correctAnswer").css({'background' : 'url("' + Object.values(trivia)[3][ranPicker] + '") no-repeat','background-size' : '100% 100%',});
		$("#summary").append("<tr class='table-success'><td>" + Object.values(trivia)[1][ranPicker] + "</td><td>--</td><td>--</td></tr>"); // this line will add items to the summary
		screenSwitcher();
	} 
	if ( timeLeft < 6 && currentGuessOp === false)
	{
		console.log("Wrong Answer");
		$("#wrongAnswer").html("Wrong Answer, the correct answer was: " + Object.values(trivia)[1][ranPicker]);	
		$("#wrongAnswer").css({'background' : 'url("' + Object.values(trivia)[3][ranPicker] + '") no-repeat','background-size' : '100% 100%',});
		$("#summary").append("<tr class='table-danger'><td>--</td><td>" + Object.values(trivia)[1][ranPicker] + "</td><td>--</td></tr>"); // this line will add items to the summary
		screenSwitcher();
	} 
}
//========================================================================
// Win message will be posted here

function isWin()
{
	
	$("#answer0").on("click", function()
	{
		console.log("guessed 0");
		guessedAnswer = 0;
		clickChecker= true;
	});
	$("#answer1").on("click", function()
	{
		console.log("guessed 1");
		guessedAnswer = 1;
		clickChecker= true;
	});
	$("#answer2").on("click", function()
	{
		guessedAnswer = 2;
		clickChecker= true;
	});
	$("#answer3").on("click", function()
	{
		guessedAnswer = 3;
		clickChecker= true;
	});

	if(triviaScreen=== true)
	{
		if (guessedAnswer === correctAnswer && clickChecker === true)
		{
			wins++;
			tries++;
			clickChecker= false;
			console.log("you win");
			//===========================
			// the following three lines will hide correct and timesup tags and show correctAnswer tag only
			$("#correctAnswer").show();
			$("#wrongAnswer").hide();
			$("#timeUp").hide();
			//===========================
			resettime(true);
		} else if (guessedAnswer !== correctAnswer && clickChecker === true)
		{
			loses++;
			tries++;
			//===========================
			// the following three lines will hide timesup and wrong answer tags and show wrong answer tag only
			$("#correctAnswer").hide();
			$("#wrongAnswer").show();
			$("#timeUp").hide();
			//===========================
			clickChecker= false;
			console.log("you lose");
			resettime(false);
		} 
	}
}

//========================================================================
// This function will clean the answer's list for next round
function answerCleaner()
{
	for (var i=0; i < 3; i++)
		{
			$("#answer" + i).html("");
		}
}

//========================================================================
// This function will pick a new question to be displayed
function questionPicker()
{
	$("#questions").html(randomObjectPicker());
}


//========================================================================
// Screen Switch will start here

function screenSwitcher()
{
	if (timeLeft === 16)
	{
	$("#mainMenu").show();
	$("#triviaScreen").hide();
	$("#isWinScreen").hide();
	$("#results").hide();
	mainMenu= true;
	triviaScreen = false;
	isWinScreen = false;
	results = false;
	}
	if (timeLeft < 16 && timeLeft > 5 && triviaScreen=== false)
	{
	$("#mainMenu").hide();
	$("#triviaScreen").show();
	$("#isWinScreen").hide();
	$("#results").hide();	
	mainMenu= false;
	triviaScreen = true;
	isWinScreen = false;
	results = false;
	questionPicker();
	var answerPosition = Math.floor( Math.random() * 4);
	correctAnswer = answerPosition; // this will store the correct answer position in the array
	console.log("position " + answerPosition);
//==============================================================
//This will randomly place the correct answer between position 0 and 3, and later the loop will place the incorrect answers
	$("#answer" + answerPosition).html(Object.values(trivia)[1][ranPicker]);
	for (var i=0; i < 4; i++)
	{
		if (answerPosition !== i)
		{
			$("#answer" + i).html(Object.values(trivia)[2][ranPicker][i]);
		} else
		{
			answerPosition++;
			$("#answer" + answerPosition).html(Object.values(trivia)[2][ranPicker][i]);
			console.log(answerPosition);
		}
	}
//==============================================================
	}
	if (timeLeft < 6 && timeLeft > -1)
	{
	console.log("Time's up");
	if (guessedAnswer === 5)
	{
	console.log("loses " + loses)
	//===========================
	// the following three lines will hide correct and wrong answer tags and show time's up tag only
	$("#correctAnswer").hide();
	$("#wrongAnswer").hide();
	$("#timeUp").show();
	//===========================
	guessedAnswer = 6; // this line was written to prevent loses ++ to keep increase every second below between 0 and 5
	loses++;
	tries++;
	console.log("loses " + loses)
	$("#timeUp").html("Time's Up, the correct Answer was :" + Object.values(trivia)[1][ranPicker]);	
	$("#timeUp").css({'background' : 'url("' + Object.values(trivia)[3][ranPicker] + '") no-repeat','background-size' : '100% 100%',});
	$("#summary").append("<tr class='table-warning'><td>--</td><td>--</td><td>" + Object.values(trivia)[1][ranPicker] + "</td></tr>"); // this line will add items to the summary
	}
	$("#mainMenu").hide();
	$("#triviaScreen").hide();
	$("#isWinScreen").show();
	$("#results").hide();
	mainMenu= false;
	triviaScreen = false;
	isWinScreen = true;
	results = false;
	answerCleaner();//Clean the Answer lists for new round.
	}
//==============================================================
	if (loses > 3 && timeLeft === 1)
	{
		answerCleaner();//Clean the Answer lists for new round.

		$("#mainMenu").hide();
		$("#triviaScreen").hide();
		$("#isWinScreen").hide();
		$("#results").show();
		mainMenu= false;
		triviaScreen = false;
		isWinScreen = true;
		results = true;
		window.clearInterval(clearingVariable);
	}
//==============================================================
	if (tries > 09 && timeLeft === 1)
	{
		answerCleaner();//Clean the Answer lists for new round.

		$("#mainMenu").hide();
		$("#triviaScreen").hide();
		$("#isWinScreen").hide();
		$("#results").show();
		mainMenu= false;
		triviaScreen = false;
		isWinScreen = true;
		results = true;
		window.clearInterval(clearingVariable);
	}	
}



//========================================================================
// Main Game Starts Here
randomObjectPicker();
$("#triviaScreen").hide();
console.log(Object.values(trivia)[1][ranPicker]);
$("#isWinScreen").hide();
$("#results").hide();
$("#start").on("click", function()
	{
	clearingVariable = setInterval(timer, 1000);
		
});  
$("#startAgain").on("click", function()
	{
		$("#summary").html("");
		resetVar();
		randomObjectPicker();
		$("#triviaScreen").hide();
		console.log(Object.values(trivia)[1][ranPicker]);
		$("#isWinScreen").hide();
		$("#results").hide();
		clearingVariable = setInterval(timer, 1000);
		
}); 











