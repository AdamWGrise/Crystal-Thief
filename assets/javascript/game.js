crystalGame = {
    wins: 0,
    losses: 0,
    currentScore: 0,
    goalScore: "",
    gValue: "",
    rValue: "",
    bValue: "",
    yValue: "",

    newGame: function () {
        // Resetting the current score for the new game.
        currentScore = 0;

        // Determination of the goal score, random number between 19 and 120.
        goalScore = Math.floor(Math.random() * 102) + 19;

        // These four lines will get a random value for each crystal.
        gValue = crystalGame.cValueRandomizer();
        rValue = crystalGame.cValueRandomizer();
        bValue = crystalGame.cValueRandomizer();
        yValue = crystalGame.cValueRandomizer();
        
        // ...then these four will actually assign the value as an attribute to the HTML crystal elements.
        $("#crystal-g").attr("value", gValue);
        $("#crystal-r").attr("value", rValue);
        $("#crystal-b").attr("value", bValue);
        $("#crystal-y").attr("value", yValue);
        
        // Placing the current score of 0 and the new goal score on the screen.
        $("#currentScore").text(currentScore);
        $("#goalScore").text(goalScore);
        $("#wins").text(crystalGame.wins);
        $("#losses").text(crystalGame.losses);

        // Unlock the crystal buttons for use.
        $(".crystal").prop("disabled",false);

        // Update the commentary box.
        $("#commentary").text("Click thy crystal buttons to deftly thieve crystals from the slumbering dragon's ample caches! Thou mustn't let thine greed seize control, however, lest thy burden of greed play a role in shackling thy self to the reaches of the dragon's ferocious grasp.")

        // Logging.
        console.log("currentScore: " + currentScore + " | goalScore: " + goalScore);
        console.log("g: " + gValue + " | r: " + rValue + " | b: " + bValue + " | y: " + yValue);
    },
    // The function used to get random values for the crystals, called from the variable assignments above.
    cValueRandomizer: function () {
        return Math.floor(Math.random() * 12) + 1;
    },

    // Checks for a win each round. Disable the crystal buttons upon win or loss, until a new game is started.
    winCheck: function () {
        if (currentScore < goalScore) {
            // Nothing happens - keep stashing crystals!
        } else if (currentScore === goalScore) {
            $("#commentary").text("Thou hast obtained sufficient crystals with which to escape! The dragon was not able to pursue you successfully, and thou hast made a heroic escape. Congratulations! Click 'New Game' to pursue another journey of thievery.");
            crystalGame.wins++;
            $("#wins").text(crystalGame.wins);
            $(".crystal").prop("disabled",true);
        } else if (currentScore > goalScore) {
            $("#commentary").text("Thine greed hath burdened you with an overabundance of crystals. The dragon hath woken up. The dragon attacks! Thy Hit decreased by 37. Thou art dead. Clicketh 'New Game' to try again.")
            crystalGame.losses++;
            $("#losses").text(crystalGame.losses);
            $(".crystal").prop("disabled",true);
        }
    }
}
// The game is triggered on the click events of the crystals here.
$(".crystal").click(function () {
    var crysClick = $(this).attr("value"); // Attr:"Value" from the game's assignment.
    console.log(crysClick);
    currentScore += parseInt(crysClick);
    $("#currentScore").text(currentScore);
    crystalGame.winCheck();
});

$(document).ready(crystalGame.newGame());