class Card {
  constructor() {
    document.getElementById("reset").addEventListener("click", () => {
      window.location.reload();
    });
  }

  updateDisplay(display, input) {
    display.innerHTML = input.value;
  }

  removeHiddenClass(input) {
    input.classList.remove("hidden");
  }
  errorDisplay() {
    errorDiv.style.display = "flex";
    document.querySelector(".overlay").classList.remove("hidden");
  }

  checkMonth() {
    Number(cardexpM.value) <= 12
      ? this.updateDisplay(displayCardMonth, cardexpM)
      : (cardexpM.value = 0 + cardexpM.value.slice(0, -1));
    this.updateDisplay(displayCardMonth, cardexpM);
  }
  inputName(event) {
    const key = event.key;
    if (key.length === 1) {
      // displayCardName.innerHTML += key;
      this.updateDisplay(displayCardName, cardNameInput);
    } else if (key === "Backspace") {
      displayCardName.innerHTML = displayCardName.innerHTML.slice(0, -1);
      this.updateDisplay(displayCardName, cardNameInput);
    }
  }

  checkInputValidity() {
    if (
      cardNumberInput.checkValidity() &&
      cardNameInput.checkValidity() &&
      cardexpM.checkValidity() &&
      cardexpY.checkValidity() &&
      cardexpY.checkValidity() &&
      cardCvcInput.checkValidity()
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkInputlength() {
    const currentYear = 23;
    const name = cardNameInput.value.split(" ").filter((n) => n !== "");
    if (
      cardNumberInput.value.length <= 18 ||
      cardCvcInput.value.length <= 2 ||
      name.length <= 1 ||
      cardexpY.value < currentYear
    ) {
      return true;
    } else {
      return false;
    }
  }
  updateFinal() {
    wrapper.style.display = "none";
    spinner.style.display = "grid";
    setTimeout(() => {
      wrapper.style.display = "grid";
      spinner.style.display = "none";
      resultpage.style.display = "grid ";
      cardData.replaceWith(resultpage);
    }, 2000);
  }

  overlayErrorDisplay() {
    errorDiv.style.display = "none";
    document.querySelector(".overlay").classList.add("hidden");
  }
}

const card = new Card();

const cardNumberInput = document.getElementById("cnum");
const cardNameInput = document.getElementById("cname");
const cardCvcInput = document.getElementById("cvc");
const cardexpM = document.querySelector(".exp-m");
const cardexpY = document.querySelector(".exp-y");
const cardNumberDiv = document.querySelector(".card-number");
const cardNameDiv = document.querySelector(".cardname");
const cardExpMDiv = document.querySelector(".card-expM");
const cardExpYDiv = document.querySelector(".card-expY");
const cardCvcDiv = document.querySelector(".card-cvc");
const submitBtn = document.getElementById("submit");
// Display Selector
const displayCardName = document.getElementById("cname-new");
const displayCardNumber = document.getElementById("cnum-new");
const displayCardMonth = document.getElementById("expM-new");
const displayCardYear = document.getElementById("expY-new");
const displayCvc = document.getElementById("cvc-new");
const wrapper = document.querySelector(".wrapper");
const spinner = document.querySelector(".spinner-class");
const resultpage = document.querySelector(".resultpage");
const cardData = document.querySelector(".card-data");
const errorTap = document.querySelector(".error-ok");
const errorDiv = document.querySelector(".errorlead");

// Event Handler

cardNameInput.addEventListener("keyup", (e) => {
  cardNameDiv.remove();
  card.removeHiddenClass(displayCardName);
  card.inputName(e);
});
cardNumberInput.addEventListener(
  "input",
  () =>
    (cardNumberInput.value = formatNumber(
      cardNumberInput.value.replaceAll(" ", "")
    ))
);

cardNumberInput.addEventListener("keyup", () => {
  cardNumberDiv.remove();
  card.removeHiddenClass(displayCardNumber);
  card.updateDisplay(displayCardNumber, cardNumberInput);
});

cardexpM.addEventListener("keyup", () => {
  cardExpMDiv.remove();
  card.removeHiddenClass(displayCardMonth);
  card.checkMonth();
});
cardexpY.addEventListener("keyup", () => {
  cardExpYDiv.remove();
  card.removeHiddenClass(displayCardYear);
  card.updateDisplay(displayCardYear, cardexpY);
});

cardCvcInput.addEventListener("keyup", () => {
  cardCvcDiv.remove();
  card.removeHiddenClass(displayCvc);
  card.updateDisplay(displayCvc, cardCvcInput);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!card.checkInputValidity() || card.checkInputlength()) {
    card.errorDisplay();
  } else {
    card.updateFinal();
  }
});

errorTap.addEventListener("click", () => {
  card.overlayErrorDisplay();
});

// FORMAT NUMBER Function
const formatNumber = (number) =>
  number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
  }, "");
