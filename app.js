// Selecting the required elements from html file.
//for Text manupulation.
let title = document.querySelector(".title1");
let resultDescription = document.querySelector(".resultDescription");

//to remove and add eventlistner onclick
let startButton = document.querySelector(".startButton");

//for battle animation.
let battleIcon = document.getElementById("battleIcon");

//to check get the user choice.
let userChoiceSnake = document.querySelector("#card_one");
let userChoiceGun = document.querySelector("#card_two");
let userChoiceWater = document.querySelector("#card_three");

//to change the style of card if computer or user will win the match.
let computerCard = document.querySelector(".computerCard");
let userCard = document.querySelector(".userCard");

//to change the icon according the choice of the user and computer.
let computerIcon = document.querySelector(".computerCard>i");
let userIcon = document.querySelector(".userCard>i");

//To do all above things we require following additional elements.
let status1 = "";
let choiceSet = ["Snake", "Gun", "Water"];
let computerChoice = "";
let currentComputerClass = "fa-computer";
let currentUserClass = "fa-user-secret";
let random;


// To remove the animations for the battle icon after the animation ends,
// by doing this we can perform animation in multiple times.
battleIcon.addEventListener("animationend", function () {
  this.removeAttribute("style");
});

// To remove the animations for the title text after the animation ends,
// by doing this we can perform animation in multiple times.
title.addEventListener("animationend", function () {
  this.removeAttribute("style");
});

//To check who is winner
let winResult = (computerChoice, userChoice) => {
  if (computerChoice == userChoice) {
    status1 = "the computer's choice and the user's choice is same";
    return 0;
  } else if (userChoice.match(/Water/i) && computerChoice.match(/Snake/i)) {
    status1 = "Snake will drink the water";
    return "C";
  } else if (userChoice.match(/Snake/i) && computerChoice.match(/Water/i)) {
    status1 = "Snake will drink the water";
    return "U";
  } else if (userChoice.match(/Snake/i) && computerChoice.match(/Gun/i)) {
    status1 = "Gun will shoot the Snake";
    return "C";
  } else if (userChoice.match(/Gun/i) && computerChoice.match(/Snake/i)) {
    status1 = "Gun will shoot the Snake";
    return "U";
  } else if (userChoice.match(/Gun/i) && computerChoice.match(/Water/i)) {
    status1 = "Water will make Gun useless";
    return "C";
  } else if (userChoice.match(/Water/i) && computerChoice.match(/Gun/i)) {
    status1 = "Water will make Gun useless";
    return "U";
  }
};

//To start the game when user will click on the Try your luck button
let startGame = () => {
  //removing the event listner
  startButton.removeEventListener("click",startGame);

  // to remove the existing old win class card from the computer or user card
  computerCard.classList.contains("winClassCard")
    ? computerCard.classList.remove("winClassCard")
    : userCard.classList.contains("winClassCard")
    ? userCard.classList.remove("winClassCard")
    : "";

  // to get the user choice
  let userChoice = userChoiceSnake.checked
    ? "Snake"
    : userChoiceGun.checked
    ? "Gun"
    : userChoiceWater.checked
    ? "Water"
    : alert("Before starting please select the card and try again.");

  // To return and stop the next executions if user does not select any of the choice
  if (userChoice == undefined) {
    return;
  }

  // to generate random choice of the computer
  random = Math.floor(Math.random() * 3);
  computerChoice = choiceSet[random];

  // to make the loader visible
  document.querySelector(".loader").style.display = "inline";

  //To add battle animation
  battleIcon.style.animation = "battleAnimation 5s ease-in-out";

  //To remove old icons class
  computerIcon.classList.remove(`${currentComputerClass}`);
  userIcon.classList.remove(`${currentUserClass}`);

  currentComputerClass =
    computerChoice == "Snake"
      ? `fa-staff-${computerChoice.toLowerCase()}`
      : `fa-${computerChoice.toLowerCase()}`;

  currentUserClass =
    userChoice == "Snake"
      ? `fa-staff-${userChoice.toLowerCase()}`
      : `fa-${userChoice.toLowerCase()}`;

  //to add new icon class
  computerIcon.classList.add(currentComputerClass);
  userIcon.classList.add(currentUserClass);

  setTimeout(() => {
    //to again add eventlistener click to the start button 
    startButton.addEventListener("click", startGame);

    // to make the loader invisible
    document.querySelector(".loader").style.display = "none";

    // to add animation to the title
    document.querySelector(".title1").style.width = "0";
    document.querySelector(".title1").style.animation =
      "typing 3s ease-in-out 0.3s forwards";

    // to get the result of the game
    let result = winResult(computerChoice, userChoice);

    // to give output according to the result
    if (result == 0) {
      title.innerHTML = `<i class="fa-solid fa-hands-asl-interpreting"></i> Match Drawn 🟰`;
      resultDescription.innerHTML = "because " + status1 + ".";
      return;
    } else if (result == "C") {
      title.innerHTML = `😔 You Lose 💔`;
    } else if (result == "U") {
      title.innerHTML = `😁 You Won <i class="fa-solid fa-hand-peace"></i>`;
    }

    // to add the win class to won card
    result == "C"
      ? computerCard.classList.add("winClassCard")
      : result == "U"
      ? userCard.classList.add("winClassCard")
      : "";

    // To add the result description
    resultDescription.innerHTML = "because " + status1 + ".";
  }, 5000);
};

//Adding event listener to the start button
startButton.addEventListener("click", startGame);


