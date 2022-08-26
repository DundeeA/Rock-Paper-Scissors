$(document).ready(function () {
  let transitionTime = 300; //Fade in/out time
  let houseDelay = 1000; // Take time to decide

  //Retrieve score from storage
  let score = localStorage.getItem("score");
  if (score) {
    $(".scoreText").text(score);
  } else {
    localStorage.setItem("score", 0);
  }

  //player chose an option
  $(".choiceSlot").click(function () {
    beginGame(parseInt(this.classList[1]));
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
        console.log("PLAYER CHOSE ROCK");
        break;
      case 2:
        $(".playerSlot").addClass("paper");
        console.log("PLAYER CHOSE PAPER");
        break;
      case 3:
        $(".playerSlot").addClass("scissors");
        console.log("PLAYER CHOSE SCISSORS");
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
    $('.gameResults').animate({width: '13.75rem'}, transitionTime * 3, function(){
    $('.gameResults').animate({opacity: '100%'},transitionTime * 2,);
    //play winners animation
    if(result){
      $('.playerSlot').append("<div class='winner'></div>");
     }else if(result != null){
      $('.houseSlot').append("<div class='winner'></div>");
     }
  });


    //update score
    localStorage.setItem("score", score);
    $(".scoreText").text(score);
  };

  // Get computer choice and update empty slot
  let houseChoice = () => {
    decision = Math.floor(Math.random() * (4 - 1)) + 1;

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

    if (player == 1 && house == 3) {
      winGame(true);
      return;
    }

    if (player == 2 && house == 1) {
      winGame(true);
      return;
    }

    if (player == 3 && house == 2) {
      winGame(true);
      return;
    }

    winGame(false);
  };

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

  //Restart game (switch back to choose menu and reset slot classes to default)
  $(".restartBtn").click(function () {
    
    //Hide game results
    $('.gameResults').animate({width: '0'}, transitionTime * 3);
    $('.gameResults').css('opacity', '0');
    $('.winner').remove();

     //hide battle menu
    $(".battleMenu").fadeOut(transitionTime);
   
    //reset choices (classes)
    setTimeout(() => {
    $(".houseSlot").removeClass("playerSlot rock paper scissors"); // remove classes
    $(".houseSlot").addClass("emptySlot choiceSlot houseSlot"); // add defaults back

    $(".playerSlot").removeClass("rock paper scissors"); //remove players classes
    $(".playerSlot").addClass("choiceSlot playerSlot"); //add defaults back

    $(".chooseMenu").fadeIn(transitionTime); //show choose menu
    }, transitionTime);


  });

});
