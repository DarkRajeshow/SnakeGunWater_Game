let battleIcon = document.getElementById("battleIcon");

let userChoiceSnake = document.querySelector("#card_one");
let userChoiceGun = document.querySelector("#card_two");
let userChoiceWater = document.querySelector("#card_three");
let title = document.querySelector(".title1");
let resultDescription = document.querySelector(".resultDescription");
let status1 = "";
let choiceSet = ["Snake", "Gun", "Water"];
let computerChoice = "";

let computerCard = document.querySelector(".computerCard");
let userCard = document.querySelector(".userCard");

let computerIcon = document.querySelector(".computerCard>i");
let userIcon = document.querySelector(".userCard>i");

battleIcon.addEventListener("animationend", function () {
  this.removeAttribute("style");
});

title.addEventListener("animationend", function () {
  this.removeAttribute("style");
});

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

let currentComputerClass = "fa-computer";
let currentUserClass = "fa-user-secret";

let startGame = () => {
  computerCard.classList.contains("winClassCard")
    ? computerCard.classList.remove("winClassCard")
    : userCard.classList.contains("winClassCard")? userCard.classList.remove("winClassCard"):"";

  let userChoice = userChoiceSnake.checked
    ? "Snake"
    : userChoiceGun.checked
    ? "Gun"
    : userChoiceWater.checked
    ? "Water"
    : alert("Before starting please select the card and try your luck.");

  if (userChoice == undefined) {
    return;
  }
  let random = Math.floor(Math.random() * 3);
  computerChoice = choiceSet[random];
  document.querySelector(".MainCards>p").style.display = "inline";

  console.log(computerChoice);
  console.log(userChoice);
  battleIcon.style.animation = "battleAnimation 5s ease-in-out";

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

  computerIcon.classList.add(currentComputerClass);
  userIcon.classList.add(currentUserClass);

  setTimeout(() => {
    document.querySelector(".MainCards>p").style.display = "none";

    document.querySelector(".title1").style.width = "0";
    document.querySelector(".title1").style.animation =
      "typing 3s ease-in-out 0.3s forwards";

    let result = winResult(computerChoice, userChoice);
    if (result == 0) {
      title.innerHTML = `🟰 Match Drawn <i class="fa-solid fa-hands-asl-interpreting"></i>`;
      resultDescription.innerHTML = "because " + status1 + ".";
      return;
    } else if (result == "C") {
      title.innerHTML = `😔 You Lose 💔`;
    } else if (result == "U") {
      title.innerHTML = `😁 You Won <i class="fa-solid fa-hand-peace"></i>`;
    }
    result == "C"
      ? computerCard.classList.add("winClassCard")
      : result =="U"? userCard.classList.add("winClassCard"):"";

      resultDescription.innerHTML = "because " + status1 + ".";
  }, 5000);
};
