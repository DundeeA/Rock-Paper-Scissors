$(document).ready(function () {
  let transitionTime = 300; //Fade in/out time
  let houseDelay = 1000; // Take time to decide
  let spockMode = false; // Allow computer to pick spock and lizard
  let gameComplete = true; //Prevent running the code multiple times at once

  //Variables for responsiveness
  let chooseMenuSize;
  let chooseMenuSpacing;


  //Retrieve score from storage
  let score = 12;

if(localStorage.getItem("score") == null || localStorage.getItem("score") ==  NaN){
  localStorage.setItem("score", 12);
  $(".scoreText").text(score);
}else{
  score = parseInt(localStorage.getItem("score"));
  $(".scoreText").text(score);
} 




  //player chose an option
  $(".chooseMenu").on("click", ".choiceSlot", function () {
    if (gameComplete) {
      beginGame(parseInt(this.classList[1]));
      gameComplete = false;
    }
  });

  // Update player slot and switch to battle menu
  let beginGame = (choice) => {
    //switch to battle menu
    $(".chooseMenu").fadeOut(transitionTime);
    setTimeout(() => {
      $(".battleMenu")
        .css("display", "flex")
        .hide()
        .fadeIn(transitionTime * 2);
    }, transitionTime);

    //Update players slot
    switch (choice) {
      case 1:
        $(".playerSlot").addClass("rock");
        break;
      case 2:
        $(".playerSlot").addClass("paper");
        break;
      case 3:
        $(".playerSlot").addClass("scissors");
        break;
      case 4:
        $(".playerSlot").addClass("spock");
        break;
      case 5:
        $(".playerSlot").addClass("lizard");
        break;
    }

    //Delay how long it takes the house to choose
    setTimeout(() => {
      gameLogic(choice);
    }, houseDelay);
  };

  // add or remove point (true, false) or tie when no aguments given, display results menu.
  let winGame = (result) => {
    //show win or lose message
    switch (result) {
      case true:
        $(".winText").text("YOU WIN");
        score++;
        break;
      case false:
        if (score > 0) {
          $(".winText").text("YOU LOSE");
          score -= 1;
        }
        break;
      default:
        $(".winText").text("TIE");
    }

    //Phase in the results text
    $(".gameResults").css({
      width: 0,
      opacity: 0,
      display: "flex",
      overflow: "visible",
      "flex-direction": "column",
    });

    $(".gameResults").animate(
      { width: "13.75rem" },
      transitionTime * 3,
      function () {
        $(".gameResults").animate({ opacity: "100%" }, transitionTime * 2);
        //play winners animation
        if (result) {
          $(".playerSlot").append("<div class='winner'></div>");
        } else if (result != null) {
          $(".houseSlot").append("<div class='winner'></div>");
        }
      }
    );

    //update score
    localStorage.setItem("score", score);
    $(".scoreText").text(score);

    gameComplete = true;
  };

  // Get computer choice and update empty slot
  let houseChoice = () => {
    if (!spockMode) {
      decision = Math.floor(Math.random() * (4 - 1)) + 1;
    } else {
      decision = Math.floor(Math.random() * (6 - 1)) + 1;
    }

    switch (decision) {
      case 1:
        $(".emptySlot").addClass("choiceSlot rock houseSlot");
        console.log("COMPUTER CHOSE ROCK");
        break;
      case 2:
        $(".emptySlot").addClass("choiceSlot paper houseSlot");
        console.log("COMPUTER CHOSE PAPER");
        break;
      case 3:
        $(".emptySlot").addClass("choiceSlot scissors houseSlot");
        console.log("COMPUTER CHOSE SCISSORS");
        break;
      case 4:
        $(".emptySlot").addClass("choiceSlot spock houseSlot");
        console.log("COMPUTER CHOSE SPOCK");
        break;
      case 5:
        $(".emptySlot").addClass("choiceSlot lizard houseSlot");
        console.log("COMPUTER CHOSE LIZARD");
        break;
    }

    $(".emptySlot").removeClass("emptySlot");
    return decision;
  };

  //decide who wins
  let gameLogic = (player) => {
    let house = houseChoice();

    if (player == house) {
      //tie
      console.log("tie");
      winGame();
      return;
    }

    //  1 = rock,
    // 2 = paper,
    // 3 = scissors,
    // 4 = spock,
    // 5 = lizard

    if ((player == 1 && house == 3) || (player == 1 && house == 5)) {
      winGame(true);
      return;
    }

    if ((player == 2 && house == 1) || (player == 2 && house == 4)) {
      winGame(true);
      return;
    }

    if ((player == 3 && house == 2) || (player == 3 && house == 5)) {
      winGame(true);
      return;
    }

    if ((player == 4 && house == 3) || (player == 4 && house == 1)) {
      winGame(true);
      return;
    }

    if ((player == 5 && house == 4) || (player == 5 && house == 2)) {
      winGame(true);
      return;
    }

    winGame(false);
  };

  //Restart game (switch back to choose menu and reset slot classes to default)
  $(".restartBtn").click(function () {
    //Hide game results
    $(".gameResults").animate({ width: "0" }, transitionTime * 3);
    $(".gameResults").css("opacity", "0");
    $(".gameResults").css("display", "none");
    $(".winner").remove();

    //hide battle menu
    $(".battleMenu").fadeOut(transitionTime);

    //reset choices (classes)
    setTimeout(() => {
      $(".houseSlot").removeClass(
        "playerSlot rock paper scissors lizard spock"
      ); // remove classes
      $(".houseSlot").addClass("emptySlot choiceSlot houseSlot"); // add defaults back

      $(".playerSlot").removeClass("rock paper scissors lizard spock"); //remove players classes
      $(".playerSlot").addClass("choiceSlot playerSlot"); //add defaults back

      $(".chooseMenu").fadeIn(transitionTime); //show choose menu
    }, transitionTime);
  });

  //Toggle rule menu
  $(".rulesBtn").click(function () {
    if ($(".rulesMenu").is(":visible")) {
      $(".rulesMenu").fadeOut();
    } else {
      $(".rulesMenu").fadeIn().css("display", "flex");
    }
  });

  $(".rulesMenu").click(function () {
    $(".rulesMenu").fadeOut();
  });

// Update scaling values based on screen size (Media queries)
    function updateScale(){
    let windowSize = $(window).width();
    

    if(windowSize < 301){
      chooseMenuSize = '100%';
      chooseMenuSpacing = '50%';
      return;
    }

    if(windowSize < 450){
      chooseMenuSize = '90%';
      chooseMenuSpacing = '20%';
      return;
    }

    if(windowSize < 490){
      chooseMenuSize = '80%';
      chooseMenuSpacing = '20%';
      return;
    }

    if(windowSize < 630){
      chooseMenuSize = '76%';
      chooseMenuSpacing = '20%';
      return;
    }

    if(windowSize < 750){
      chooseMenuSize = '70%';
      chooseMenuSpacing = '10%';
      return;
    }

    if(windowSize < 910){
      chooseMenuSize = '60%';
      chooseMenuSpacing = '10%';
      return;
    }

    if(windowSize < 1200){
      chooseMenuSize = '50%';
      chooseMenuSpacing = '7%';
      return;
    }

    if(windowSize < 1367){
      chooseMenuSize = '30%';
      chooseMenuSpacing = '1%';
      return;
    }

    if(windowSize < 1470){
      chooseMenuSize = '40%';
      chooseMenuSpacing = '4%';
      return;
    }

    if(windowSize < 1670){
      chooseMenuSize = '34%';
      chooseMenuSpacing = '4%';
      return;
    }

    if(windowSize < 1700){
      chooseMenuSize = '30%';
      chooseMenuSpacing = '4%';
      return;
    }

    if(windowSize < 1921){
      chooseMenuSize = '30%';
      chooseMenuSpacing = '2%';
      return;
    }

  }

 // Resize the battle menu and child elements (for spock mode)
    let updateCSS = () =>{
  updateScale();
  //Modify container (to pentagon)
  $(".chooseMenu").css({
   "background-image": 'url("./images/bg-pentagon.svg")',
   "background-size": "90%",
   "background-position": "0% 70%",
   overflow: "visible",
   width: chooseMenuSize,  //edit this vaule for responsivness
   height: 'auto',
   "aspect-ratio": "1",
   "margin-top": chooseMenuSpacing, //edit this vaule for responsivness
 });

 //Shrink choices to fit on pentagon
 $(".chooseMenu").find(".choiceSlot").css({
   width: "25%",
   height: "auto",
   "border-width": "2%",
 });

 // Postion choices
 $("#rock").css({
   "margin-left": "0rem",
   "margin-top": "10%",
   order: 5,
 });

 $("#paper").css({
   "margin-left": "0rem",
   "margin-top": "0rem",
   order: 3,
 });

 $("#scissors").css({
   "margin-right": "20%",
   "margin-left": "30%",
   "margin-bottom": "0",
   order: 1,
 });

 $("#lizard").css({
   "margin-left": "0rem",
   "margin-right": "26%",
   "margin-top": "10%",
   order: 4,
 });

 $("#spock").css({
   "margin-left": "-3%",
   "margin-right": "33%",
   "margin-top": "0rem",
   order: 2,
 });
   }

  //Switch to spock mode
  $(".logo").click(function () {
    if (!spockMode) {
      spockMode = true;
     
      //Instaiate extra slots
      $(".chooseMenu").append(
        '<button aria-label="spock" class="choiceSlot 4 spock" id="spock"> <img src="" alt="spock" /></button>'
      ); 
      $(".chooseMenu").append(
        '<button aria-label="lizard" class="choiceSlot 5 lizard" id="lizard"> <img src="" alt="lizard" /></button>'
      );

      //Change images needed for spock mode
      $(".logo").css({
        content: "url('./images/logo-bonus.svg')",
        height: "80%",
      });
      $(".rulesMenu").find("img").css({
        content: "url('./images/image-rules-bonus.svg')",
        height: "90%",
        "margin-bottom": "4rem",
      });

      updateCSS();

    } else {
      location.reload(true);
    }
  });


  //Update CSS as the page gets resized
 $(window).resize(function (){
  if(!spockMode){return;}
  updateCSS();
 });


});
