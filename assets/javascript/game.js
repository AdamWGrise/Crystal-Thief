crystalGame = {
    wins: 0,
    losses: 0,
    currentScore: 0,
    goalScore: "",
    gValue:"",
    rValue:"",
    bValue:"",
    yValue:"",

    newGame:function() {
        currentScore = 0;
        goalScore = Math.floor(Math.random()*102)+19;
        gValue = crystalGame.cValueRandomizer();
        rValue = crystalGame.cValueRandomizer();
        bValue = crystalGame.cValueRandomizer();
        yValue = crystalGame.cValueRandomizer();
        $("#currentScore").text(currentScore);
        $("#goalScore").text(goalScore);
        console.log("currentScore: " + currentScore + " | goalScore: " + goalScore);
        console.log("g: " + gValue + " | r: " + rValue + " | b: " + bValue + " | y: " + yValue);
    },

    cValueRandomizer:function() {
        return Math.floor(Math.random()*11)+1;
    },

}
$(".crystal").click(function(){
    var crysClick = $(this).attr("value");
    console.log(crysClick);
    currentScore += crysClick.concat("Value"); // how to get this to read the variable rather than return the string?
    console.log(currentScore);
    console.log("clicked");
    $("#currentScore").text(currentScore);
});

$(document).ready(crystalGame.newGame());