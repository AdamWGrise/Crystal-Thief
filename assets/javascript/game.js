////////////////////////////////
///////// Crystal Game /////////
////////////////////////////////

///////// Here're the game components with all the variables and functions that will be used throughout the game.

crystalGame = {
    // Initial values; assigning a legit value when the game runs.
    wins: 0,
    losses: 0,
    clickValue: 0,
    currentScore: 0,
    goalScore: "",
    gValue: "",
    rValue: "",
    bValue: "",
    yValue: "",

    // This runs when the page loads. It also runs when a game is complete and you click the New Game button.
    newGame: function () {
        // Resetting the current score for the new game.
        currentScore = 0;
        
        // Determination of the goal score, random number between 19 and 120.
        goalScore = Math.floor(Math.random() * 102) + 19;
        
        // These four lines will get a random value between 1 and 12 for each crystal using the cValueRandomizer function, defined below the newGame function.
        gValue = crystalGame.cValueRandomizer();
        rValue = crystalGame.cValueRandomizer();
        bValue = crystalGame.cValueRandomizer();
        yValue = crystalGame.cValueRandomizer();
        
        // ...then these four lines will actually assign the value as an attribute to the HTML crystal elements.
        $("#crystal-g").attr("value", gValue);
        $("#crystal-r").attr("value", rValue);
        $("#crystal-b").attr("value", bValue);
        $("#crystal-y").attr("value", yValue);
        
        // Placing the current score of 0 and the new goal score on the screen, along with the wins and losses.
        $("#currentScore").text(currentScore);
        $("#goalScore").text(goalScore);
        $("#wins").text(crystalGame.wins);
        $("#losses").text(crystalGame.losses);
        
        // Unlock the crystal buttons for use in a new game; fades the crystals in and fades out the New Game button so it can't be reset in the event of a game going badly!
        $(".crystal").prop("disabled", false);
        $(".crystal").fadeTo(500,1.0);
        $("#newGame").fadeOut();
        
        // Updates the commentary box with the default message including a fadeOut of the previous message and a fadeIn of the new message.
        $("#commentary").fadeOut(function () {
            $(this).text("Click thy crystals to deftly thieve them from the slumbering dragon's ample caches and add them to your bags! Thou mustn't let thine greed seize control, however, lest thy burden of greed play a role in shackling thy self to the reaches of the dragon's ferocious grasp. Be wary, stealthy thief, as the value of each crystal will not be apparent until you begin lifting them.").fadeIn();
        });
        
        // These two lines logged this round's details; hidden now to reduce possible cheese for console watchers!
        // console.log("currentScore: " + currentScore + " | goalScore: " + goalScore);
        // console.log("g: " + gValue + " | r: " + rValue + " | b: " + bValue + " | y: " + yValue);
    },
    // The function used to get random values for the crystals, which is called in the variable assignments above.
    cValueRandomizer: function () {
        return Math.floor(Math.random() * 12) + 1;
    },
        
    // winCheck will check for a win on each crystal click. Winning or losing will first play a sound, then fade a new message in the commentary area and update the respective score. Some other things happen with the gameEnd function as well, which is the next defined function.
    winCheck: function () {
        if (currentScore < goalScore) {
            // If the current score is still less than the goal: Nothing happens - keep stashing crystals!
        } else if (currentScore === goalScore) {
            // Play the sound (defined in the HTML)...
            $("audio#win")[0].play();
            // Fade out comment and fade in new winning comment text.
            $("#commentary").fadeOut(function () {
                $(this).text("Thou hast obtained sufficient crystals with which to escape! The dragon was not able to pursue you successfully, and thou hast made a heroic escape. Congratulations! Click 'New Game' to pursue another journey of thievery.").fadeIn();
            });
            crystalGame.wins++; // Increase wins.
            crystalGame.gameEnd();
        } else if (currentScore > goalScore) {
            // Losing sound.
            $("audio#lose")[0].play();
            // Losing comment.
            $("#commentary").fadeOut(function () {
                $(this).text("Thine greed hath burdened you with an overabundance of crystals. The dragon hath woken up. Thou hath tried to run away, but were blocked in front. The dragon attacks! Thy Hit decreased by 37. Thou art dead. Clicketh 'New Game' to try again.").fadeIn();
            });
            crystalGame.losses++; // Increase losses.
            crystalGame.gameEnd();
        }
    },

    // Sounds for crystals; length of the sound depends on the quantity of the crystals collected.
    soundEffect: function() {
        if(clickValue > 9) {
            $("audio#crystal-4")[0].play();
        } else if (clickValue > 6) {
            $("audio#crystal-3")[0].play();
        } else if (clickValue > 3) {
            $("audio#crystal-2")[0].play();
        } else if (clickValue > 0) {
            $("audio#crystal-1")[0].play();
        }
    },

    // Just put this stuff in its own function instead of including it all in the else if statements in winCheck.
    gameEnd: function() {
        // Actually display the wins and losses on the screen.
        $("#wins").text(crystalGame.wins);
        $("#losses").text(crystalGame.losses);
        // Disable the crystal buttons and fade them to 33% opacity.
        $(".crystal").prop("disabled", true);
        $(".crystal").fadeTo(500,0.33);
        // Fade in the New Game button so it's visible.
        $("#newGame").fadeIn();
    },
}

// Here's the main game event, which is on the 4 crystals. Each crystal click runs this.
$(".crystal").click(function() {
    // Pull the crystal's assigned value of the crystal, and add to the current score.
    clickValue = parseInt($(this).attr("value"));
    currentScore += clickValue;
    // Function to determine which sound to play for the crystal collection based on the value.
    crystalGame.soundEffect();
    // Show it on screen...
    $("#currentScore").text(currentScore);
    // And finally check if there's a win or loss.
    crystalGame.winCheck();
});

// Simply runs the game when the web page initially loads.
$("#newGame").hide();
$(".audio").prop("volume",0.4);
$(".crystalSFX").prop("volume",0.1);
$(document).ready(crystalGame.newGame());

/* To do
    Possibly add sounds?
    Animations on the crystals when clicked
*/