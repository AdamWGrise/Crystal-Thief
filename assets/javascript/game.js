crystalGame = {
    // Initial values.
    wins: 0,
    losses: 0,
    currentScore: 0,
    goalScore: "",
    gValue: "",
    rValue: "",
    bValue: "",
    yValue: "",

    
    newGame: function () {
        // Resetting the current score for the new game; runs on page load and when the user clicks the "New Game" button.
        currentScore = 0;
        
        // Determination of the goal score, random number between 19 and 120.
        goalScore = Math.floor(Math.random() * 102) + 19;
        
        // These four lines will get a random value between 1 and 12 for each crystal using the cValueRandomizer function.
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
        
        // Unlock the crystal buttons for use in a new game.
        $(".crystal").prop("disabled", false);
        $(".crystal").fadeTo(500,1.0);
        $("#newGame").fadeOut();
        
        // Update the commentary box.
        $("#commentary").fadeOut(function () {
            $(this).text("Click thy crystals to deftly thieve them from the slumbering dragon's ample caches and add them to your bags! Thou mustn't let thine greed seize control, however, lest thy burden of greed play a role in shackling thy self to the reaches of the dragon's ferocious grasp. Be wary, stealthy thief, as the value of each crystal will not be apparent until you begin lifting them.").fadeIn();
        });
        
        // Logging this round's details; hidden to reduce cheese for console watchers!
        // console.log("currentScore: " + currentScore + " | goalScore: " + goalScore);
        // console.log("g: " + gValue + " | r: " + rValue + " | b: " + bValue + " | y: " + yValue);
    },
    // The function used to get random values for the crystals, called from the variable assignments above.
    cValueRandomizer: function () {
        return Math.floor(Math.random() * 12) + 1;
    },
    
    
    // Checks for a win on each crystal click. Disable the crystal buttons upon win or loss, until a new game is started. Also updates the commentary box with some notes.
    winCheck: function () {
        if (currentScore < goalScore) {
            // Nothing happens - keep stashing crystals!
        } else if (currentScore === goalScore) {
            // Show winning comment; increase win counter, disable crystal buttons, show newGame button.
            $("#commentary").fadeOut(function () {
                $(this).text("Thou hast obtained sufficient crystals with which to escape! The dragon was not able to pursue you successfully, and thou hast made a heroic escape. Congratulations! Click 'New Game' to pursue another journey of thievery.").fadeIn();
            });
            crystalGame.wins++;
            crystalGame.gameEnd();
        } else if (currentScore > goalScore) {
            // Same as winning comment, but increases losses and shows losing message instead.
            $("#commentary").fadeOut(function () {
                $(this).text("Thine greed hath burdened you with an overabundance of crystals. The dragon hath woken up. Thou hath tried to run away, but were blocked in front. The dragon attacks! Thy Hit decreased by 37. Thou art dead. Clicketh 'New Game' to try again.").fadeIn();
            });
            crystalGame.losses++;
            crystalGame.gameEnd();
        }
    },
    gameEnd: function() {
        $("#wins").text(crystalGame.wins);
        $("#losses").text(crystalGame.losses);
        $(".crystal").prop("disabled", true);
        $(".crystal").fadeTo(500,0.33);
        $("#newGame").show();
    },

    // New Game button animation
    buttonAnimate: function (e) {
        while (0 !== 1) {
            $("#newGame").fadeTo(1200,0.25);
            $("#newGame").fadeTo(1200,1.00);
        }
    }
}


// The game is triggered by this click event, which is on the 4 crystals.
$(".crystal").click(function () {
    // Add the round's assigned value of the crystal to the current score.

    currentScore += parseInt($(this).attr("value"));
    // Show it on screen...
    $("#currentScore").text(currentScore);
    // And finally check if there's a win or loss.
    crystalGame.winCheck();
});

// Simply runs the game when the web page initially loads.
$(document).ready(crystalGame.newGame());

/* To do
    Possibly add sounds?
    Animations on the crystals when clicked
*/