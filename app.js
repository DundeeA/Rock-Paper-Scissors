$(document).ready(function () {

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
    $(".chooseMenu").fadeOut(300);
    $(".battleMenu").css("display", "flex").hide().fadeIn(1000);

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
    }

    gameLogic(choice);
  };

  // add or remove point (true, false)
  let winGame = (result) => {

    switch (result) {
      case true:
        score++;
        break;
      case false:
        if (score > 0) {
          score -= 1;
        }
        break;
    }

    localStorage.setItem("score", score);
    $(".scoreText").text(score);
  };

  // Get computer choice and update empty slot
  let houseChoice = () => {
    decision = Math.floor(Math.random() * (4 - 1)) + 1;

    switch (decision) {
      case 1:
        $(".emptySlot").addClass("choiceSlot rock playerSlot");
        break;
      case 2:
        $(".emptySlot").addClass("choiceSlot paper playerSlot");
        break;
      case 3:
        $(".emptySlot").addClass("choiceSlot scissors playerSlot");
        break;
    }

    $(".emptySlot").removeClass("emptySlot");
    return decision;
  };

  //decide who wins
  let gameLogic = (player) => {
    let house = houseChoice();

    if (player === house) {
      //tie
      console.log("tie");
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
    if( $('.rulesMenu').is(':visible')){
      $('.rulesMenu').fadeOut();
    }else{
      $('.rulesMenu').fadeIn().css('display','flex');
    }
  });

  $('.rulesMenu').click(function (){
       $('.rulesMenu').fadeOut();
  })



});
