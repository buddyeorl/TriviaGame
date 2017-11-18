//========================================================================
// Global Vars
var timeLeft = 26;
var clearingVariable;
var mainMenu= true;
var triviaScreen = false;
var isWinScreen = false;
var results = false;
var correctAnswer;
var guessedAnswer = 5 ;
var clickChecker = false;
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
		clearInterval(clearingVariable);
		console.log("Time's Up");
		$("#timer").html("Time's Up");
		timeLeft = 26;
		clearingVariable = setInterval(timer, 1000);
	} else
	{
		$("#timer").html(timeLeft - 5);
	}
}

//========================================================================
// Reset Timer

function resettime()
{
	timeLeft = 5;
	screenSwitcher();
	if ( timeLeft === 0)
	{
		clearInterval(clearingVariable);
		$("#timer").html("You Guessed Correctly");
		timeLeft = 26;
		clearingVariable = setInterval(timer, 1000);
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
			console.log("you win");
			resettime();
		} else 
		{
			// console.log("you lose");
		}
	}
}

//========================================================================
// Screen Switch will start here

function screenSwitcher()
{
	if (timeLeft === 26)
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
	if (timeLeft < 26 && timeLeft > 5 && triviaScreen=== false)
	{
	$("#mainMenu").hide();
	$("#triviaScreen").show();
	$("#isWinScreen").hide();
	$("#results").hide();	
	mainMenu= false;
	triviaScreen = true;
	isWinScreen = false;
	results = false;
	$("#questions").html(Object.values(trivia)[0][0]);
	var answerPosition = Math.floor( Math.random() * 4);
	correctAnswer = answerPosition; // this will store the correct answer position in the array
	console.log("position " + answerPosition);
//==============================================================
//This will randomly place the correct answer between position 0 and 3, and later the loop will place the incorrect answers
	$("#answer" + answerPosition).html(Object.values(trivia)[1][0]);
	for (var i=0; i < 4; i++)
	{
		if (answerPosition !== i)
		{
			$("#answer" + i).html(Object.values(trivia)[2][0][i]);
		} else
		{
			answerPosition++;
			$("#answer" + answerPosition).html(Object.values(trivia)[2][0][i]);
			console.log(answerPosition);
		}
	}
//==============================================================
	}
	if (timeLeft < 6 && timeLeft > -1)
	{
	$("#mainMenu").hide();
	$("#triviaScreen").hide();
	$("#isWinScreen").show();
	$("#results").hide();
	mainMenu= false;
	triviaScreen = false;
	isWinScreen = true;
	results = false;
	$("#isWinScreen").html("The Right Answer was: " + Object.values(trivia)[1][0]);	
//==============================================================
//Clean the Answer lists for new round.
	for (var i=0; i < 3; i++)
	{
		$("#answer" + i).html("");
	}
	}
}



//========================================================================
// Main Game Starts Here
$("#triviaScreen").hide();
console.log(Object.values(trivia)[0][0]);
$("#isWinScreen").hide();
$("#results").hide();
$("#start").on("click", function()
	{
	clearingVariable = setInterval(timer, 1000);
		
});  











