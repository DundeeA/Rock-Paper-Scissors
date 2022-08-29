$(document).ready(function () {
  let transitionTime = 300; //Fade in/out time
  let houseDelay = 1000; // Take time to decide
  let spockMode = false;
  let gameComplete = true; //Used to prevent running the code multiple times at once

  //Retrieve score from storage
  let score = localStorage.getItem("score");
  if (score) {
    $(".scoreText").text(score);
  } else {
    localStorage.setItem("score", 0);
  }

  //player chose an option
  $('.chooseMenu').on('click', '.choiceSlot', function(){
    if(gameComplete){
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
    $(".winner").remove();

    //hide battle menu
    $(".battleMenu").fadeOut(transitionTime);

    //reset choices (classes)
    setTimeout(() => {
      $(".houseSlot").removeClass("playerSlot rock paper scissors lizard spock"); // remove classes
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

  //Enable Spock mode
  $('.logo').click(function () {
   if(!spockMode){
    spockMode = true;
  
    //Instaiate extra slots
    $('.chooseMenu').append('<div class="choiceSlot 4 spock click" id="spock"> <img src="" alt="" /></div>');
    $('.chooseMenu').append('<div class="choiceSlot 5 lizard click" id="lizard"> <img src="" alt="" /></div>');
 
   //Change images needed for spock mode
   $('.logo').css({
    'content' : "url('./images/logo-bonus.svg')",
    'height' : '80%'
   });
   $('.rulesMenu').find('img').css({
    'content' : "url('./images/image-rules-bonus.svg')",
    'height' : '90%',
    'margin-bottom' : '4rem'
  });
  $('.rulesMenu').css('height', 'auto');
 

  //Modify container (to pentagon)
  $('.chooseMenu').css({
    'background-image' : 'url("./images/bg-pentagon.svg")',
    'background-size' : '70%',
    'background-position':'50% 60%',
    'overflow' : 'visible',
     'width' : '100%',
     'aspect-ratio' : '1',
     'margin-top' : '20%'
   });

  //Shrink choices to fit on pentagon
  $('.chooseMenu').find('.choiceSlot').css({
    'width' : '18%',
    'height' : 'auto',
    'border-width' : '4%'
  });

 // Postion choices using margin
  $('#rock').css({
    'margin-left' : '0rem',
    'margin-top' : '10rem',
    'order' : 5
  });
 
  $('#paper').css({
    'margin-left' : '0rem',
    'margin-top' : '0rem',
    'order' : 3
  });

  $('#scissors').css({
    'margin-right' : '0',
    'margin-left' : '29rem',
    'margin-bottom' : '0',
    'order' : 1
  });

  $('#lizard').css({
    'margin-left' : '12rem',
    'margin-right' : '15rem',
    'margin-top' : '10rem',
    'order' : 4
  });

  $('#spock').css({
    'margin-left' : '6rem',
    'margin-right' : '27rem',
    'margin-top' : '1rem',
    'order' : 2
  });
  }else{ location.reload(true);}
});
});
